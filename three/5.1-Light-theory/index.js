/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();

/**
 * 创建网格模型
 */
var geometry = new THREE.BoxGeometry(50, 50, 50); //创建一个立方体几何对象Geometry

var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 辅助坐标系 AxesHelper
scene.add(new THREE.AxesHelper(200));







/**
 * 光源设置（没有光源的时候，默认都是黑色的）
 */

/*
    环境光 AmbientLight （环境光颜色与网格模型的颜色进行RGB进行乘法运算）
        环境光是没有特定方向的光源，主要是均匀整体改变Threejs物体表面的明暗效果，这一点和具有方向的光源不同
*/
var ambient = new THREE.AmbientLight(0xffffff);
// scene.add(ambient);

/*
    点光源 PointLight
        光线沿着发光核心向外发散，同一平面的不同位置与点光源光线入射角是不同的，点光源照射下，同一个平面不同区域是呈现出不同的明暗效果
*/
var point = new THREE.SpotLight(0xffffff);
// point.position.set(400, -200, 400); //点光源位置
point.position.set(100, 100, 0); //点光源位置
// scene.add(point); //点光源添加到场景中

/*
    平行光 DirectionalLight
*/
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(100, 100, 0);
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
directionalLight.target = mesh;
// scene.add(directionalLight);

/*
    聚光源 SpotLight
*/
// 聚光光源
var spotLight = new THREE.SpotLight(0xffffff);
// 设置聚光光源位置
spotLight.position.set(200, 200, 0);
// 聚光灯光源指向网格模型mesh
spotLight.target = mesh;
// 设置聚光光源发散角度
spotLight.angle = Math.PI / 24
scene.add(spotLight);

/*
    平行光漫反射简单数学模型：漫反射光的颜色 = 网格模型材质颜色值 x 光线颜色 x 光线入射角余弦值
*/






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
