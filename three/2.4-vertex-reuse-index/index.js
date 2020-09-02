/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();





/**
 * 创建网格模型
 */

/*
  不使用顶点索引
*/
// var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
// //类型数组创建顶点位置position数据
// var vertices = new Float32Array([
//   0, 0, 0, //顶点1坐标
//   80, 0, 0, //顶点2坐标
//   80, 80, 0, //顶点3坐标

//   0, 0, 0, //顶点4坐标    和顶点1位置相同 ！
//   80, 80, 0, //顶点5坐标  和顶点3位置相同 ！
//   0, 80, 0, //顶点6坐标
// ]);
// // 创建属性缓冲区对象
// var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
// // 设置几何体attributes属性的位置position属性
// geometry.attributes.position = attribue
// var normals = new Float32Array([
//   0, 0, 1, //顶点1法向量
//   0, 0, 1, //顶点2法向量
//   0, 0, 1, //顶点3法向量

//   0, 0, 1, //顶点4法向量
//   0, 0, 1, //顶点5法向量
//   0, 0, 1, //顶点6法向量
// ]);
// // 设置几何体attributes属性的位置normal属性
// geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标


/* 
  使用索引
*/
var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
//类型数组创建顶点位置position数据 （去除重复顶点数据！！！）
var vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  80, 0, 0, //顶点2坐标
  80, 80, 0, //顶点3坐标
  0, 80, 0, //顶点4坐标
]);
// 创建属性缓冲区对象
var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = attribue
var normals = new Float32Array([
  0, 0, 1, //顶点1法向量
  0, 0, 1, //顶点2法向量
  0, 0, 1, //顶点3法向量
  0, 0, 1, //顶点4法向量
]);
// 设置几何体attributes属性的位置normal属性
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标
/*
  通过顶点索引组织顶点数据，顶点索引数组indexes通过索引值指向
    顶点位置geometry.attributes.position、
    顶点法向量geometry.attributes.normal
  中顶面数组。
*/
// Uint16Array类型数组创建顶点索引数据
var indexes = new Uint16Array([
  // 0对应第1个顶点位置数据、第1个顶点法向量数据
  // 1对应第2个顶点位置数据、第2个顶点法向量数据
  // 索引值3个为一组，表示一个三角形的3个顶点
  0, 1, 2,
  0, 2, 3,
])
// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1); // 1个三角形（三个顶点）为一组


//材质对象Material
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
  // side: THREE.DoubleSide // 两面可见
});
material.wireframe = true; // 将几何图形渲染为线框
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中






// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));


/**
 * 光源设置（没有光源的时候，默认都是黑色的）
 */
//点光源
var point = new THREE.PointLight(0xffffff);
// point.position.set(400, -200, 400); //点光源位置
point.position.set(200, 50, 200); //点光源位置
scene.add(point); //点光源添加到场景中
// 环境光 （环境光颜色与网格模型的颜色进行RGB进行乘法运算）
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

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
