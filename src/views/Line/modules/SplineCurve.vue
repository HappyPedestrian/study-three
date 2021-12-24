<template>
  <div class="line-container">
    <div class="line-item" ref="splineRef"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
export default {
  components: {},
  data() {
    return {
      scene: {},
      camera: {},
      renderer: {},
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
      this.startRender();
    },
    initThree() {
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      const { clientWidth: width, clientHeight: height } = this.$refs.splineRef;

      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xf3f3f3);

      this.$refs.splineRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const { clientWidth: width, clientHeight: height } = this.$refs.splineRef;
      this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
      this.camera.position.set(0, 0, 2000);
      this.camera.up.set(0, 1, 0);
      this.camera.lookAt(this.scene.position);
    },
    initLight() {
      const light = new THREE.DirectionalLight(0xffffff, 1);

      light.position.set(0, 0, 1000);
      this.scene.add(light);
    },
    initObject() {
      const geometry = new THREE.BufferGeometry();
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(12, 35, 98),
        new THREE.Vector3(56, 75, 35),
        new THREE.Vector3(48, 766, 135),
        new THREE.Vector3(354, 153, 586),
        new THREE.Vector3(765, 1235, 135),
        new THREE.Vector3(135, 56, 768),

        // new THREE.Vector3(0, 0, 0),
        // new THREE.Vector3(25, 100, 0),
        // new THREE.Vector3(50, 0, 0),
        // new THREE.Vector3(75, 100, 0)
      ]);

      const points = curve.getPoints(100);
      geometry.setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 30
      });

      const line = new THREE.Line(geometry, material);
      this.scene.add(line);
    },
    startRender() {
      this.control.update();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.startRender);
    },
  },
};
</script>

<style lang="scss" scoped></style>
