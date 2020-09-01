/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/**
 * 创建网格模型
 */
var geometry = new THREE.BoxGeometry(50, 50, 50); //创建一个立方体几何对象Geometry
console.log(geometry);
console.log("几何体顶点位置数据", geometry.vertices);
console.log("三角行面数据", geometry.faces);

//创建一个矩形平面几何体
var geometry = new THREE.PlaneBufferGeometry(100, 100);
console.log(geometry);
console.log("几何体顶点位置数据", geometry.attributes.position);
console.log("几何体索引数据", geometry.index);

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
