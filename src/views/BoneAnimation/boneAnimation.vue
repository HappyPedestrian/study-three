<!--
 * @Description: 骨骼动画
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-24 11:12:01
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-24 16:06:48
-->
<template>
  <div class="animation-frame-page" ref="animationFrameRef">
    <div class="slider">
      <el-slider v-model="time" show-input> </el-slider>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
export default {
  components: {},
  data() {
    return {
      time: 0,
      scene: null,
      renderer: null,
      control: null,
      group: null,
      mixer: null,
      clock: null,
      skeleton: null,
      animation: {
        n: 0,
        t: 50,
      },
    };
  },
  computed: {},
  watch: {
    time(value) {},
  },
  mounted() {
    this.startThree();
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
      const {
        clientWidth: width,
        clientHeight: height,
      } = this.$refs.animationFrameRef;
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0x000000);
      this.$refs.animationFrameRef.appendChild(this.renderer.domElement);
    },
    initCamera() {
      const {
        clientWidth: width,
        clientHeight: height,
      } = this.$refs.animationFrameRef;
      this.camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.01,
        10000
      );
      this.camera.position.set(0, 500, 1000);
    },
    initLight() {
      // const light = new THREE.AmbientLight(0xffffff, 1);
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(2000, 2000, 2000);
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
      });
      const planeMesh = new THREE.Mesh(plane, planeMaterial);
      planeMesh.position.set(0, -50, 0);
      planeMesh.rotation.x = -Math.PI / 2;
      this.scene.add(planeMesh);

      const geometry = new THREE.CylinderGeometry(25, 25, 120, 50, 300);
      // const geometry = new THREE.BoxGeometry(50, 250, 50);
      geometry.translate(0, 60, 0);

      const position = geometry.attributes.position;
      const vertex = new THREE.Vector3();
      const skinIndices = [];
      const skinWeights = [];
      for (var i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i); //第i个顶点
        if (vertex.y <= 60) {
          // 设置每个顶点蒙皮索引属性  受根关节Bone1影响
          skinIndices.push(0, 0, 0, 0);
          // 设置每个顶点蒙皮权重属性
          // 影响该顶点关节Bone1对应权重是1-vertex.y/60
          // skinWeights.push(1 - vertex.y / 60, 0, 0, 0);
          skinWeights.push(1, 0, 0, 0);
        } else if (60 < vertex.y && vertex.y <= 60 + 40) {
          // Vector4(1, 0, 0, 0)表示对应顶点受关节Bone2影响
          skinIndices.push(1, 0, 0, 0);
          // 影响该顶点关节Bone2对应权重是1-(vertex.y-60)/40
          // skinWeights.push(1 - (vertex.y - 60) / 40, 0, 0, 0);
          skinWeights.push(1, 0, 0, 0);
        } else if (60 + 40 < vertex.y && vertex.y <= 60 + 40 + 20) {
          // Vector4(2, 0, 0, 0)表示对应顶点受关节Bone3影响
          skinIndices.push(2, 0, 0, 0);
          // 影响该顶点关节Bone3对应权重是1-(vertex.y-100)/20
          // skinWeights.push(1 - (vertex.y - 100) / 20, 0, 0, 0);
          skinWeights.push(1, 0, 0, 0);
        }
      }
      geometry.setAttribute(
        "skinIndex",
        new THREE.Uint16BufferAttribute(skinIndices, 4)
      );
      geometry.setAttribute(
        "skinWeight",
        new THREE.Float32BufferAttribute(skinWeights, 4)
      );
      const material = new THREE.MeshPhongMaterial({
        skinning: true,
        color: 0x999900,
        side: THREE.DoubleSide
      });

      const SkinnedMesh = new THREE.SkinnedMesh(geometry, material);
      SkinnedMesh.position.set(0, 10, 0);

      this.scene.add(SkinnedMesh);

      var Bone1 = new THREE.Bone(); //关节1，用来作为根关节
      var Bone2 = new THREE.Bone(); //关节2
      var Bone3 = new THREE.Bone(); //关节3
      // 设置关节父子关系   多个骨头关节构成一个树结构
      Bone1.add(Bone2);
      Bone2.add(Bone3);
      // 设置关节之间的相对位置
      //根关节Bone1默认位置是(0,0,0)
      Bone2.position.y = 60; //Bone2相对父对象Bone1位置
      Bone3.position.y = 40; //Bone3相对父对象Bone2位置

      // 所有Bone对象插入到Skeleton中，全部设置为.bones属性的元素
      var skeleton = new THREE.Skeleton([Bone1, Bone2, Bone3]); //创建骨骼系统
      // console.log(skeleton.bones);
      // 返回所有关节的世界坐标
      // skeleton.bones.forEach(elem => {
      //   console.log(elem.getWorldPosition(new THREE.Vector3()));
      // });
      //骨骼关联网格模型
      SkinnedMesh.add(Bone1); //根骨头关节添加到网格模型
      SkinnedMesh.bind(skeleton); //网格模型绑定到骨骼系统
      console.log(SkinnedMesh);
      this.skeleton = skeleton;
      /**
       * 骨骼辅助显示
       */
      var skeletonHelper = new THREE.SkeletonHelper(SkinnedMesh);
      this.scene.add(skeletonHelper);
    },
    beginAnimation() {
      const step = 0.01;
      this.control.update();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
      this.animation.n += 1;
      
      if (this.animation.n < this.animation.t) {
        // 改变骨关节角度
        this.skeleton.bones[0].rotation.x = this.skeleton.bones[0].rotation.x - step;
        this.skeleton.bones[1].rotation.x = this.skeleton.bones[1].rotation.x + step;
        this.skeleton.bones[2].rotation.x = this.skeleton.bones[2].rotation.x + 2 * step;
      }
      if (this.animation.n < 2 * this.animation.t && this.animation.n > this.animation.t) {
        this.skeleton.bones[0].rotation.x = this.skeleton.bones[0].rotation.x + step;
        this.skeleton.bones[1].rotation.x = this.skeleton.bones[1].rotation.x - step;
        this.skeleton.bones[2].rotation.x = this.skeleton.bones[2].rotation.x - 2 * step;
      }
      if (this.animation.n === 2 * this.animation.t) {
        this.animation.n = 0;
      }
      
      requestAnimationFrame(this.beginAnimation);
    },
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
