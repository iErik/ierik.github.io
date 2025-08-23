//force 20 fps
//#define iTime (floor(iTime*20.)/20.)

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

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from -1 to 1)
    //vec2 uv = 2.*fragCoord/iResolution.xy-1.;
    vec2 tuv = fragCoord/iResolution.xy;

    vec2 uv = (2.*fragCoord-iResolution.xy)/iResolution.y;

    t = iTime+.2*sin(uv.x*1.76+uv.y*1.+iTime);

    vec3 p = vec3(0,0,-2);
    p.y += .6*sin(iTime);
    vec3 rd = normalize(vec3(uv,1.4));

    //rd.xz*=rot(iTime);

    float d =9999.;

    for(int i = 0; i < 14; i++)
    {
        d = map(p);
        p += rd*d;
        if(d < .001 || d > 10.) break;
    }

    vec3 n;
    n = norm(p);

    vec3 ld = normalize(vec3(0.5,.0,-.4));

    float l = max(0.4,dot(-n,ld));
    //vec3 c = .5+.5*sin( sin(6.*n)+3.*length(p)+3.*iTime );

    d = l/(d*d+.6);

    // Output to screen
    //fragColor = d*(.4+.3* abs(sin(length(2.*cos(p))*n+t)).rgbb);
    fragColor = d*(.4+.3* abs(sin(length(2.*cos(3.4))*n+t)).rgbb);
    float b = texelFetch(iChannel0, ivec2(fragCoord)/2%8,0).r;
    fragColor = floor(fragColor*4.+2.*b-1.)/4.;
    //fragColor = floor(fragColor*4.+2.*0.002-1.)/4.;
}
