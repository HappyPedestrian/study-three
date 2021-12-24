<!--
 * @Description: uv坐标
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-22 11:31:36
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-23 08:59:23
-->
<template>
  <div class="line-container">
    <div class="line-item" ref="createTextureRef"></div>
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

      const {
        clientWidth: width,
        clientHeight: height,
      } = this.$refs.createTextureRef;

      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xfff0f0);
      this.$refs.createTextureRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const { clientWidth, clientHeight } = this.$refs.createTextureRef;
      this.camera = new THREE.PerspectiveCamera(
        80,
        clientWidth / clientHeight,
        0.1,
        20000
      );

      this.camera.position.set(0, 0, 1000);
      this.camera.up.set(0, 1, 0);
      this.camera.lookAt(this.scene.position);
    },
    initLight() {
      // const light = new THREE.PointLight(0xffffff, 1, 10000);

      const aLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(aLight);

      // light.position.set(1000, 1000, 1000);
      // this.scene.add(light);
    },
    initObject() {
      const plane = new THREE.PlaneGeometry(500, 500);
      // 设置uv图片倒过来（贴图）
      const uvs = new Float32Array([
        1, 0, // 模型第1点对应的材质坐标
        0, 0, // 模型第2点对应的材质坐标
        1, 1, // 模型第3点对应的材质坐标
        0, 1, // 模型第4点对应的材质坐标
      ]);
      plane.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      const textrueLoader = new THREE.TextureLoader();
      textrueLoader.load(require('./images/girl.jpeg'), (textrue) => {
        const material = new THREE.MeshPhongMaterial({
        // vertexColors: THREE.VertexColors,
        side: THREE.DoubleSide,
        map: textrue
      })

      const mesh = new THREE.Mesh(plane, material);
      this.scene.add(mesh);
      })
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
      requestAnimationFrame(this.beginRender);
    },
  },
};
</script>

<style lang="scss" scoped></style>
