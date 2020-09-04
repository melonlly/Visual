/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));

var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);




var canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 128;
var c = canvas.getContext('2d');
// 矩形区域填充背景
c.fillStyle = "#90EE90";
c.fillRect(0, 0, 512, 128);
c.beginPath();
// 文字
c.beginPath();
c.translate(256,64);
c.fillStyle = "#000000"; //文本填充颜色
c.font = "bold 48px 宋体"; //字体样式设置
c.textBaseline = "middle"; //文本与fillText定义的纵坐标
c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
c.fillText("大大大大西瓜", 0, 0);

// document.body.appendChild(canvas)

// canvas画布对象作为CanvasTexture的参数重建一个纹理对象
// canvas画布可以理解为一张图片
var texture = new THREE.CanvasTexture(canvas);
// 打印纹理对象的image属性
// console.log(texture.image);
// 矩形平面
var geometry = new THREE.PlaneGeometry(128, 32);

var material = new THREE.MeshPhongMaterial({
  map: texture, // 设置纹理贴图
});
// 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
var mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)

/*
  Canvas画布加载图片
*/
var ctx = canvas.getContext('2d');
var Image = new Image();
Image.src = "../../textures/Earth.png";
Image.onload = function() {
  var bg = ctx.createPattern(Image, "no-repeat");
  // ...
  // 注意图片加载完成执行canvas相关方法后，要更新一下纹理  ！！！
  texture.needsUpdate = true;
}




// 创建video对象
let video = document.createElement('video');
video.src = "../../textures/sintel.mp4"; // 设置视频地址
video.autoplay = "autoplay"; //要设置播放
// video对象作为VideoTexture参数创建纹理对象
var texture = new THREE.VideoTexture(video)
var geometry = new THREE.PlaneGeometry(108, 71); //矩形平面
var material = new THREE.MeshPhongMaterial({
  map: texture, // 设置纹理贴图
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中














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
}
render();
var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建控件对象
// controls.addEventListener("change", render); //监听鼠标、键盘事件
