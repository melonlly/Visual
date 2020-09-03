/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));

var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);







var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

// 绘制一个U型轮廓
var R = 80;//圆弧半径
var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
// 半圆弧的一个端点作为直线的一个端点
var line1 = new THREE.LineCurve(new THREE.Vector2(R, 200, 0), new THREE.Vector2(R, 0, 0));
var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 200, 0));
// 创建组合曲线对象CurvePath
var CurvePath = new THREE.CurvePath();
// 把多个线条插入到CurvePath中
CurvePath.curves.push(line1, arc, line2);
//分段数200
var points = CurvePath.getPoints(200); // 201个顶点
// setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
geometry.setFromPoints(points);

//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0x000000
});
//线条模型对象
var line = new THREE.Line(geometry, material);
scene.add(line); //线条对象添加到场景中

















/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
// camera.position.set(300, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);

function render() {
    renderer.render(scene, camera); //执行渲染操作
}
render();
var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建控件对象
controls.addEventListener("change", render); //监听鼠标、键盘事件
