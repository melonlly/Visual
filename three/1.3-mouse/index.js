/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/**
 * 创建网格模型
 */
// var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
var geometry = new THREE.BoxGeometry(100, 100, 300); //创建一个立方体几何对象Geometry
var geometry2 = new THREE.BoxGeometry(100, 300, 100);
var geometry3 = new THREE.BoxGeometry(300, 100, 100);
//材质对象Material
var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
});
// var color = new THREE.Color("rgb(0, 255, 0, 0.2)");
var material2 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
});
var material3 = new THREE.MeshLambertMaterial({
    color: 0xff0000,
});
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
var mesh2 = new THREE.Mesh(geometry2, material2);
var mesh3 = new THREE.Mesh(geometry3, material3);
scene.add(mesh); //网格模型添加到场景中
scene.add(mesh2);
scene.add(mesh3);

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
// console.log(scene)
// console.log(scene.children)

/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 300; //三维场景显示范围控制系数，系数越大，显示的范围越大
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

// requestAnimationFrame
// 注意开发中不要同时使用 requestAnimationFrame() 或 controls.addEventListener('change', render) 调用同一个函数，这样会冲突
// function render() {
//     renderer.render(scene,camera);//执行渲染操作
//     // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
//     requestAnimationFrame(render);//请求再次执行渲染函数render
// }
// render();
// var controls = new THREE.OrbitControls(camera);//创建控件对象
// // 已经通过requestAnimationFrame(render);周期性执行render函数，没必要再通过监听鼠标事件执行render函数
// // controls.addEventListener('change', render)