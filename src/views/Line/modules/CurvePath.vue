<template>
  <div class="line-container">
    <div class="line-item" ref="curvePathRef"></div>
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
    initThree() {
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });

      const { clientWidth: width, clientHeight: height } = this.$refs.curvePathRef;

      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xFFf0f0);
      this.$refs.curvePathRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const { clientWidth, clientHeight } = this.$refs.curvePathRef;
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
      const curvePath = new THREE.CurvePath();
      const geometry = new THREE.BufferGeometry();

      const Radius = 200;
      const arc = new THREE.ArcCurve(0, 0, Radius, Math.PI, 0);

      const lineleft = new THREE.LineCurve3(new THREE.Vector3(-Radius, 500, 0), new THREE.Vector3(-Radius, 0, 0));

      const lineRight = new THREE.LineCurve3(new THREE.Vector3(Radius, 0, 0), new THREE.Vector3(Radius, 500, 0));

      curvePath.curves.push(lineleft, arc, lineRight);

      geometry.setFromPoints(curvePath.getPoints(100));

      const material = new THREE.LineBasicMaterial({
        color: 0xff0000,
      })

      const line = new THREE.Line(geometry, material);

      this.scene.add(line);
    },
    initOther(){
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
