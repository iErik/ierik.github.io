precision mediump float;

in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;


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
