/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));

var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);

//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(200, 200, 200); //点光源位置
scene.add(point); //点光源添加到场景中




var geometry = new THREE.PlaneGeometry(128, 128); //矩形平面
/**
 * 创建纹理对象的像素数据
 *    
 *    DataTexture
 *      通过程序创建纹理贴图的每一个像素值
 * 
 */
var width = 32; //纹理宽度
var height = 32; //纹理高度
var size = width * height; //像素大小
var data = new Uint8Array(size * 3); //size*3：像素在缓冲区占用空间
for (let i = 0; i < size * 3; i += 3) {
  // 随机设置RGB分量的值
  data[i] = 255 * Math.random()
  data[i + 1] = 255 * Math.random()
  data[i + 2] = 255 * Math.random()
  // 设置透明度分量A
  data[i + 3] = Math.random()
}
// 创建数据文理对象   RGB格式：THREE.RGBFormat
var texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
texture.needsUpdate = true; //纹理更新
//打印纹理对象的image属性
// console.log(texture.image);

var material = new THREE.MeshPhongMaterial({
  map: texture, // 设置纹理贴图
  transparent: true, //允许透明设置
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)















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
