<!--
 * @Description: 旋转几何体
 * @Autor: Happy_Pedestrian
 * @Date: 2021-11-17 09:28:46
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-11-18 11:23:30
-->
<template>
  <div class="rotate-box">
    <div id="rotateBoxId" class="box"></div>
  </div>
</template>

<script>
import {
  initThree,
  initCamera,
  initAmbientLight,
} from "@/basicOptions/index";
export default {
  components: {},
  data() {
    return {
      scene: {},
      carmera: {},
      renderer: {},
      mesh: {},
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.threeStart();
  },
  methods: {
    threeStart() {
      // 场景
      this.scene = new this.$three.Scene();

      // 渲染器
      this.renderer = initThree("rotateBoxId");

      // 相机
      this.carmera = initCamera({
        render: this.renderer,
        scene: this.scene,
        position: {
          x: 200,
          y: 200,
          z: 200,
        },
      });
      const light = initAmbientLight({ scene: this.scene });
      this.initObject();
      this.initGrid();
      this.animate();
    },
    initObject() {
      const geometry = new this.$three.BoxGeometry(100, 100, 100);
      let mars = [];
      mars.push(new this.$three.MeshBasicMaterial({
        color: 0Xff0000
      }), new this.$three.MeshBasicMaterial({
        color: 0X00ff00
      }),new this.$three.MeshBasicMaterial({
        color: 0Xff7f50
      }),new this.$three.MeshBasicMaterial({
        color: 0X0000ff
      }),new this.$three.MeshBasicMaterial({
        color: 0X010101
      }),new this.$three.MeshBasicMaterial({
        color: 0Xf1f1f1
      }))

      const mesh = new this.$three.Mesh(geometry, mars);
      this.mesh = mesh;

      this.scene.add(mesh);
    },
    initGrid() {
      const helper = new this.$three.GridHelper(1000, 50, 0Xff0000, 0X8fa4f4);
      this.scene.add(helper);
    },
    animate() {
      this.mesh.rotation.y += 0.01;
      this.renderer.clear();
      this.renderer.render(this.scene, this.carmera);
      requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style scoped>
.rotate-box {
  height: 600px;
  width: 600px;
}

.rotate-box .box {
  border: none;
  cursor: pointer;
  height: 100%;
  width: 100%;
  background-color: #eeeeee;
}
</style>
