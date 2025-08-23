precision mediump float;

uniform vec3 cameraPosition;

in vec2 vUv;
in vec3 vWorldPos;
in vec3 vPos;

#include ../utils/_dither.glsl;

out vec4 fragColor;

void main() {
  //vec4 tex = texture(uChannel0, vUv);
  //float offset = (sin(mod(uTime, 20.)) * 3.2);
  //float offset = (cos(mod(uTime*2.2, 20.)) * 3.2);
  //float offset = (sin(mod(iTim, 10.0)) * 1.2);
  //float offset = (cos(iTim) * 900.);

  //vec2 pos = gl_FragCoord.xy * offset;
  //vec2 pos = gl_FragCoord.xy * -0.1855;

  //vec2 uv = (2.0* gl_FragCoord.xy / uResolution.xy) / uResolution.y;
  //vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  //vec3 mixed = mix(tex.xyz, viewDirection, 0.8);


  fragColor = dither4x4(
    gl_FragCoord.xy * 0.4,
    vec4(.25,.25,.25,1)
  );
  //fragColor = dither4x4(pos, vec4(mixed, 1));
}
