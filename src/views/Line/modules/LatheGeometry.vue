<!--
 * @Description: 旋转成型
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-21 16:45:59
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-21 17:11:14
-->
<template>
  <div class="line-container">
    <div class="line-item" ref="latheRef"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
export default {
  components: {},
  data() {
    return {
      scene: {},
      renderer: {},
      camera: {},
      control: {},
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.startThree();
  },
  methods: {
    startThree() {
      this.initThree();
      this.initCamera();
      this.initLight();
      this.initObject();
      this.initOther();
      this.beginRender();
    },
    initThree(){
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });

      const { clientWidth: width, clientHeight: height } = this.$refs.latheRef;

      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xFFf0f0);
      this.$refs.latheRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const { clientWidth, clientHeight } = this.$refs.latheRef;
      this.camera = new THREE.PerspectiveCamera(80, clientWidth / clientHeight, 0.1, 10000);

      this.camera.position.set(0, 0, 1000);
      this.camera.up.set(0, 1, 0);
      this.camera.lookAt(this.scene.position);
    },
    initLight() {
      const light = new THREE.PointLight(0xffffff, 1, 10000);

      // const light = new THREE.DirectionalLight(0xffffff, 1)

      light.position.set(1000, 1000, 1000);
      this.scene.add(light);
    },
    initObject() {
      const points = [
        new THREE.Vector2(-100, -200, 0),
        new THREE.Vector2(-50, 0, 0),
        new THREE.Vector2(-100, 200, 0),
      ];

      const shape = new THREE.Shape();
      shape.splineThru(points);
      const splinePoints = shape.getPoints(60);

      const geometry = new THREE.LatheGeometry(splinePoints, 20);
      const material = new THREE.MeshPhongMaterial({
        color: 0x569876,
        side: THREE.DoubleSide
      })
      material.wireframe = true

      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
    },
    initOther() {
      const axesHelper = new THREE.AxesHelper(1000);
      this.scene.add(axesHelper);

      this.control = new TrackballControls(
        this.camera,
        this.renderer.domElement
      );
      Object.assign(this.control, {
        rotateSpeed: 5,
        zoomSpeed: 5,
        panSpeed: 2,
        noZoom: false,
        noPan: false,
        staticMoving: false,
        dynamicDampingFactor: 0.3,
      });
    },
    beginRender() {
      this.control.update();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.beginRender)
    }
  },
};
</script>

<style lang="scss" scoped></style>
