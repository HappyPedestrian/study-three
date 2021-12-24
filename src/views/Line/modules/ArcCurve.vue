<template>
  <div class="line-container">
    <div class="line-item" ref="curveLineRef"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
export default {
  components: {},
  data() {
    return {
      scene: {},
      renderer: {},
      carmera: {},
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.startThree();
  },
  methods: {
    startThree() {
      this.scene = new THREE.Scene();

      this.initThree();
      this.initCarmera();

      this.control = new TrackballControls(this.carmera, this.renderer.domElement);
      Object.assign(this.control, {
        rotateSpeed: 5,
        zoomSpeed: 5,
        panSpeed: 2,
        noZoom: false,
        noPan: false,
        staticMoving: false,
        dynamicDampingFactor: 0.3,
      });
      
      const light = new THREE.DirectionalLight("#ffffff", 1);
      light.position.set(0, 0, 1000)
      this.scene.add(light);

      this.initObject();


      const axesHelper = new THREE.AxesHelper(500);
      this.scene.add(axesHelper);
      this.beginRender();
    },
    initThree() {
      const {
        clientWidth: width,
        clientHeight: height,
      } = this.$refs.curveLineRef;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      this.renderer.setSize(width, height);
      this.$refs.curveLineRef.appendChild(this.renderer.domElement);
      this.renderer.setClearColor("#f3f3f3");
    },
    initObject() {
      const geometry = new THREE.BufferGeometry();
      const arc = new THREE.ArcCurve(0, 0, 200, 0, 2 * Math.PI);
      geometry.setFromPoints(arc.getPoints(10));

      // const pointsArray = new Array()
      // pointsArray.push(new this.$three.Vector3(-100, 0, -100))
      // pointsArray.push(new this.$three.Vector3(100, 0, 100))
      // geometry.setFromPoints(pointsArray);

      let colors = new Float32Array([1, 0, 0, 0, 0, 1]);
      geometry.setAttribute("color", new this.$three.BufferAttribute(colors, 3))

      const material = new THREE.LineBasicMaterial({
        // color: "#ff0000",
        color: 0x323232,
        linewidth: 5
      });

      const line = new THREE.Line(geometry, material);

      this.scene.add(line);
    },
    initCarmera() {
      const {
        clientWidth: width,
        clientHeight: height,
      } = this.$refs.curveLineRef;
      const carmera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        10000
      );
      carmera.position.x = 0;
      carmera.position.y = 0;
      carmera.position.z = 1000;
      carmera.up.x = 0;
      carmera.up.y = 1;
      carmera.up.z = 0;

      carmera.lookAt(this.scene);
      this.carmera = carmera;
      // this.scene.add(carmera);
    },
    beginRender() {
      this.control.update();
      this.renderer.clear();
      this.renderer.render(this.scene, this.carmera);
      requestAnimationFrame(this.beginRender)
    },
  },
};
</script>

<style lang="scss" scoped>
.line-container {
  height: 400px;
  width: 400px;
  .line-item {
    height: 100%;
    width: 100%;
  }
}
</style>
