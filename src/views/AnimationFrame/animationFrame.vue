<!--
 * @Description: 帧动画
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-23 15:56:27
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-24 09:46:05
-->
<template>
  <div class="animation-frame-page" ref="animationFrameRef">
    <div class="slider">
      <el-slider
        v-model="time"
        show-input
        :max="duration">
      </el-slider>
    </div>
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
      time: 0,
      scene: null,
      renderer: null,
      control: null,
      group: null,
      mixer: null,
      clock: null,
      duration: 20,
      animationAction: null,
      clip: null,
    };
  },
  computed: {},
  watch: {
    time(value) {
      this.animationAction.time = value;
      this.clip.duration = this.animationAction.time;
      this.animationAction.play();
    }
  },
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
      const { clientWidth: width, clientHeight: height } = this.$refs.animationFrameRef;
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0X000000);
      this.$refs.animationFrameRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const { clientWidth: width, clientHeight: height } = this.$refs.animationFrameRef;
      this.camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 10000);
      this.camera.position.set(0, 500, 1000);
    },
    initLight() {
      // const light = new THREE.AmbientLight(0xFFFFFF, 1);
      const light = new THREE.PointLight(0xffffff, 1, 5000);
      light.position.set(200, 200, 200)
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
      planeMesh.position.set(0, -50, 0)
      planeMesh.rotation.x = -Math.PI / 2;
      this.scene.add(planeMesh);
      
      const boxGeometry = new THREE.BoxGeometry(50, 20, 20);
      const boxMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xb1b1b1
      })

      const group = new THREE.Group();

      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.name = "Box";
      group.add(box);

      const sphereGeometry = new THREE.SphereGeometry(20, 20, 20, 0, Math.PI * 2);
      const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x75ff68
      })

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.name = "Sphere";
      group.add(sphere);

      this.group = group;
      this.scene.add(group);

      // name 为Box的关键帧数据
      const values = [0, 0, 0, 150, 0, 0];

      // name 为Sphere的关键帧数据
      const scales = [1, 1, 1, 3, 3, 3];

      const posTrack = new THREE.KeyframeTrack("Box.position", [0, 10], values);
      const colorTrack = new THREE.KeyframeTrack("Box.material.color", [0, 20], [0, 1, 0, 1, 0, 0]);

      const scaleTrack = new THREE.KeyframeTrack("Sphere.scale", [0, 20], scales);


      const clip = new THREE.AnimationClip("default", this.duration, [posTrack, colorTrack, scaleTrack]);
      this.clip = clip;

      const mixer = new THREE.AnimationMixer(this.group);
      this.mixer = mixer;
      const animationAction = mixer.clipAction(clip);
      animationAction.timeScale = 10;
      // 只播放一次
      animationAction.loop = THREE.LoopOnce;
      // 停在结束时的那一帧
      animationAction.clampWhenFinished = true;
      this.animationAction = animationAction;

      this.clock = new THREE.Clock();
      animationAction.play()

    },
    beginAnimation() {

      this.control.update();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.beginAnimation)
      this.mixer.update(this.clock.getDelta());
    }
  },
};
</script>

<style lang="scss" scoped>
.animation-frame-page {
  width: 100vw;
  height: 100vh;
  .slider {
    height: 30px;
    width: 500px;
    padding: 10px;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%);
    background-color: #f3f3f3;
  }
}
</style>
