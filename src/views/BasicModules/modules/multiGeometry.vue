<!--
 * @Description: 同时画多个几何体，使用平移
 * @Autor: Happy_Pedestrian
 * @Date: 2021-11-18 09:55:32
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-11-19 14:17:54
-->
<template>
  <div class="multi-geometry">
    <div class="geometry-contanier" ref="multiGeometryRef"></div>
  </div>
</template>

<script>
//@ts-nocheck
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
export default {
  components: {},
  data() {
    return {
      scene: {},
      camera: {},
      renderer: {},
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
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      const { clientWidth: width, clientHeight: height } = this.$refs.multiGeometryRef;
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0Xf3f3f3);
      this.renderer.shadowMap.enabled = true;
      this.$refs.multiGeometryRef.appendChild(this.renderer.domElement);

      this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      this.camera.position.set(200, 200, 300);
      this.camera.lookAt(this.scene.position);
      this.scene.add(this.camera);

      const directionalLight = new THREE.DirectionalLight(0XFFFFFF, 1);
      directionalLight.position.set(0, 150, 100);
      directionalLight.castShadow = true;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 600;
      directionalLight.shadow.camera.left = -250;
      directionalLight.shadow.camera.right = 250;
      directionalLight.shadow.camera.top = 200;
      directionalLight.shadow.camera.bottom = -200;
      this.scene.add(directionalLight);

      var helper = new THREE.CameraHelper( directionalLight.shadow.camera );
      this.scene.add( helper );

      //创建一个平面几何体作为投影面
      const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
      const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xf1f1f1
      });
      // 平面网格模型作为投影面
      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      this.scene.add(planeMesh); //网格模型添加到场景中
      planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
      planeMesh.position.y = -150; //设置网格模型y坐标
      // 设置接收阴影的投影面
      planeMesh.receiveShadow = true;

      // 平面网格模型作为投影面
      // const planeMesh2 = new THREE.Mesh(planeGeometry, planeMaterial);
      // this.scene.add(planeMesh2); //网格模型添加到场景中
      // // planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
      // planeMesh2.position.z = -100; //设置网格模型y坐标
      // // 设置接收阴影的投影面
      // planeMesh2.receiveShadow = true;


      this.initObject();
      this.initHelper();
      this.initControl();
      this.render();
    },
    initObject() {
      // 立方体
      const geometry1 = new THREE.BoxGeometry(150,150,150);
      const marterial1 = new THREE.MeshLambertMaterial({
        color: 0Xffff00,
        // opacity:0.7,
        // transparent:true
      })
      const mesh1 = new THREE.Mesh(geometry1, marterial1);
      mesh1.castShadow = true;

      this.scene.add(mesh1);

      // 球体
      const geometry2 = new THREE.SphereGeometry(50, 60, 60);
      const marterial2 = new THREE.MeshPhysicalMaterial({
        color: 0x2194ce,
        // specular:0x4488ee,
        // shininess:12
        // opacity:0.7,
        // transparent:true
      })
      const mesh2 = new THREE.Mesh(geometry2, marterial2);
      mesh2.translateY(150);
      mesh2.castShadow = true;

      this.scene.add(mesh2);

      // 20面体
      const geometry3 = new THREE.IcosahedronGeometry(50);
      const marterial3 = new THREE.MeshLambertMaterial({
        color: Math.random() * 0Xffffff,
        opacity:0.7,
        transparent:true
      })
      const mesh3 = new THREE.Mesh(geometry3, marterial3);
      mesh3.castShadow = true;
      mesh3.position.set(180, 0, 0);

      this.scene.add(mesh3);
    },
    initHelper() {
      const axesHelper = new THREE.AxesHelper(500);
      this.scene.add(axesHelper);
    },
    initControl() {
      this.control = new OrbitControls(this.camera, this.renderer.domElement);
      this.control.addEventListener("change", this.render);
    },
    render() {
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }
  },
};
</script>

<style scoped>
.multi-geometry {
  height: 500px;
  width: 500px;
}
.multi-geometry .geometry-contanier {
  height: 100%;
  width: 100%;
}
</style>
