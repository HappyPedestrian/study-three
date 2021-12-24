<!--
 * @Description: 阵列，偏移、旋转
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-22 15:38:36
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-23 10:33:00
-->
<template>
  <div class="line-container">
    <div class="line-item" ref="moveRef"></div>
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
      } = this.$refs.moveRef;

      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xfff0f0);
      this.$refs.moveRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const { clientWidth, clientHeight } = this.$refs.moveRef;
      this.camera = new THREE.PerspectiveCamera(
        80,
        clientWidth / clientHeight,
        0.1,
        20000
      );

      this.camera.position.set(0, 0, 100);
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
      const textureLoader = new THREE.TextureLoader();
      const plane = new THREE.PlaneGeometry(200, 200);

      const planeTexture = textureLoader.load(require('./images/xiao-hai-bao.jpg'));
      const planeMaterial = new THREE.MeshPhongMaterial({
        map: planeTexture,
        bumpMap: planeTexture,
        bumpScale: 3,
        side: THREE.DoubleSide
      })

      const planeMesh = new THREE.Mesh(plane, planeMaterial);
      planeMesh.rotation.x = -Math.PI / 2
      this.scene.add(planeMesh)

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 20, 0),
        new THREE.Vector3(20, 30, 0),
        new THREE.Vector3(20, 50, 0),
        new THREE.Vector3(0, 60, 0),
        new THREE.Vector3(0, 80, 0),
        new THREE.Vector3(20, 90, 0),
      ]);

      const tube = new THREE.TubeGeometry(curve, 30, 3, 100, false);

      // const texture1 =  textureLoader.load(require('./images/star-sky.jpeg'));
      const texture1 = new THREE.CanvasTexture(this.getTextureCanvas());
      texture1.wrapS = THREE.RepeatWrapping;
      texture1.wrapT = THREE.RepeatWrapping;
      texture1.repeat.x = 15;

      texture1.wrapS = THREE.RepeatWrapping;
      texture1.wrapT = THREE.RepeatWrapping;
      texture1.repeat.x = 15;
      // texture1.center.set(0.5, 0.5)
      this.texture1 = texture1;
      const material1 = new THREE.MeshPhongMaterial({
        map: texture1,
        // normalMap: texture1,
        // normalScale: new THREE.Vector2(1.2, 1.2),
        bumpMap: texture1,
        bumpScale: 3,
        side: THREE.DoubleSide,
        transparent: true
      })


      const mesh = new THREE.Mesh(tube, material1);
      this.scene.add(mesh);
    },
    initOther() {
      // const axesHelper = new THREE.AxesHelper(1000);
      // this.scene.add(axesHelper);

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
      if(this.texture1) {
        this.texture1.offset.x -= 0.01;
        this.texture1.offset.y -= 0.001;
        // this.texture.rotation += Math.PI / 18000;
      }
      this.control.update();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.beginRender);
    },
    getTextureCanvas(imgs) {
      const canvas = document.createElement('canvas');
      const height = 500;
      const width = 1000;
      canvas.height = height;
      canvas.width = width;
      const ctx = canvas.getContext('2d');
      if(ctx) {
        const text = "赵诗秋是狗屎！";
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "orange";
        ctx.fillRect(0, 0, width, height);

        ctx.font = '100px bold'
        ctx.fillStyle = "#000000"
        ctx.fillText(text, 400, 100);
        ctx.fillText(text, 200, 300);
        ctx.fillText(text, 50, 450);

        return canvas;
      } else {
        alert("当前浏览器不支持canvas！");
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
