<template>
  <div class="line">
    <div id="lineId" class="line-div"></div>
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
        linewidth: 5,
      });

      const pointsArray = new Array()
      pointsArray.push(new this.$three.Vector3(-100, 0, -100))
      pointsArray.push(new this.$three.Vector3(100, 0, 100))
      geometry.setFromPoints(pointsArray);
      // const positions = new Float32Array([-100, 0, -100, 100, 0, 100])
      // geometry.setAttribute(
      //   "position",
      //   new this.$three.BufferAttribute(positions, 3)
      // );
      let colors = new Float32Array([1, 0, 0, 0, 0, 1]);
      geometry.setAttribute(
        "color",
        new this.$three.BufferAttribute(colors, 3)
      );
      const line = new this.$three.LineSegments(geometry, material);
      this.scene.add(line);
    },

    threeStart() {
      this.scene = new this.$three.Scene();
      this.renderer = initThree("lineId");
      this.camera = initCamera({
        render: this.renderer,
        scene: this.scene,
        position: {
          x: 200,
          y: 300,
          z: 200,
        },
      });
      initDirectionalLight({ scene: this.scene });
      this.initObject();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
.line {
  height: 300px;
  width: 300px;
}
.line-div {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
</style>
