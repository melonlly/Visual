/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));

var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);







/**
 * 创建旋转网格模型
 *  LatheGeometry(points, segments, phiStart, phiLength)
 *    参数	      值
      points	    Vector2表示的坐标数据组成的数组
      segments	  圆周方向细分数，默认12
      phiStart	  开始角度,默认0
      phiLength	  旋转角度，默认2π
 */
// var points = [
//   new THREE.Vector2(50,60),
//   new THREE.Vector2(25,0),
//   new THREE.Vector2(50,-60)
// ];
// var geometry = new THREE.LatheGeometry(points,30);
// var material=new THREE.MeshPhongMaterial({
//   color:0x0000ff,//三角面颜色
//   side:THREE.DoubleSide//两面可见
// });//材质对象
// material.wireframe = true;//线条模式渲染(查看细分数)
// var mesh = new THREE.Mesh(geometry,material);//旋转网格模型对象
// scene.add(mesh);//旋转网格模型添加到场景中


/*
  借助Shape对象的方法.splineThru()，把上面的三个顶点进行样条插值计算，可以得到一个光滑的旋转曲面
*/
var shape = new THREE.Shape();//创建Shape对象
var points = [//定位定点
    new THREE.Vector2(50,60),
    new THREE.Vector2(25,0),
    new THREE.Vector2(50,-60)
];
shape.splineThru(points);//顶点带入样条插值计算函数
var splinePoints = shape.getPoints(20);//插值计算细分数20
var geometry = new THREE.LatheGeometry(splinePoints,30);//旋转造型
var material=new THREE.MeshPhongMaterial({
  color:0x0000ff,//三角面颜色
  side:THREE.DoubleSide//两面可见
});//材质对象
// material.wireframe = true;//线条模式渲染(查看细分数)
var mesh = new THREE.Mesh(geometry,material);//旋转网格模型对象
scene.add(mesh);//旋转网格模型添加到场景中













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