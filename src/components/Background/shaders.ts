export const vertexShader = () => `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

export const fragmentShader = (numMeatballs: number) => `
precision highp float;

uniform vec3 uMeatballs[${numMeatballs}];
uniform vec2 uResolution;

void main(){
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;

  float sum = 0.0;
  for (int i = 0; i < ${numMeatballs}; i++) {
    vec3 meatball = uMeatballs[i];
    float dx = meatball.x - x;
    float dy = meatball.y - y;
    float radius = meatball.z;

    sum += (radius * radius) / (dx * dx + dy * dy);
  }

  if (sum >= 0.99) {
    gl_FragColor = vec4(
      mix(
        vec3(x / uResolution.x, y / uResolution.y, 1.0),
        vec3(0, 0, 0),
        max(0.0, 1.0 - (sum - 0.99) * 100.0)),
      1.0
    );

    return;
  }

  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}

`
