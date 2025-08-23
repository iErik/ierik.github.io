in vec3 position;
in vec3 normal;
in vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;


uniform vec2 uResolution;
uniform float uTime;


void main() {
  // position specifies only x and y.
  // We set z to be 0.0, and w to be 1.0
  //gl_Position = vec4(position, 0.0, 1.0);

  gl_Position =
    projectionMatrix *
    modelViewMatrix *
    vec4(position, 1.0);

}
