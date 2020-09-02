/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/**
 * 创建网格模型
 */
// var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
var geometry = new THREE.BoxGeometry(50, 50, 100); //创建一个立方体几何对象Geometry

// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
var cylinder = new THREE.CylinderGeometry(50, 50, 100, 25);
// 正八面体
var octahedron = new THREE.OctahedronGeometry(50);
// 正十二面体
var dodecahed = new THREE.DodecahedronGeometry(50);
// 正二十面体
var icosahedron = new THREE.IcosahedronGeometry(50);




//材质对象Material
var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
    opacity: 0.5,
    transparent: true,
});
var material2 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    // opacity:0.5,
    // transparent:true
});
material2.opacity = 0.5;
material2.transparent = true;
var material3 = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    opacity: 0.5,
    transparent: true,
});
material3.wireframe = true; // 将几何图形渲染为线框
// 设置高光材质
var material4 = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    specular: 0x4488ee, // 反光色
    shininess: 12, // 反光度
});

var mesh = new THREE.Mesh(icosahedron, material); //网格模型对象Mesh
var mesh2 = new THREE.Mesh(geometry, material2);
var mesh3 = new THREE.Mesh(cylinder, material3);
var mesh4 = new THREE.Mesh(octahedron, material4);
scene.add(mesh); //网格模型添加到场景中
mesh2.translateX(300);
mesh2.translateY(200);
mesh2.translateZ(100);
scene.add(mesh2);
mesh3.position.set(100, 200, 300);
scene.add(mesh3);
mesh4.position.set(100, -100, 100);
scene.add(mesh4);





// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(400));

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
// point.position.set(400, -200, 400); //点光源位置
point.position.set(300, 100, 200); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 300; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// var camera = new THREE.PerspectiveCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(400, 500, 400); //设置相机位置
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
