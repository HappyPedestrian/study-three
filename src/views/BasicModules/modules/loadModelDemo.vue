<!--
 * @Description: 加载3D模型
 * @Autor: Happy_Pedestrian
 * @Date: 2021-11-12 10:31:52
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-23 16:13:17
-->
<template>
  <div class="model">
    <div id="modelId" class="model-div"></div>
  </div>
</template>

<script>
import {
  initThree,
  initControl,
} from "../../../basicOptions/index";
import { VTKLoader } from "three/examples/jsm/loaders/VTKLoader";
export default {
  components: {},
  data() {
    return {
      scene: {},
      camera: {},
      renderer: {},
      controls: {},
    };
  },
  mounted() {
    this.threeStart();
  },
  methods: {
    threeStart() {
      this.scene = new this.$three.Scene();
      this.renderer = initThree("modelId");
      const {
        clientHeight: height,
        clientWidth: width,
      } = this.renderer.domElement;
      this.camera = new this.$three.PerspectiveCamera(
        60,
        width / height,
        0.01,
        900
      );
      this.camera.position.z = 0.2;
      // this.lignt = initDirectionalLight({
      //   color: 0xffffff,
      //   scene: this.scene,
      //   position: {
      //     x: 100,
      //     y: 100,
      //     z: 100,
      //   },
      // });
      // 给相机加光源，场景不加
      const dirLight = new this.$three.DirectionalLight( 0xffffff );
      dirLight.position.set( 200, 200, 2000 ).normalize();

      this.camera.add(dirLight);
      this.camera.add(dirLight.target);
      this.controls = initControl(this.camera, this.renderer.domElement, {
        rotateSpeed: 5,
        zoomSpeed: 5,
        panSpeed: 2,
        noZoom: false,
        noPan: false,
        staticMoving: false,
        dynamicDampingFactor: 0.3,
      });

      this.scene.add(this.camera);
      this.initObject();
    },
    initObject() {
      const material = new this.$three.MeshLambertMaterial({
        color: 0xFF7F50,
        side: this.$three.DoubleSide,
      });
      const loader = new VTKLoader();

      loader.load("./models/bunny.vtk", (geomerty) => {
        // 添加法向量
        geomerty.computeVertexNormals();
        const mesh = new this.$three.Mesh(geomerty, material);

        mesh.position.setY(-0.09);
        this.scene.add(mesh);
        this.animate();
      });
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.setClearColor(0xf3f3f3, 1);
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
.model {
  height: 300px;
  width: 300px;
  display: flex;
}

.model-div {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
</style>
