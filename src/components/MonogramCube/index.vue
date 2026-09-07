<template>
  <div ref="wrapEl" class="monogram-cube">
    <canvas ref="canvasEl" class="canvas" aria-hidden="true" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import {
  Renderer,
  Camera,
  Transform,
  Box,
  Program,
  Mesh,
  Texture
} from 'ogl'

// A dimensional take on the Logo mark, built the way the
// SVG is: rounded outlines over a frosted fill, E and I on
// the two side faces, held at the logo's isometric angle

// The logo's pose is a true isometric view. Rather than
// hunting for Euler angles (whose result depends on
// rotation order), the camera sits on the (1,1,1)
// diagonal looking at the origin - an unrotated cube then
// shows its top face as a rhombus above two side faces,
// with a vertical edge front-centre, exactly like the SVG
const ISO_DISTANCE = 3.1

const SIZE = 1.5
// Fillet radius, as a share of the edge - matches the
// softness of the SVG's corners
const CORNER = 0.12
// Enough subdivision for the fillet to read as a curve
const SEGMENTS = 48

// Drifts around that pose rather than spinning through it,
// so it still reads as the mark
const IDLE_AMOUNT = 0.07
const IDLE_SPEED = 0.0004
const TILT = 0.18
const EASE = 0.06

// GLSL ES 3.00 - the outline needs fwidth, and derivatives
// are only core there. A WebGL2 context won't expose
// OES_standard_derivatives to a 1.00 shader, so this
// cannot be written the old way.
const vertex = `#version 300 es
in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

out vec3 vObjNormal;
out vec2 vUv;

void main() {
  vUv = uv;

  // Object space, not the usual normalMatrix normal:
  // which face this is has to be decided in the cube's
  // own frame. In view space the two visible side faces
  // classify identically and both get the same letter.
  vObjNormal = normal;

  gl_Position = projectionMatrix
    * modelViewMatrix
    * vec4(position, 1.0);
}
`

// Matches the SVG logo's construction rather than
// shading a solid box: each face is a rounded outline at
// 0.74 over a 0.07 frosted fill, and only the two side
// faces carry a letter
const fragment = `#version 300 es
precision highp float;

uniform vec3 uColor;
uniform sampler2D tMap;

in vec3 vObjNormal;
in vec2 vUv;

out vec4 fragColor;

// 1 - cos(45°): how far the normal has tilted at the crest
// of a filleted edge
const float CREST = 0.2929;
const float LINE = 6.5;

void main() {
  vec3 an = abs(normalize(vObjNormal));

  // The outline is taken from the geometry, not from the
  // face's UV boundary. On a flat face the normal is
  // exactly an axis, so the largest component is 1; along
  // a filleted edge it tilts between two axes and that
  // component drops. Tracking that traces every edge and
  // corner in one continuous line - visible wherever the
  // surface is, including the silhouette, where a
  // UV-boundary outline would be culled away.
  float maxAxis = max(an.x, max(an.y, an.z));
  float crest = 1.0 - min((1.0 - maxAxis) / CREST, 1.0);

  // Width measured in pixels rather than in surface units.
  // Without this the fillet is seen face-on at an interior
  // fold and edge-on at the silhouette, so the same band
  // renders several times wider in the middle of the cube
  // than around its outside.
  // The epsilon matters: across a flat face the metric is
  // constant, so fwidth is 0 and smoothstep(0, 0, x) is
  // undefined - it comes back lighting the whole face
  float width = max(fwidth(crest), 1e-5) * LINE;
  float outline = 1.0 - smoothstep(0.0, width, crest);

  // The whole face is frosted; the solid has no holes
  float inside = 1.0;

  // Which way this face points decides its letter: E on
  // the Z faces, I on the X faces, none on top/bottom -
  // the same arrangement as the logo
  float isY = step(max(an.x, an.z), an.y);
  float isX = (1.0 - isY) * step(an.z, an.x);
  float isZ = (1.0 - isY) * (1.0 - isX);

  // Atlas is E | I side by side
  vec2 uvE = vec2(vUv.x * 0.5, vUv.y);
  vec2 uvI = vec2(0.5 + vUv.x * 0.5, vUv.y);

  float letter =
    isZ * texture(tMap, uvE).a +
    isX * texture(tMap, uvI).a;

  float alpha = clamp(
    inside * 0.10 +
    outline * 0.74 +
    letter * 0.74, 0.0, 1.0);

  // Premultiplied, because this is composited with MAX
  // blending rather than the usual source-over - see the
  // blend equation set on the program
  fragColor = vec4(uColor * alpha, alpha);
}
`

