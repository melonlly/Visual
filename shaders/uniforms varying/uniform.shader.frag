#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

/*
    GPU 的硬件加速支持我们使用角度，三角函数和指数函数
        sin()
        cos()
        tan()
        asin()
        acos()
        atan()
        pow()
        exp()
        log()
        sqrt()
        abs()
        sign()
        floor()
        ceil()
        fract()
        mod()
        min()
        max()
        clamp()
*/
void main() {
	// gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
    gl_FragColor = vec4(abs(fract(u_time)), 0.0, 0.0, 1.0);
}