type ShaderType
  = typeof WebGLRenderingContext.FRAGMENT_SHADER
  | typeof WebGLRenderingContext.VERTEX_SHADER

export function compileShader(
  gl: WebGLRenderingContext,
  shaderSource: string,
  shaderType: ShaderType
) {
  const shader = gl.createShader(shaderType)

  if (!shader) {
    throw "Couldn't create shader!"
  }

  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw "Shader compile failed with: " +
      gl.getShaderInfoLog(shader)
  }

  return shader
}

export function getUniformLocation(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string
) {
  const uniformLocation = gl.getUniformLocation(
    program,
    name
  )

  if (uniformLocation === -1) {
    throw 'Can not find uniform ' + name + '.'
  }

  return uniformLocation
}

export function getAttribLocation(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string
) {
  const attributeLocation = gl.getAttribLocation(
    program,
    name
  )

  if (attributeLocation === -1) {
    throw 'Can not find attribute ' + name + '.'
  }

  return attributeLocation
}

export function createAndUseShader(
  gl: WebGLRenderingContext,
  shaders: {
    vertexShader: WebGLShader
    fragmentShader: WebGLShader
  }
): WebGLProgram {
  const program = gl.createProgram()
  gl.attachShader(program, shaders.vertexShader)
  gl.attachShader(program, shaders.fragmentShader)
  gl.linkProgram(program)
  gl.useProgram(program)

  return program
}

export function bindBuffer(
  gl: WebGLRenderingContext,
  target: GLenum,
  usage: GLenum,
  data: any
) {
  const dataBuffer = gl.createBuffer()
  gl.bindBuffer(target, dataBuffer)
  gl.bufferData(target, data, usage)

  return dataBuffer
}
