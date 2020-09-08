/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));

var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);






// 纹理贴图映射到一个矩形平面上
// var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
// var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
var geometry = new THREE.SphereGeometry(60, 25, 25); //球体

// // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
// var textureLoader = new THREE.TextureLoader();
// // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
// textureLoader.load('../../textures/Earth.png', function(texture) {
//   var material = new THREE.MeshLambertMaterial({
//     // color: 0x0000ff,
//     // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
//     map: texture,//设置颜色贴图属性值
//   }); //材质对象Material
//   var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//   scene.add(mesh); //网格模型添加到场景中

//   //纹理贴图加载成功后，调用渲染函数执行渲染操作
//   render();
// })

// 图片加载器
var ImageLoader = new THREE.ImageLoader();
// load方法回调函数，按照路径加载图片，返回一个html的元素img对象
ImageLoader.load('../../textures/Earth.png', function(img) {
  // image对象作为参数，创建一个纹理对象Texture
  var texture = new THREE.Texture(img);
  // 下次使用纹理时触发更新
  texture.needsUpdate = true;
  var material = new THREE.MeshLambertMaterial({
    map: texture, //设置纹理贴图
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中
});






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