/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));

var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);




var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('../../textures/太阳能板.png');

/*
  阵列
*/
// 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(4, 2);

// 不设置重复  偏移范围-1~1
texture.offset = new THREE.Vector2(0.3, 0.1)

// 设置纹理旋转角度
texture.rotation = Math.PI/4;
// 设置纹理的旋转中心，默认(0,0)
texture.center.set(0.5,0.5);
console.log(texture.matrix);



/**
 * 创建一个地面
 */
// var geometry = new THREE.PlaneGeometry(1000, 1000); //矩形平面
// // 加载树纹理贴图
// var texture = new THREE.TextureLoader().load("../../textures/grass.jpg");
// // 设置阵列
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// // uv两个方向纹理重复数量
// texture.repeat.set(5, 5);
// var material = new THREE.MeshLambertMaterial({
//   map: texture,
// });
// var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// scene.add(mesh); //网格模型添加到场景中
// mesh.rotateX(-Math.PI / 2);


/**
 * 纹理动画
 *    
 *    必须要在渲染函数中 render() 一直执行 texture.offset.x -= 0.06 动态改变纹理对象Texture的偏移属性.offset就可以   
 * 
 */
var geometry = new THREE.BoxGeometry(30, 100, 50);
var geometry2 = new THREE.BoxGeometry(30, 100, 50);
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
});
var mesh = new THREE.Mesh(geometry, material);
var mesh2 = new THREE.Mesh(geometry2, material);
var axis = new THREE.Vector3(-2, -1, 0);
var axis2 = new THREE.Vector3(2, -1, 0);
scene.add(mesh)
scene.add(mesh2)
mesh.translateOnAxis(axis, 30);
mesh2.translateOnAxis(axis2, 30);

/**
 * 创建一个设置重复纹理的管道
 */
// var curve = new THREE.CatmullRomCurve3([
//   new THREE.Vector3(-80, -40, 0),
//   new THREE.Vector3(-70, 40, 0),
//   new THREE.Vector3(70, 40, 0),
//   new THREE.Vector3(80, -40, 0)
// ]);
// var tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.6, 50, false);
// var textureLoader = new THREE.TextureLoader();
// var texture = textureLoader.load('../../textures/run.png');
// // 设置阵列模式为 RepeatWrapping
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping
// // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
// // 等价texture.repeat= new THREE.Vector2(20,1)
// texture.repeat.x = 20;
// var tubeMaterial = new THREE.MeshPhongMaterial({
//   map: texture,
//   transparent: true,
// });
// var tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial); //网格模型对象Mesh
// scene.add(tubeMesh);













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
    requestAnimationFrame(render);
    // 使用加减法可以设置不同的运动方向
    // 设置纹理偏移
    texture.offset.x -= 0.06
}
render();
var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建控件对象
// controls.addEventListener("change", render); //监听鼠标、键盘事件
