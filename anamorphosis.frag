#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

void main(void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float aspect = u_resolution.x/u_resolution.y;
    st.x *= aspect;

    //st -= vec2(0.5);
    //st *= 10.0;

    vec3 color = vec3(0.0);

    float imgAspect = u_tex0Resolution.x /
                      u_tex0Resolution.y;

    vec2 uv = st * vec2(1.,imgAspect);

    if (all(   lessThan(uv, vec2(1.0, 1.0))) && 
        all(greaterThan(uv, vec2(0.0, 0.0)))) {
        color = texture2D(u_tex0, uv).rgb;
    }

    gl_FragColor = vec4(color,1.0);
}
