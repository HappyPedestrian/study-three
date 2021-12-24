<!--
 * @Description: 精灵模型，粒子系统
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-23 14:36:32
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-23 15:32:43
-->
<template>
  <div class="sprite-page" ref="spriteRef">
     
  </div>
</template>

<script>
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
export default {
  components: {
  },
  data() {
    return {
      scene: null,
      renderer: null,
      control: null,
      group: null,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.startThree()
  },
  methods: {
    startThree() {
      this.initThree();
      this.initCamera();
      this.initLight();
      this.initObject();
      this.initControl();
      this.beginAnimation();
    },
    initThree() {
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      const { clientWidth: width, clientHeight: height } = this.$refs.spriteRef;
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0X000000);
      this.$refs.spriteRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const { clientWidth: width, clientHeight: height } = this.$refs.spriteRef;
      this.camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 10000);
      this.camera.position.set(0, 500, 1000);
    },
    initLight() {
      const light = new THREE.AmbientLight(0xFFFFFF, 1);
      this.scene.add(light);
    },
    initControl() {
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
      const plane = new THREE.PlaneGeometry(1000, 1000);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xb88361,
        side: THREE.DoubleSide,
      })
      const planeMesh = new THREE.Mesh(plane, planeMaterial);
      planeMesh.rotation.x = -Math.PI / 2;
      this.scene.add(planeMesh);
      const TreeCount = 60;
      const RainCount = 200;
      const textureLoader = new THREE.TextureLoader();
      const treeTexture = textureLoader.load(require('./modules/images/tree.png'));
      const rainTexture = textureLoader.load(require('./modules/images/rain.png'));

      const treeMaterial = new THREE.SpriteMaterial({
        map: treeTexture,
      })

      const rainMaterial = new THREE.SpriteMaterial({
        map: rainTexture,
      })

      for(let i = 0; i < TreeCount; i++) {
        const treeSprite = new THREE.Sprite(treeMaterial);
        treeSprite.scale.set(100, 100, 1);
        const xR = Math.random() -0.5;
        const zR = Math.random() -0.5;

        treeSprite.position.set(1000 * xR, 50, 1000 * zR);
        this.scene.add(treeSprite);
      }
      const group = new THREE.Group();
      for(let j = 0; j < RainCount; j++) {
        const rainSprite = new THREE.Sprite(rainMaterial);
        rainSprite.scale.set(8, 10, 1);
        const xR = Math.random() -0.5;
        const yR = Math.random();
        const zR = Math.random() -0.5;
        rainSprite.position.set(xR * 1000, yR * 500, zR * 1000);

        group.add(rainSprite);
      }
      this.scene.add(group);
      this.group = group;
    },
    beginAnimation() {
      this.group.children.forEach(sprite => {
        sprite.position.y -= 1;
        if(sprite.position.y < 0) {
          sprite.position.y = 200;
        }
      })
      this.control.update();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.beginAnimation)
    }
  },
};
</script>

<style lang="scss" scoped>
.sprite-page {
  width: 100vw;
  height: 100vh;
}
</style>
