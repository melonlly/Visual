/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));

var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);






/*
  填充顶点构成的轮廓
    把五边形轮廓Shape作为ShapeGeometry的参数，可以根据轮廓坐标计算出一系列三角形面填充轮廓，形成一个平面几何体
*/
// var points = [
//   new THREE.Vector2(-50, -50),
//   new THREE.Vector2(-60, 0),
//   new THREE.Vector2(0, 50),
//   new THREE.Vector2(60, 0),
//   new THREE.Vector2(50, -50),
//   new THREE.Vector2(-50, -50),
// ]
// // 通过顶点定义轮廓
// var shape = new THREE.Shape(points);

// // shape可以理解为一个需要填充轮廓
// // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
// // ShapeGeometry的参数2表示细分数
// shape.absarc(0,0,100,0,2*Math.PI);//圆弧轮廓
// console.log(shape.getPoints(15));//查看shape顶点数据
// var geometry = new THREE.ShapeGeometry(shape, 25);

// var material = new THREE.MeshLambertMaterial({
//   color: 0x0000ff
// });
// material.wireframe = true
// var mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);


/*
  绘制地图
*/
var points = [];
// 转化为Vector2构成的顶点数组
hubei.forEach(elem => {
  points.push(new THREE.Vector2(elem[0],elem[1]))
});
// 样条曲线生成更多的点
var SplineCurve = new THREE.SplineCurve(points)
var shape = new THREE.Shape(SplineCurve.getPoints(600));
// var shape = new THREE.Shape(points);
var geometry = new THREE.ShapeGeometry(shape);
geometry.center();//几何体居中
geometry.scale(30,30,30);//几何体缩放
var material = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide //两面可见
}); //材质对象
var mesh = new THREE.Mesh(geometry, material); //网格模型对象
scene.add(mesh);

var axis = new THREE.Vector3(1, 1, 1);
mesh.translateOnAxis(axis, 50);
// mesh.rotateOnAxis(axis, Math.PI/8)








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
