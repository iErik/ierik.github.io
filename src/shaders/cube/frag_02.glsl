precision mediump float;

uniform sampler2D uChannel0;
uniform vec3 cameraPosition;
uniform vec2 uResolution;
uniform float uTime;

//varying vec2 vUv;
//varying vec3 vWorldPos;
//varying vec3 vPos;

in vec2 vUv;
in vec3 vWorldPos;
in vec3 vPos;

out vec4 fragColor;



float t;

mat2 rot(float a)
{
    float s = sin(a), c = cos(a);
    return mat2(c,s,-s,c);
}

float sdBox( vec3 p, vec3 b )
{
  //p = fract(p/10.)*10.-5.;
  //p = sin(p/6.)*6.;
  p.xz *= rot(t);
  p.yx *= rot(.6*t);

  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}

float sdRay(vec3 p, vec3 s, vec3 e){
    e = s + e;
    vec3 l1 = p-s;
    vec3 l2 = (e-s)*(max( dot(l1,(e-s) ) /(dot(e-s,e-s)), 0.) );

    return length(l1-l2)-.2;
}

float map(vec3 p){
    float b = sdBox(p-vec3(0,0,7),vec3(2.7));
    return b;
}

vec3 norm(vec3 p){
    vec2 xz = dFdx(p).xz;
    vec2 yz = dFdy(p).yz;
    vec3 xyz = vec3(-xz.x,yz.y,(xz.y+yz.y)/2.);
    return normalize(xyz);
}


void main() {
  float iTim = (floor(uTime * 20.0) / 20.0);
  //vec2 uv = (gl_FragCoord.xy - 0.5 / uResolution.xy) / uResolution.y;
  vec2 uv = (2.0* gl_FragCoord.xy / uResolution.xy) / uResolution.y;



  //vec3 viewDirection = normalize(cameraPosition - vPos);
  vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  //vec4 tex = texture2D(uChannel0, vUv);
  vec4 tex = texture(uChannel0, vUv);
  //vec4 tex = texture2D(uChannel0, uv);

  vec3 mixed = mix(tex.xyz, viewDirection, 0.8);

  //float steped = step(tex.x, viewDirection.x);

  //gl_FragColor = vec4(cameraPosition, 1);
  //gl_FragColor = vec4(viewDirection, 1);
  //gl_FragColor = vec4(mixed, 1.0);
  //gl_FragColor = vec4(steped, 1.0);

  //vec3 p = vec3(0, 0.6 * sin(uTime), -2);
  vec3 p = vec3(0, 0.6 * sin(iTim), -2);
  //p.y += 0.6 * sin(uTime);

  //t = uTime + 0.2 * sin(uv.x * 1.76 + uv.y * 1.0 + uTime);
  t = iTim + 0.2 * sin(uv.x * 1.76 + uv.y * 1.0 + iTim);

  vec3 n = norm(p);
  float b = texelFetch(
    uChannel0,
    ivec2(gl_FragCoord.xy) / 2 % 9,
    //ivec2(vUv.xy) / 6 % 9,
    //ivec2(vUv.xy) / 4 % 10,
    //ivec2(gl_FragCoord.xy) / 1,
    //ivec2(uv.xy) / 2 % 10,
    //ivec2(vUv.xy) / 2 % 8,
    0
  ).g;

  vec4 color = vec4(mixed, 1.0);
  //color = (.4+.3* abs(sin(length(2.*cos(p))*n+t)).rgbb);
  //color = floor(color * 5.0 + 2.0 * b - 1.0) / 4.0;
  //color = floor(color * 3.0 + 1.0 * b - 1.0) / 4.0;
  color = color * b;

  fragColor = color;
  //fragColor = vec4(1.0, 0, 0, 1);
}
