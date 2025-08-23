precision highp float;

//const float WIDTH = ` + (width >> 0) + `.0;
//const float HEIGHT = ` + (height >> 0) + `.0;

uniform vec2 uResolution;
uniform vec3 uMeatballs[30];

out vec4 fragColor;

void main(){
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;

  float sum = 0.0;
  for (int i = 0; i < 30; i++) {
    vec3 metaball = uMeatballs[i];
    float dx = metaball.x - x;
    float dy = metaball.y - y;
    float radius = metaball.z;

    sum += (radius * radius) / (dx * dx + dy * dy);
  }

  if (sum >= 0.99) {
    fragColor = vec4(
      mix(
        vec3(x / uResolution.x, y / uResolution.y, 1.0),
        vec3(0, 0, 0),
        max(0.0, 1.0 - (sum - 0.99) * 100.0)),
      1.0);

    return;
  }

  fragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
