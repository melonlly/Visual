import Vector2D from "../common/Vector2D.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 坐标转换
ctx.translate(0, canvas.height); // 原点从 左上角 移动到 左下角
ctx.scale(1, -1); // 翻转 y 轴
ctx.lineCap = "round"; // 绘制每一条线段末端为一个 圆点

/*
    context 是我们的 Canvas2D 上下文
    v0 是起始向量
    length 是当前树枝的长度
    thickness 是当前树枝的粗细
    dir 是当前树枝的方向，用与 x 轴的夹角表示，单位是弧度
    bias 是一个随机偏向因子，用来让树枝的朝向有一定的随机性
*/
function drawBranch(context, v0, length, thickness, dir, bias) {
    const v = new Vector2D().rotate(dir).scale(length); // 旋转单位向量，延长为树枝长度，获得树枝的向量（相对于起始点）
    const v1 = v0.copy().add(v); // 与起始向量相加，获得树枝的终点坐标（相对于原点）

    context.lineWidth = thickness; // 初始树枝宽度
    context.beginPath();
    context.moveTo(...v0);
    context.lineTo(...v1);
    context.stroke();

    if (thickness > 2) {
        const left =
            Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
        drawBranch(
            context,
            v1,
            length * 0.9,
            thickness * 0.8,
            left,
            bias * 0.9
        );
        const right =
            Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
        drawBranch(
            context,
            v1,
            length * 0.9,
            thickness * 0.8,
            right,
            bias * 0.9
        );
    }

    // 添加花瓣（红点）
    if (thickness < 5 && Math.random() < 0.3) {
        context.save();
        context.strokeStyle = "#c72c35";
        const th = Math.random() * 6 + 3; // 花瓣大小（笔刷宽度）
        context.lineWidth = th;
        context.beginPath();
        context.moveTo(...v1);
        context.lineTo(v1.x, v1.y - 1); // 向下画一小段
        context.stroke();
        context.restore();
    }
}

const v0 = new Vector2D(256, 0);
drawBranch(ctx, v0, 50, 10, 1, 3);
