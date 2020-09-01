/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/**
 * 创建网格模型
 */
/*
  Geometry
    几何体 Geometry 和缓冲类型几何体BufferGeometry表达的含义相同，只是对象的结构不同，
    Threejs渲染的时候会先把 Geometry 转化为 BufferGeometry 再解析几何体顶点数据进行渲染
  
  Vector3
    Vector3是threejs的三维向量对象,可以通过Vector3对象表示一个顶点的xyz坐标，顶点的法线向量
*/
var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
var p3 = new THREE.Vector3(80, 70, 0); //顶点3坐标
//顶点坐标添加到geometry对象
geometry.vertices.push(p1, p2, p3);
// geometry.vertices <---> BufferGeometry.attributes.position

// Color对象表示顶点颜色数据
var color1 = new THREE.Color(0x00ff00); //顶点1颜色——绿色
var color2 = new THREE.Color(0xff0000); //顶点2颜色——红色
var color3 = new THREE.Color(0x0000ff); //顶点3颜色——蓝色
//顶点颜色数据添加到geometry对象
geometry.colors.push(color1, color2, color3);
// geometry.colors <---> BufferGeometry.attributes.color
/*
  注意设置几何体Geometry顶点颜色属性geometry.colors，对网格模型Mesh是无效的，对于点模型Points、线模型Line是有效果
  
    对 Mesh 设置颜色会报错：Faceless geometries are not supported.(不支持无面几何体)
*/


//材质对象Material
var material = new THREE.PointsMaterial({
  // color: 0x0000ff,
  vertexColors: THREE.VertexColors, //以顶点颜色为准
  side: THREE.DoubleSide, //两面可见
});
// material.wireframe = true; // 将几何图形渲染为线框
var points = new THREE.Points(geometry, material); //网格模型对象Mesh
scene.add(points); //网格模型添加到场景中

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
