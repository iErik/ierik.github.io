precision mediump float;

#define MAX_STEPS 100
#define MAX_DIST 10000.
#define EPSILON 0.000001
#define PI 3.14159265
#define IVORY 1.
#define BLUE 2.
#define BLACK 3.
#define RED 4.

#define PHI (sqrt(5.)*0.5 + 0.5)


uniform sampler2D uChannel0;
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vWorldPos;


mat2 Rot(float a) {
  float s = sin(a), c = cos(a);

  return mat2(c, -s, s, c);
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(
    max(q, 0.0) +
    min(max(q.x, max(q.y, q.z)), 0.0)
  );
}

float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

vec2 getDist(vec3 p, float t) {
  p.xz *= Rot(t * 5.0);
  p.xy *= Rot(t * 7.0);

  float scale = 1.0 + 0.2 * sin(t * 10.0);
  p /= scale;

  return vec2(sdTorus(p, vec2(1.2, .5)) * scale, RED);
}


vec3 rayMarch(vec3 ro, vec3 rd, float t) {
  float d = 0.0;
  float info = 0.0;
  int steps = 0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec2 distToClosest = getDist(ro + rd * d, t);
    steps++;
    d += abs(distToClosest.y);
    info = distToClosest.y;

    if (abs(distToClosest.x) < EPSILON || d > MAX_DIST) {
      break;
    }
  }

  return vec3(d, info, steps);
}

vec3 getNormal(vec3 p, float t) {
  vec2 e = vec2(EPSILON, 0.0);
  vec3 n = getDist(p, t).x - vec3(
    getDist(p - e.xyy, t).x,
    getDist(p - e.yxy, t).x,
    getDist(p - e.yyx, t).x
  );

  return normalize(n);
}

vec3 getRayDirection(vec3 ro, vec2 uv, vec3 lookAt) {
  vec3 rd;
  rd = normalize(vec3(uv - vec2(0, 0), 1.0));
  vec3 lookTo = lookAt - ro;
  float hAngle =
    acos(dot(lookTo.xz, rd.xz) /
    length(lookTo.xz) *
    length(rd.xz));

  rd.xz *= Rot(hAngle);
  return rd;
}

vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
  vec3 f = normalize(l - p),
       r = normalize(cross(vec3(0,1,0), f)),
       u = cross(f, r),
       c = f*z,
       i = c + uv.x * r + uv.y * u,
       d = normalize(i);

  return d;
}


void main() {
  //vec2 uv = vUv;
  vec2 uv = (gl_FragCoord.xy -0.5 / uResolution.xy) / uResolution.y;
  //vec2 uv = ((gl_FragCoord.xy) * uResolution.xy) / uResolution.y;
  //vec2 uv = (vUv -0.5 * uResolution.xy) / uResolution.y;

  float camRadius = 4.0;
  vec3 ro = vec3(0, 0, -camRadius);
  float zoom = 1.100;
  float t = uTime / 5.0;

  //vec3 color, rm, rd = getRayDir(uv, ro, vec3(0), 1.0);
  vec3 color, rm, rd = getRayDir(uv, ro, vWorldPos, 1.0);
  float d;

  for (int i = 0; i < 3; i++) {
    rm = rayMarch(ro, rd, t);
    d = rm.x;
    vec3 light = vec3(10, 0, 0);
    vec3 p = ro + rd * d;

    if (d < MAX_DIST) {
      vec3 n = getNormal(p, t);
      vec3 dirToLight = normalize(light - p);
      vec3 rayMarchLight = rayMarch(
        p + dirToLight * .06,
        dirToLight,
        t
      );

      float distToObstacle = rayMarchLight.x;
      float distToLight = length(light - p);

      if (d < MAX_DIST) {
        color[i] = .5 * (dot(n, normalize(light - p))) + .5;
        color[i] = step(
          texture2D(
            uChannel0,
            uv
            //vec2(1.0, 0.4)
            //((gl_FragCoord + 8.0 * float(i)) / 32.0).xy
            //((vUv + 8.0 * float(i)) / 32.0).xy
          ).x,
          color[i]
        );
      }
    }
  }

  gl_FragColor = vec4(vec3(color), 1);
  //gl_FragColor = vec4(vec3(d / MAX_DIST), 1.0);
  //gl_FragColor = texture2D(uChannel0, uv);
}
