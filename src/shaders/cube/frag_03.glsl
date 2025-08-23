precision mediump float;

uniform sampler2D uChannel1;
uniform vec3 cameraPosition;
uniform vec2 uResolution;
uniform float uTime;

in vec2 vUv;
in vec3 vWorldPos;
in vec3 vPos;


out vec4 fragColor;


#define PIXEL_SIZE 4.0


bool getValue(float brightness, vec2 pos) {
  // do the simple math first
  if (brightness > 16.0/17.0) return false;
  if (brightness < 01.0/17.0) return true;

  vec2 pixel = floor(mod((pos.xy+0.5)/PIXEL_SIZE, 4.0));
  int x = int(pixel.x);
  int y = int(pixel.y);
  bool result = false;

  // compute the 16 values by hand, store when it's a match
   if (x == 0 && y == 0) result = brightness < 16.0/17.0;
  else if (x == 2 && y == 2) result = brightness < 15.0/17.0;
  else if (x == 2 && y == 0) result = brightness < 14.0/17.0;
  else if (x == 0 && y == 2) result = brightness < 13.0/17.0;
  else if (x == 1 && y == 1) result = brightness < 12.0/17.0;
  else if (x == 3 && y == 3) result = brightness < 11.0/17.0;
  else if (x == 3 && y == 1) result = brightness < 10.0/17.0;
  else if (x == 1 && y == 3) result = brightness < 09.0/17.0;
  else if (x == 1 && y == 0) result = brightness < 08.0/17.0;
  else if (x == 3 && y == 2) result = brightness < 07.0/17.0;
  else if (x == 3 && y == 0) result = brightness < 06.0/17.0;
  else if (x == 0 && y == 1) result =	brightness < 05.0/17.0;
  else if (x == 1 && y == 2) result = brightness < 04.0/17.0;
  else if (x == 2 && y == 3) result = brightness < 03.0/17.0;
  else if (x == 2 && y == 1) result = brightness < 02.0/17.0;
  else if (x == 0 && y == 3) result = brightness < 01.0/17.0;

	return result;
}

mat2 rot(in float a) {
	return mat2(cos(a),sin(a),-sin(a),cos(a));
}

// main distance function
float de(vec3 p) {
  float de = 0.0;

  de += length(p) - 5.0;

  de += (sin(p.x*3.0424+uTime * 1.9318)*.5+.5)*0.3;
  de += (sin(p.y*2.0157+uTime * 1.5647)*.5+.5)*0.4;

	return de;
}

// normal function
vec3 normal(vec3 p) {
	vec3 e = vec3(0.0, 0.001, 0.0);
	return normalize(vec3(
		de(p+e.yxx)-de(p-e.yxx),
		de(p+e.xyx)-de(p-e.xyx),
		de(p+e.xxy)-de(p-e.xxy)));
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  //vec2 fragCoord = vPos.xy;
  //vec2 fragCoord = vUv.xy;

  //vec2 uv = fragCoord.xy / uResolution.xy * 2.0 - 1.0;
  //vec2 uv = vPos.xy;
  vec2 uv = vUv.xy;

	//vec3 from = vec3(-50, 0, 0);
	vec3 from = vec3(-40, 0, 0);
	vec3 dir = normalize(vec3(uv*0.2, 1.0));

	dir.xz *= rot(3.1415*2.5);

	mat2 rotxz = rot(uTime*0.0652*5.0);
	//mat2 rotxz = rot(0.0652*10.0);
	mat2 rotxy = rot(0.3*-0.1);

	from.xy *= rotxy;
	from.xz *= rotxz;
	dir.xy  *= rotxy;
	dir.xz  *= rotxz;

	float mindist = 100000.0;
	//float mindist = 10000000.0;
	float totdist = 30.0;

  bool set = false;
  vec3 light = normalize(vec3(1.0, -3.0, 2.0));
  vec3 norm = vec3(0);

  vec3 p = from + totdist * dir;
  float dist = max(min(de(p), 1.0), 0.0);
  mindist = min(dist, mindist);

  totdist += dist;
  norm = normal(p);

	//for (int steps = 0 ; steps < 100 ; steps++) {
	for (int steps = 0 ; steps < 100 ; steps++) {
		//if (set) continue;


		if (dist < 0.01) {
      set = true;
		}
	}

  //fragColor = vec4(vec3(getValue(dot(light, vec3(0))*.5+.5, fragCoord)), 1.0);
  fragColor = vec4(vec3(getValue(dot(light, norm)*.5+.5, fragCoord)), 1.0);
}
