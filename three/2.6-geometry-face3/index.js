/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();





/**
 * 创建网格模型
 */
var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

// 两个三角形有6个顶点，但是两个顶点位置重合的，可以设置4个顶点即可
var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
//顶点坐标添加到geometry对象
geometry.vertices.push(p1, p2, p3, p4);

//三角面每个顶点的法向量
var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
var n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
var n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量

// 三角面1
var face1 = new THREE.Face3(0, 1, 2);
// 三角面1的法向量
face1.normal = new THREE.Vector3(0, 0, -1); // 直接定义三角形面的法线方向（设置法向量方式一）
// face1.vertexNormals.push(n1, n2, n3); // 定义三角形三个顶点的法线方向数据来表示三角形面法线方向（设置法向量方式二）
face1.color = new THREE.Color(0xffff00); // 设置三角形颜色（设置颜色方式一）

// 三角面2
var face2 = new THREE.Face3(0, 2, 3);
// 三角面2的法向量
face2.normal = new THREE.Vector3(0, -1, 0); // 直接定义三角形面的法线方向（设置法向量方式一）
// face2.vertexNormals.push(n1, n2, n3); // 定义三角形三个顶点的法线方向数据来表示三角形面法线方向（设置法向量方式二）
 // 设置三角形三个顶点的颜色（设置颜色方式二）
face2.vertexColors = [
  new THREE.Color(0xffff00),
  new THREE.Color(0xff00ff),
  new THREE.Color(0x00ffff),
]

//三角面face1、face2添加到几何体中
geometry.faces.push(face1, face2);

//材质对象Material
var material = new THREE.MeshLambertMaterial({
    // color: 0x0000ff,
    vertexColors: THREE.VertexColors, //以顶点颜色为准
    side: THREE.DoubleSide, //两面可见
});
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
point.position.set(150, 100, 100); //点光源位置
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
