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





















/**
 * 相机设置
 * 
 *    相机对象 Camera
 *      本质：视图矩阵 matrixWorldInverse 和投影矩阵 projectionMatrix
 *    
 *    Threejs渲染场景的时候调用相机对象的 视图矩阵 和 投影矩阵 值对顶点进行矩阵变换
 */
/**
 * 正投影相机设置
 * 
 *    OrthographicCamera( left, right, top, bottom, near, far )
 *    
 *    参数(属性)	            含义
      left	                  渲染空间的左边界
      right	                  渲染空间的右边界
      top	                    渲染空间的上边界
      bottom	                渲染空间的下边界
      near	                 near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。 默认值0.1
      far	                    far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小小，会有部分场景看不到。 默认值1000
 * 
 */
// var width = window.innerWidth; //窗口宽度
// var height = window.innerHeight; //窗口高度
// var k = width / height; //窗口宽高比
// var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大
// //创建相机对象
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// // onresize 事件会在窗口被调整大小时发生
// window.onresize=function(){
//   // 重置渲染器输出画布canvas尺寸
//   renderer.setSize(window.innerWidth,window.innerHeight);
//   // 重置相机投影的相关参数
//   k = window.innerWidth/window.innerHeight;//窗口宽高比
//   camera.left = -s*k;
//   camera.right = s*k;
//   camera.top = s;
//   camera.bottom = -s;
//   // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
//   // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
//   // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
//   camera.updateProjectionMatrix();
// };


/**
 * 透视投影相机设置
 * 
 *  PerspectiveCamera( fov, aspect, near, far )
 * 
 *  参数	              含义
    fov	              fov表示视场，所谓视场就是能够看到的角度范围，人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度
    aspect	          aspect表示渲染窗口的长宽比，如果一个网页上只有一个全屏的canvas画布且画布上只有一个窗口，那么aspect的值就是网页窗口客户区的宽高比
    near	            near属性表示的是从距离相机多远的位置开始渲染，一般情况会设置一个很小的值。
    far	              far属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小小，会有部分场景看不到
 * 
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
/**透视投影相机对象*/
var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

// onresize 事件会在窗口被调整大小时发生
window.onresize=function(){
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth,window.innerHeight);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth/window.innerHeight;
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
};


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
