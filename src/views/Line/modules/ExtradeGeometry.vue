<!--
 * @Description: 拉伸和扫描成型
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-21 17:23:33
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-21 17:47:25
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

      const aLight = new THREE.AmbientLight(0xffffff, 0.4)
      this.scene.add(aLight)

      light.position.set(1000, 1000, 1000);
      this.scene.add(light);
    },
    initObject() {
      const shape = new THREE.Shape();
      shape.moveTo(0, 100);
      shape.lineTo(-20, 20);
      shape.lineTo(-100, 0);
      shape.lineTo(-20, -20);
      shape.lineTo(0, -100);
      shape.lineTo(20, -20);
      shape.lineTo(100, 0);
      shape.lineTo(20, 20);
      shape.lineTo(0,100);

      const geometry = new THREE.ExtrudeGeometry(shape, {
        amount: 100,
        bevelEnabled: true,
      })
      const material = new THREE.MeshPhongMaterial({
        color: 0xfa2531
      })

      const material2 = new THREE.MeshPhongMaterial({
        color: 0x00fa15
      })
      
      const points = [
        new THREE.Vector3(200, 0, 100),
        new THREE.Vector3(0, -200, -200),
        new THREE.Vector3(0, 500, -700),
        new THREE.Vector3(300, 450, 250),
        new THREE.Vector3(600, 0, 0),
      ]
      const curve = new THREE.CatmullRomCurve3(points);

      const geometry2 = new THREE.ExtrudeGeometry(shape, {
        bevelEnabled: true,
        extrudePath: curve,
        steps: 10
      })

      const mesh = new THREE.Mesh(geometry, material);
      const mesh2 = new THREE.Mesh(geometry2, material2);
      this.scene.add(mesh);
      this.scene.add(mesh2);
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
