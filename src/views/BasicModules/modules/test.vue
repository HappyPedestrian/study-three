<!--
 * @Description: 
 * @Autor: Happy_Pedestrian
 * @Date: 2021-11-12 17:31:20
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-11-12 17:37:44
-->
<template>
  <div class="test">
    <div id="testId" class="test-div"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
     /**
     * 创建场景对象Scene
     */
    var scene = new this.$three.Scene();
    /**
     * 创建网格模型
     */
    // var geometry = new this.$three.SphereGeometry(60, 40, 40); //创建一个球体几何对象
    var geometry = new this.$three.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var material = new this.$three.MeshLambertMaterial({
      color: 0x0000ff
    }); //材质对象Material
    var mesh = new this.$three.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    /**
     * 光源设置
     */
    //点光源
    var point = new this.$three.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new this.$three.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    // var width = window.innerWidth; //窗口宽度
    // var height = window.innerHeight; //窗口高度
    const el = document.getElementById("testId");
    const { clientHeight: height, clientWidth: width } = el;
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new this.$three.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new this.$three.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    el.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
  },
  methods: {},
};
</script>

<style scoped>
.test {
  height: 300px;
  width: 300px;
}
.test-div {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
</style>
