/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));

var ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);





/*
  纹理UV坐标
      纹理坐标含义就是一面意思，一张纹理贴图图像的坐标，选择一张图片，
      比如以图片左下角为坐标原点，右上角为坐标(1.0,1.0)，图片上所有位置纵横坐标都介于0.0~1.0之间。
    
  几何体有两组UV坐标，
      第一组组用于.map、.normalMap、.specularMap等贴图的映射，
      第二组用于阴影贴图.lightMap的映射

*/

// 矩形平面，细分数默认1，即2个三角形拼接成一个矩形
// var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
/**
 * 遍历uv坐标
 */
// geometry.faceVertexUvs[0].forEach(elem => {
//   elem.forEach(Vector2 => {
//     // 所有的UV坐标全部设置为一个值
//     Vector2.set(1, 1);
//   });
// });

// 矩形平面 设置细分数4,4
var geometry = new THREE.PlaneGeometry(204, 102, 4, 4);
/**
 * 局部三角面显示完整纹理贴图
 */
var t0 = new THREE.Vector2(0, 1); //图片左下角
var t1 = new THREE.Vector2(0, 0); //图片右下角
var t2 = new THREE.Vector2(1, 0); //图片右上角
var t3 = new THREE.Vector2(1, 1); //图片左上角
var uv1 = [t0, t1, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
var uv2 = [t1, t2, t3]; //选中图片一个三角区域像素——用于映射到一个三角面
// 设置第五、第六个三角形面对应的纹理坐标
geometry.faceVertexUvs[0][4] = uv1
geometry.faceVertexUvs[0][5] = uv2


// TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
var textureLoader = new THREE.TextureLoader();
// 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
textureLoader.load('../../textures/Earth.png', function(texture) {
  var material = new THREE.MeshLambertMaterial({
    // color: 0x0000ff,
    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
    map: texture,//设置颜色贴图属性值
  }); //材质对象Material
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //网格模型添加到场景中

  //纹理贴图加载成功后，调用渲染函数执行渲染操作
  render();
})









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
