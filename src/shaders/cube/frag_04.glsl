precision mediump float;

uniform sampler2D uChannel0;
uniform vec3 cameraPosition;
uniform vec2 uResolution;
uniform float uTime;

in vec2 vUv;
in vec3 vWorldPos;
in vec3 vPos;


#include _dither.glsl;

out vec4 fragColor;

void main() {
  float iTim = (floor(uTime * 20.0) / 20.0);
  vec4 tex = texture(uChannel0, vUv);
  //float offset = (sin(mod(uTime, 20.)) * 3.2);
  //float offset = (cos(mod(uTime*2.2, 20.)) * 3.2);
  float offset = (sin(mod(uTime*.00002, 1.)));
  //float offset = (cos(mod(uTime*0.00002, 5.)) * 1.0);
  //float offset = (sin(mod(iTim, 10.0)) * 1.2);
  //float offset = (cos(iTim) * 900.);

  vec2 pos = gl_FragCoord.xy * offset;
  //vec2 pos = gl_FragCoord.xy * -0.1855;

  vec2 uv = (2.0* gl_FragCoord.xy / uResolution.xy) / uResolution.y;
  vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  vec3 mixed = mix(tex.xyz, viewDirection, 0.8);
  //vec3 mixed = mix(tex.xyz, viewDirection*offset, .8);


  //fragColor = dither8x8(gl_FragCoord.xy, vec4(mixed, 1));
  fragColor = dither8x8(pos, vec4(mixed, 1));
}
