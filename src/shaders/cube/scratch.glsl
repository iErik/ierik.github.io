#define textureCube texture

#define MAX_STEPS 100
#define MAX_DIST 100.
#define EPSILON 0.0001
#define PI 3.14159265
#define IVORY 1.
#define BLUE 2.
#define BLACK 3.
#define RED 4.

#define PHI (sqrt(5.)*0.5 + 0.5)


mat2 Rot(float a) {
    float s = sin(a), c = cos(a);
	return mat2(c, -s, s, c);
}

float sdBox( vec3 p, vec3 b )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

float sdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
vec2 getDist(vec3 p, float t) {
    p.xz*=Rot(t*5.);
    p.xy*=Rot(t*7.);
    float scale = 1. + .2*sin(t * 10.);
    p /= scale;
    return vec2(/*sdBox(p, vec3(1))*/sdTorus(p, vec2(1.2, .5)) * scale, RED);
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑









vec3 rayMarch(vec3 ro, vec3 rd, float t) {
	float d = 0.;
    float info = 0.;
    int steps = 0;
    for (int i = 0; i < MAX_STEPS; i++) {
    	vec2 distToClosest = getDist(ro + rd * d, t);
        steps++;
        d += abs(distToClosest.x);
        info = distToClosest.y;
        if(abs(distToClosest.x) < EPSILON || d > MAX_DIST) {
        	break;
        }
    }
    return vec3(d, info, steps);
}

vec3 getNormal(vec3 p, float t) {
    vec2 e = vec2(EPSILON, 0.);
    vec3 n = getDist(p, t).x - vec3(getDist(p - e.xyy, t).x,
                               getDist(p - e.yxy, t).x,
                               getDist(p - e.yyx, t).x);
	return normalize(n);
}



vec3 getRayDirection (vec3 ro, vec2 uv, vec3 lookAt) {
    vec3 rd;
    rd = normalize(vec3(uv - vec2(0, 0.), 1.));
    vec3 lookTo = lookAt - ro;
    float horizAngle = acos(dot(lookTo.xz, rd.xz) / length(lookTo.xz) * length(rd.xz));
    rd.xz *= Rot(horizAngle);
    return rd;
}

vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}


void mainImage(out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord-.5*iResolution.xy)/iResolution.y;

    float camRadius = 4.;
    vec3 ro = vec3(0, 0, -camRadius);
    float zoom = 1.100;
	float t = iTime / 5.;
    vec3 color, rm, rd = getRayDir(uv, ro, vec3(0), 1.);
    float d;
    for (int i = 0; i < 3; i++) {
        rm = rayMarch(ro, rd, t);
        d = rm[0];
        vec3 light = vec3(10,0,0);
        vec3 p = ro + rd * d;
        if (d < MAX_DIST) {
            vec3 n = getNormal(p, t);
            vec3 dirToLight = normalize(light - p);
            vec3 rayMarchLight = rayMarch(p + dirToLight * .06, dirToLight, t);
            float distToObstable = rayMarchLight.x;
            float distToLight = length(light - p);
            if (d < MAX_DIST) {
                color[i] = .5 * (dot(n, normalize(light - p))) + .5;
                color[i] = step(
                    texture(iChannel0, (fragCoord + 8.*float(i))/32.).x,
                    color[i]
                );
            }
        }
        t += .01;
    }

    fragColor = vec4(vec3(color), 1);
}
