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
point.position.set(0, 0, 600); //点光源位置
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

// setInterval
function renderByInterval() {
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
    mesh2.rotateY(0.01);
    mesh3.rotateY(0.01);
}
//间隔20ms周期性调用函数fun,20ms也就是刷新频率是50FPS(1s/20ms)，每秒渲染50次
// setInterval(renderByInterval, 20);
// setInterval(renderByInterval, 1 / 60 * 1000); // 60帧/秒
// setInterval(renderByInterval, 200) // 频率过低时，会有明显卡顿
// setInterval(renderByInterval, 10)

// requestAnimationFrame：更接近60帧/秒
function renderByAnimationFrame() {
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
    mesh2.rotateY(0.01);
    mesh3.rotateY(0.01);
    requestAnimationFrame(renderByAnimationFrame); //请求再次执行渲染函数render
}
// renderByAnimationFrame();

/*
    均匀旋转
        requestAnimationFrame不一定完全按照 60FPS 频率执行，两次渲染函数执行间隔时间也不一定相同，就会导致旋转不均匀
*/
let T0 = new Date(); //上次时间
function renderByBalance() {
    let T1 = new Date(); //本次时间
    let t = T1 - T0; //时间差
    T0 = T1; //把本次时间赋值给上次时间
    requestAnimationFrame(renderByBalance);
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotateY(0.001 * t); //旋转角速度0.001弧度每毫秒
    mesh2.rotateY(0.001 * t);
    mesh3.rotateY(0.001 * t);
}
renderByBalance();