const wrapEl = useTemplateRef<HTMLElement>('wrapEl')
const canvasEl = useTemplateRef<HTMLCanvasElement>('canvasEl')

let frame = 0
let observer: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null
let visible = false
let gl: Renderer['gl'] | null = null

const pointer = { x: 0, y: 0 }
const current = { x: 0, y: 0 }

const prefersReducedMotion = () => window
  .matchMedia('(prefers-reduced-motion: reduce)')
  .matches

// The cube sits inside a cross-faded section: it can be
// on screen while the stage it belongs to is invisible,
// and rendering then is pure waste
const stageHidden = () => {
  const stage = wrapEl.value?.closest('.stage') as
    HTMLElement | null

  if (!stage) return false

  const opacity = stage.style
    .getPropertyValue('--stage-opacity')

  return opacity !== '' && parseFloat(opacity) < 0.02
}

const onPointerMove = (ev: PointerEvent) => {
  pointer.x = (ev.clientX / window.innerWidth) * 2 - 1
  pointer.y = (ev.clientY / window.innerHeight) * 2 - 1
}

// A box whose edges and corners are actually filleted,
// rather than faked in UV space. Every surface point is
// pushed out to `radius` from an inner box, which rounds
// the edges while keeping the solid closed - the reason
// per-face UV rounding couldn't be used is that it cuts
// each face's corner and leaves a hole where three of
// them meet.
const roundedBox = (
  context: Renderer['gl'],
  size: number,
  radius: number,
  segments: number
) => {
  const geometry = new Box(context, {
    width: size,
    height: size,
    depth: size,
    widthSegments: segments,
    heightSegments: segments,
    depthSegments: segments
  })

  const position = geometry.attributes.position
  const normal = geometry.attributes.normal

  const positions = position.data as Float32Array
  const normals = normal.data as Float32Array

  const inner = size / 2 - radius
  const clamp = (n: number) =>
    Math.min(inner, Math.max(-inner, n))

  for (let i = 0; i < positions.length; i += 3) {
    const px = positions[i]
    const py = positions[i + 1]
    const pz = positions[i + 2]

    // Nearest point on the inner box...
    const cx = clamp(px)
    const cy = clamp(py)
    const cz = clamp(pz)

    // ...and the direction out to the surface, which is
    // also the true normal of the rounded solid
    let nx = px - cx
    let ny = py - cy
    let nz = pz - cz

    const length = Math.hypot(nx, ny, nz) || 1
    nx /= length
    ny /= length
    nz /= length

    positions[i] = cx + nx * radius
    positions[i + 1] = cy + ny * radius
    positions[i + 2] = cz + nz * radius

    normals[i] = nx
    normals[i + 1] = ny
    normals[i + 2] = nz
  }

  position.needsUpdate = true
  normal.needsUpdate = true

  return geometry
}

// Monogram drawn to a canvas and used as the face texture,
// so the cube carries the mark rather than being a
// generic box
// Two cells side by side, E then I, so the shader can
// pick one per face from the surface normal
const monogramTexture = async (
  context: Renderer['gl']
) => {
  const cell = 512
  const canvas = document.createElement('canvas')
  canvas.width = cell * 2
  canvas.height = cell

  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Drawn in the brand font, so it has to have loaded
    // before we rasterize it
    await document.fonts?.ready

    ctx.clearRect(0, 0, cell * 2, cell)
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // Big enough to fill the face like the logo does, at a
    // light weight so the strokes stay delicate
    ctx.font = `300 ${cell * 0.70}px Montserrat, sans-serif`

    ctx.fillText('E', cell * 0.5, cell * 0.5)
    ctx.fillText('I', cell * 1.5, cell * 0.5)
  }

  return new Texture(context, {
    image: canvas,
    generateMipmaps: true
  })
}

