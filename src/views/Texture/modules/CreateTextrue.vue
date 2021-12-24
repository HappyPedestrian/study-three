<!--
 * @Description: 创建纹理贴图
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-22 09:03:50
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-22 11:25:48
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
      const sphere = new THREE.SphereGeometry(600, 60, 60);
      const sphere2 = new THREE.SphereGeometry(8000, 100, 100);
      const box = new THREE.BoxGeometry(500, 500, 500);
      // const materials = [
      //   new THREE.MeshPhongMaterial({
      //     color: 0xff0000,
      //     side: THREE.DoubleSide,
      //   }),
      //   new THREE.MeshPhongMaterial({
      //     color: 0x00ff00,
      //     side: THREE.DoubleSide,
      //   }),
      //   new THREE.MeshPhongMaterial({
      //     color: 0x0000ff,
      //     side: THREE.DoubleSide,
      //   }),
      //   new THREE.MeshPhongMaterial({
      //     color: 0xffffff,
      //     side: THREE.DoubleSide,
      //   }),
      //   new THREE.MeshPhongMaterial({
      //     color: 0x000000,
      //     side: THREE.DoubleSide,
      //   }),
      //   new THREE.MeshPhongMaterial({
      //     color: 0x888888,
      //     side: THREE.DoubleSide,
      //   }),
      // ];

      // const mesh = new THREE.Mesh(box, materials);
      // mesh.position.set(1000, 0, 0);
      // this.scene.add(mesh);

      const textrueLoader = new THREE.TextureLoader();
      textrueLoader.load(
        require("../modules/images/Jupiter.jpg"),
        (textrue) => {
          const material = new THREE.MeshPhongMaterial({
            map: textrue,
          });
          const mesh = new THREE.Mesh(sphere, material);
          this.scene.add(mesh);
        },
        null,
        (err) => {
          console.log("err:", err);
        }
      );
      textrueLoader.load(
        require("../modules/images/xiao-hai-bao.jpg"),
        (textrue) => {
          const material = new THREE.MeshPhongMaterial({
            map: textrue,
          });
          const mesh = new THREE.Mesh(box, material);
          mesh.position.set(1000, 0, 0);
          this.scene.add(mesh);
        },
        null,
        (err) => {
          console.log("err:", err);
        }
      );
      textrueLoader.load(
        require("../modules/images/home.jpeg"),
        (textrue) => {
          const material = new THREE.MeshPhongMaterial({
            map: textrue,
            side: THREE.DoubleSide,
          });

          const mesh = new THREE.Mesh(sphere2, material);
          this.scene.add(mesh);
        },
        null,
        (err) => {
          console.log("err:", err);
        }
      );
      // const texture = new THREE.Texture(GIRL);
      // const material = new THREE.MeshPhongMaterial({
      //   map: texture
      // })
      // const mesh = new THREE.Mesh(geometry, material);
      // this.scene.add(mesh);
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
