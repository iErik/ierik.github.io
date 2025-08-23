<template>
  <canvas class="canvas-bg" ref="canvasEl" />
  <div class="overlay" />
  <div class="overlay-bg" />
  <div class="overlay-bg-grain" />
</template>

<script lang="ts" setup>
import { useTemplateRef, onMounted } from 'vue'

import * as webgl from '@utils/webgl'
import * as shaders from './shaders'


// This is an adaptation of:
// https://codepen.io/TC5550/pen/WNNWoaO?editors=0010

const canvasRef = useTemplateRef('canvasEl')
const numMeatballs = 30

type Meatball = {
  x: number,
  y: number,
  r: number,
  vx: number,
  vy: number
}

const mkMeatballs = (length: number): Meatball[] => Array
  .from({ length }, () => {
    const radius = Math.random() * 60 + 10
    const width = window.innerWidth
    const height = window.innerHeight

    return {
      x: Math.random() * (width - 2 * radius) + radius,
      y: Math.random() * (height - 2 * radius) + radius,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      r: radius * 0.75
    }
  })

const animateBalls = (balls: Meatball[]) =>
  balls.reduce<number[]>((acc, ball) => {
    const width = window.innerWidth
    const height = window.innerHeight

    ball.x += ball.vx
    ball.y += ball.vy;

    if (
      ball.x < ball.r ||
      ball.x > width - ball.r
    ) { ball.vx *= -1 }

    if (
      ball.y < ball.r ||
      ball.y > height - ball.r
    ) { ball.vy *= -1 }

    return [
      ...acc,
      ball.x,
      ball.y,
      ball.r
    ]
  }, [])


function canvasSetup(gl: WebGLRenderingContext) {
  const meatballs = mkMeatballs(numMeatballs)
  const vertexShader = webgl.compileShader(gl,
    shaders.vertexShader(),
    gl.VERTEX_SHADER)
  const fragmentShader = webgl.compileShader(gl,
    shaders.fragmentShader(numMeatballs),
    gl.FRAGMENT_SHADER)

  const shaderProgram = webgl.createAndUseShader(gl, {
    vertexShader,
    fragmentShader
  })

  const vertexData = new Float32Array([
    -1.0,  1.0, // Top feft corner
    -1.0, -1.0, // Bottom left corner
    +1.0, +1.0, // Top right corner
    +1.0, -1.0  // Bottom right corner
  ])

  webgl.bindBuffer(gl,
    gl.ARRAY_BUFFER,
    gl.STATIC_DRAW,
    vertexData
  )

  const positionHandle = webgl.getAttribLocation(gl,
    shaderProgram,
    'position'
  )
  gl.enableVertexAttribArray(positionHandle)
  gl.vertexAttribPointer(positionHandle,
    2,        // Position is a vec2 data structure
    gl.FLOAT, // Each component of the vec2 is a float
    false,    // Don't normalize values
    2 * 4,    // Two 4 byte float components per vertex
    0         // Offset into each span of vertex data
  )

  const uMeatballsHandle = webgl.getUniformLocation(gl,
    shaderProgram,
    'uMeatballs')

  const uResolutionHandle = webgl.getUniformLocation(gl,
    shaderProgram,
    'uResolution')

  const animate = () => {
    const uMeatballs = animateBalls(meatballs)
    const uResolution = new Float32Array([
      window.innerWidth,
      window.innerHeight
    ])

    gl.uniform3fv(uMeatballsHandle, uMeatballs)
    gl.uniform2fv(uResolutionHandle, uResolution)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  const canvasEl = canvasRef.value

  if (!canvasEl) {
    console.error(
      'Error: Background canvas reference doesn\' exist!')
    return
  }

  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight
  const glContext  = canvasEl.getContext('webgl')

  if (!glContext) {
    console.error(
      'Error: failed to get Background WebGL Context!')
    return
  }

  glContext.viewport(0, 0, canvasEl.width, canvasEl.height)
  canvasSetup(glContext)
})
</script>

<style lang="scss" scoped>

.canvas-bg {
  display: block;

  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.overlay {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  width: 100vw;
  height: 100vh;
  z-index: 1;

  //background-color: rgba(0.0, 0.0, 0.0, 0.6);
  //backdrop-filter: blur(210px);

  background-color: rgb(22 85 172 / 9%);
  backdrop-filter: blur(95px);
}

.overlay-bg {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  width: 100vw;
  height: 100vh;
  z-index: 2;

  background-image: url('/grid-pattern.png');
  //background-size: 267px 267px;
  background-size: 200px 200px;
  background-repeat: repeat;
  opacity: .1;
  //backdrop-filter: blur(70px);
}

.overlay-bg-grain {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  width: 100vw;
  height: 100vh;
  z-index: 3;

  background-image: url('/grainy-texture.png');
  background-repeat: repeat;
  // TODO This gets glitchy if the browser has darkreader
  // extension, we need to find a way to fix it
  opacity: .2;
  background-blend-mode: overlay;
}
</style>