onMounted(async () => {
  const canvas = canvasEl.value
  const wrap = wrapEl.value

  if (!canvas || !wrap) return

  const renderer = new Renderer({
    canvas,
    alpha: true,
    antialias: true,
    dpr: Math.min(2, window.devicePixelRatio || 1)
  })

  // The shaders are GLSL ES 3.00 for fwidth; on a WebGL1
  // context they can't compile, so the cube is skipped
  // rather than rendered broken. The section reads fine
  // without it.
  if (!renderer.isWebgl2) return

  gl = renderer.gl
  gl.clearColor(0, 0, 0, 0)

  const camera = new Camera(gl, { fov: 32 })
  camera.position.set(
    ISO_DISTANCE, ISO_DISTANCE, ISO_DISTANCE)
  camera.lookAt([0, 0, 0])

  const scene = new Transform()
  const texture = await monogramTexture(gl)

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uColor: { value: [0.85, 0.87, 0.92] },
      tMap: { value: texture }
    },
    transparent: true,
    // Culling matters here because the logo reads solid:
    // without it the far edges show through the near
    // faces and the mark becomes an x-ray
    cullFace: gl.BACK
  })

  // Two faces meet along every interior fold, and with
  // ordinary source-over their strokes stack up so the
  // folds read heavier than the single-face silhouette.
  // MAX takes the brighter of the two instead of summing,
  // which evens every line out.
  const MAX = (gl as WebGL2RenderingContext).MAX
  if (MAX !== undefined) program.setBlendEquation(MAX, MAX)

  const mesh = new Mesh(gl, {
    geometry: roundedBox(gl, SIZE, CORNER, SEGMENTS),
    program
  })

  mesh.setParent(scene)

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = wrap
    if (!w || !h) return

    renderer.setSize(w, h)
    camera.perspective({ aspect: w / h })
  }

  resize()

  const draw = () => {
    if (prefersReducedMotion()) return
    renderer.render({ scene, camera })
  }

  const loop = () => {
    frame = requestAnimationFrame(loop)

    // On screen but its section has faded out - keep the
    // loop alive to watch for it coming back, skip the
    // GPU work
    if (stageHidden()) return

    current.x += (pointer.y * TILT - current.x) * EASE
    current.y += (pointer.x * TILT - current.y) * EASE

    // Small drift around the identity pose, plus the
    // pointer offset - it never leaves the logo's angle
    const drift = Date.now() * IDLE_SPEED

    mesh.rotation.x = current.x
      + Math.sin(drift) * IDLE_AMOUNT
    mesh.rotation.y = current.y
      + Math.cos(drift * 0.8) * IDLE_AMOUNT

    renderer.render({ scene, camera })
  }

  const start = () => {
    if (frame) return
    frame = requestAnimationFrame(loop)
  }

  const stop = () => {
    if (!frame) return
    cancelAnimationFrame(frame)
    frame = 0
  }

  if (prefersReducedMotion()) {
    // One static pose, no loop at all
    renderer.render({ scene, camera })
  } else {
    window.addEventListener('pointermove', onPointerMove,
      { passive: true })

    // Scrolled away: the loop is torn down entirely
    // rather than left ticking, so an off-screen cube
    // costs nothing
    observer = new IntersectionObserver(entries => {
      visible = entries.some(e => e.isIntersecting)
      visible ? start() : stop()
    })

    observer.observe(canvas)
  }

  resizeObserver = new ResizeObserver(() => {
    resize()
    draw()
  })

  resizeObserver.observe(wrap)
})

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame)
  frame = 0

  observer?.disconnect()
  resizeObserver?.disconnect()
  observer = null
  resizeObserver = null

  window.removeEventListener('pointermove', onPointerMove)

  // Free the GPU context rather than waiting for GC
  gl?.getExtension('WEBGL_lose_context')?.loseContext()
  gl = null
})
</script>

<style lang="scss" scoped>
.monogram-cube {
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  & > .canvas {
    display: block;
    width: 100%;
    height: 100%;

    // The SVG logo is softened the same way
    // (Homepage.vue puts blur(0.8px) on .logo); without it
    // the 3D version reads harder-edged than the mark it
    // is standing in for
    filter: blur(0.6px);
  }
}
</style>
