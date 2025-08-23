import {
  Scene,
  PerspectiveCamera,
  OrthographicCamera,
  WebGLRenderer
} from 'three'
import type { Camera, Object3D } from 'three'

import {
  OrbitControls
} from 'three/addons/controls/OrbitControls.js'

type UseThreeJsOptions = {
  withOrbitControls?: boolean
  canvasEl: HTMLCanvasElement
  camera: Camera,
  objects?: Object3D[]
  animate?: (
    delta: number,
    scene: Scene,
    renderer: WebGLRenderer
  ) => any,
}

export default function useThreejs(
  options: UseThreeJsOptions
) {
  const scene = new Scene()
  const renderer = new WebGLRenderer({
    canvas: options.canvasEl,
    antialias: true
  })

  const controls = options.withOrbitControls
    ? new OrbitControls(options.camera, renderer.domElement)
    : null

  if (options.objects && options.objects.length)
    scene.add(...options.objects)

  const update = (delta: number) => {
    if (options.animate)
      options.animate(delta, scene, renderer)

    if (controls)
      controls.update()

    updateAspectRatio(
      options.canvasEl,
      options.camera,
      renderer
    )

    renderer.render(scene, options.camera)
    requestAnimationFrame(update)
  }

  requestAnimationFrame(update)

  return { scene, renderer, controls }
}


const updateAspectRatio = (
  el: HTMLCanvasElement,
  camera: Camera,
  renderer: WebGLRenderer
) => {
  if (!el) return

  const shouldResize =
    renderer.domElement.width !== el.clientWidth ||
    renderer.domElement.height !== el.clientHeight

  if (!shouldResize) return

  if (camera instanceof PerspectiveCamera) {
    camera.aspect = el.clientWidth / el.clientHeight
    camera.updateProjectionMatrix()
  }

  if (camera instanceof OrthographicCamera) {
    const aspect = el.clientWidth / el.clientHeight
    const frustumHeight = el.clientHeight
    const frustumWidth = frustumHeight * aspect

    camera.left = -frustumWidth / 2
    camera.right =  frustumWidth / 2
    camera.top = frustumHeight / 2,
    camera.bottom = -frustumHeight / 2
  }


  renderer.setSize(el.clientWidth, el.clientHeight, false)
}

