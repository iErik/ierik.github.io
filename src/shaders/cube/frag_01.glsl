precision mediump float;


uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vWorldPos;

float Bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2. + a.y * a.y * .75);
}

#define Bayer4(a)   (Bayer2 (.5 *(a)) * .25 + Bayer2(a))
#define Bayer8(a)   (Bayer4 (.5 *(a)) * .25 + Bayer2(a))
#define Bayer16(a)  (Bayer8 (.5 *(a)) * .25 + Bayer2(a))
#define Bayer32(a)  (Bayer16(.5 *(a)) * .25 + Bayer2(a))
#define Bayer64(a)  (Bayer32(.5 *(a)) * .25 + Bayer2(a))

void main () {
    //float dithering = Bayer64(gl_FragCoord.xy * 0.25) - 0.5;

    //vec2 uv = gl_FragCoord.xy / uResolution.xy;
    //vec2 uv = gl_FragCoord.xy / uResolution.xy;

    vec2 uv = (gl_FragCoord.xy -0.5 / uResolution.xy) / uResolution.y;
    float dithering = Bayer64(uv * 0.25) - 0.5;

    uv.x += dithering;

    gl_FragColor = vec4(uv.x < 0.5);
}
