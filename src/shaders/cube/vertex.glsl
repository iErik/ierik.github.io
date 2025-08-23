precision mediump float;

//attribute vec3 position;
//attribute vec3 normal;
//attribute vec2 uv;

in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;


uniform vec2 uResolution;
uniform float uTime;

//varying vec2 vUv;
//varying vec3 vWorldPos;
//varying vec3 vPos;
out vec2 vUv;
out vec3 vWorldPos;
out vec3 vPos;


void main() {
  vUv = uv;
  vPos = position;
  vWorldPos = (modelViewMatrix * vec4(position, 1.0)).xyz;

  gl_Position =
    projectionMatrix *
    modelViewMatrix *
    vec4(position, 1.0);
}
