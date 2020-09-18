#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 使用 0.0~1.0 之间的值在Y上绘制一条线
float plot(vec2 st) {
    /*
        smoothstep(float edge0, float edge1, float x)
            当给定一个范围的上下限和一个数值，这个函数会在已有的范围内给出插值
            前两个参数规定转换的开始和结束点，第三个是给出一个值用来插值
    */
    return smoothstep(0.02, 0.01, abs(st.y - st.x));
    // return smoothstep(0.01, 0.0, st.x);
    // return smoothstep(0.01, 0.0, st.y);
}

// float plot(vec2 st, float pct){
//   return  smoothstep( pct-0.02, pct, st.y) -
//           smoothstep( pct, pct+0.02, st.y);
// }

void main() {
    /*
        规范化
            将 (x, y) 中 x 和 y 转换为 0.0 到 1.0 之间的值
        
        可以将 x 和 y 映射到 红绿色道 （rgb中的rg）
    */
	vec2 st = gl_FragCoord.xy / u_resolution;

    // float y = st.x; // 0.0 ~ 1.0
    float y = step(0.2, st.x); // x > 0.2 ? 1.0 : 0.0
    // float y = pow(st.x, 2.0);

    vec3 color = vec3(y); // 转化为 rgb

    // 画一条线
    float pct = plot(st);
    // float pct = plot(st, y);
    color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);

	gl_FragColor = vec4(color, 1.0);

    /*
        x 与 y（或亮度）之间一对一的关系称作 线性插值

            插值 是离散函数逼近的重要方法
                利用它可通过函数在有限个点处的取值状况，估算出函数在其他点处的近似值
            
            对计算机来说，屏幕像素是离散的而不是连续的，计算机图形学常用插值来填充图像像素之间的空隙

    */

}