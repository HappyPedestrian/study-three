<!--
 * @Description: 
 * @Autor: Happy_Pedestrian
 * @Date: 2021-11-11 10:23:03
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-11-18 13:49:37
-->
<template>
  <div class="grid">
    <div id="gridId" class="grid-div"></div>
  </div>
</template>

<script>
import {
  initThree,
  initCamera,
  initDirectionalLight,
} from "@/basicOptions/index";
export default {
  data() {
    return {
      renderer: {},
      camera: {},
    };
  },
  mounted() {
    this.threeStart();
  },
  methods: {
    initObject() {
      const geometry = new this.$three.BufferGeometry();
      const material = new this.$three.LineBasicMaterial({
        vertexColors: this.$three.VertexColors,
      });

      // 线的材质可以由2点的颜色决定
      const p1 = new this.$three.Vector3(-400, 0, 0);
      const p2 = new this.$three.Vector3(400, 0, 0);
      geometry.setFromPoints([p1, p2]);

      const colors = new Float32Array( [
        1, 0, 0,
        0, 0, 1,
      ]);
      geometry.setAttribute('color', new this.$three.BufferAttribute(colors, 3))

      for (let i = -10; i <= 10; i++) {
        const line = new this.$three.Line(
          geometry,
          material,
        );
        line.position.z = i * 40;
        this.scene.add(line);

        const linev = new this.$three.Line(
          geometry,
          material,
        );
        linev.position.x = i * 40;
        linev.rotation.y = (90 * Math.PI) / 180;
        this.scene.add(linev);
      }
    },

    threeStart() {
      this.scene = new this.$three.Scene();
      this.renderer = initThree("gridId");
      this.camera = initCamera({render: this.renderer, scene: this.scene});
      initDirectionalLight({
        scene: this.scene,
      });
      this.initObject();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
.grid {
  height: 300px;
  width: 300px;
}
.grid-div {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
</style>
