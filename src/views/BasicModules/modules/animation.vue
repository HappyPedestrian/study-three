<!--
 * @Description: 
 * @Autor: Happy_Pedestrian
 * @Date: 2021-11-11 11:07:56
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-11-18 13:50:12
-->
<template>
  <div class="grid2">
    <div id="gridId2" class="grid2-div"></div>
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
      const colors = new Float32Array( [
        1, 0, 0,
        0, 1, 0,
      ]);
      geometry.setFromPoints([p1, p2]);
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
      this.renderer = initThree("gridId2");
      this.camera = initCamera({render: this.renderer, scene: this.scene});
      initDirectionalLight({ scene: this.scene });
      this.initObject();
      this.animation();
    },
    animation() {
      this.renderer.clear();
      this.camera.rotation.z += (0.5 * Math.PI) / 180;
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animation);
    },
  },
};
</script>

<style scoped>
.grid2 {
  height: 300px;
  width: 300px;
}
.grid2-div {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
</style>
