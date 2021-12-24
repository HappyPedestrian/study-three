<!--
 * @Description: 管道成型
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-21 11:29:12
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-21 16:32:25
-->
<template>
  <div class="line-container">
    <div class="line-item" ref="tubeRef"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls"
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
export default {
  components: {},
  data() {
    return {
      scene: null,
      camera: null,
      light: null,
      renderer: null,
      firstPersonCtl: null,
      clock: null,
      control: null,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.startThree();
  },
  methods: {
    startThree(){
      this.initThree();
      this.initCamera();
      this.initLight();
      this.initHelper();
      this.initObject();
      this.startRender();
    },
    initThree(){
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      const { clientWidth: width, clientHeight: height } = this.$refs.tubeRef;
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0Xf1f1f1);
      this.$refs.tubeRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const { clientWidth: width, clientHeight: height } = this.$refs.tubeRef;
      this.camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10000);

      this.camera.position.set(500, 500, 500);
      this.camera.up.set(0, 1, 0);
      this.camera.lookAt(this.scene.position);
    },
    initLight() {
      this.scene.add(new THREE.AmbientLight(0xFFFFFF, 0.4))
      this.light = new THREE.DirectionalLight(0XFFFFFF, 1);

      this.light.position.set(0, 1000, 0);
      this.scene.add(this.light);
    },
    initHelper() {
      const axesHelper = new THREE.AxesHelper(1000);
      this.scene.add(axesHelper);

      const dirLightHelper = new THREE.DirectionalLightHelper(this.light, 1500, 0x0000ff);
      this.scene.add(dirLightHelper);

      // this.firstPersonCtl = new FirstPersonControls(this.camera, this.renderer.domElement);
      // Object.assign(this.firstPersonCtl, {
      //   autoForward: false,
      //   lookSpeed: 0.04,
      //   movementSpeed: 50,
      //   noFly: true,
      //   constrainVertical: false,
      //   // verticalMin: 1,
      //   // verticalMax: 2,
      //   lon: -150,
      //   lat: 120
      // })
      // this.clock = new THREE.Clock();

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
    initObject() {
      const material = new THREE.MeshLambertMaterial({
        color: 0xFFFF00
      });

      const line1 = new THREE.LineCurve3(new THREE.Vector3(0, 200, 0), new THREE.Vector3(0, 0, 0));

      // const arc = new THREE.ArcCurve(100, 0, 100, Math.PI, 2 * Math.PI);
      const middleLine = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(200, 0, 0))
      
      const line2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(200, 0, 0),
        new THREE.Vector3(200, 200, 0),
        new THREE.Vector3(200, 200, 200),
        new THREE.Vector3(200, 400, 200),
        new THREE.Vector3(200, 400, 0),
        new THREE.Vector3(0, 400, 0),
        new THREE.Vector3(0, 200, 0),
      ])

      const curvePath = new THREE.CurvePath();
      curvePath.curves.push(line1, middleLine, line2);

      const geometry = new THREE.TubeGeometry(curvePath, 100, 20, 100, false);

      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
    },
    startRender() {
      // if(this.firstPersonCtl.mouseDragOn) {
        // const delta = this.clock.getDelta();
        // this.firstPersonCtl.update(delta);
      // }
      this.control.update();
      
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.startRender);
    }
  },
};
</script>

<style lang="scss" scoped></style>
