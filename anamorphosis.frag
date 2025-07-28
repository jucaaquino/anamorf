#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

void main(void) {
    vec2 p = gl_FragCoord.xy/u_resolution.xy;
    p = p * 2.0 - 1.0;
    float aspect = u_resolution.x/u_resolution.y;
    p.x *= aspect;

    p *= 1.5;
    p = p * 0.5 + 0.5;


    float fov = radians(30.0);

    mat4 m = mat4(
        vec4(1.0 / tan(fov*0.5), 0.0,                0.0, 0.0),
        vec4(0.0,                1.0 / tan(fov*0.5), 0.0, 0.0),
        vec4(0.0,                0.0,               -1.0,-2.0),
        vec4(0.0,                0.0,               -1.0, 0.0)
    );

    //p = (vec4(p, 10.0, 1.0) * m).xy;

    float imgAspect = u_tex0Resolution.x /
                      u_tex0Resolution.y;

    vec2 uv = p * vec2(1.,imgAspect);
    uv.y += (1.0 - imgAspect) * 0.5;

    vec3 color = vec3(0.0);

    if (all(   lessThan(p, vec2(1.0, 1.0))) && 
        all(greaterThan(p, vec2(0.0, 0.0)))) {
        color = vec3(p.xy, 1.0);
    }

    if (all(   lessThan(uv, vec2(1.0, 1.0))) && 
        all(greaterThan(uv, vec2(0.0, 0.0)))) {
        color = texture2D(u_tex0, uv).rgb;
    } 

    gl_FragColor = vec4(color,1.0);
}
