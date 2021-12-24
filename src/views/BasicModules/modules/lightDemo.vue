<!--
 * @Description: 
 * @Autor: Happy_Pedestrian
 * @Date: 2021-11-11 14:12:20
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-11-12 21:20:38
-->
<template>
  <div class="light">
    <input type="text" v-model="lightColor" style="width: 70px"><button @click="reRender">更改光线颜色</button>
    <div id="lightId" class="light-div"></div>
  </div>
</template>

<script>
import {
  initThree,
  initCamera,
  initDirectionalLight,
} from "@/basicOptions/index";
export default {
  data() {
    return {
      lightColor: 'FFFFFF',
      renderer: {},
      camera: {},
      light: {},
    };
  },
  mounted() {
    this.threeStart();

    // const scene = new this.$three.Scene();

    // const geomertry = new this.$three.BoxGeometry(150, 150, 150);

    // const marterial = new this.$three.MeshBasicMaterial({
    //   color: 0Xff0000
    // });

    // const mesh = new this.$three.Mesh(geomertry, marterial);

    // scene.add(mesh);

    // const light = new this.$three.DirectionalLight(0X444444);

    // scene.add(light);

    // const el = document.getElementById("lightId");
    // const { clientHeight: height, clientWidth: width } = el;

    // const camera = new this.$three.PerspectiveCamera(45, width / height, 1, 1000);

    // camera.position.set(200, 300, 200);
    // camera.lookAt(scene.position);

    // const render = new this.$three.WebGLRenderer();
    // render.setSize(width, height)
    // render.setClearColor(0Xb9d3ff, 1);
    // el.appendChild(render.domElement);
    // render.render(scene, camera);
  },
  methods: {
    initObject() {
      const geometry = new this.$three.BoxGeometry( 200, 100, 50,4,4);
      const material = new this.$three.MeshLambertMaterial( { color:0xFFFFFF} );
      const mesh = new this.$three.Mesh( geometry,material);
      mesh.position.set(0,0,0);
      this.scene.add(mesh);

      const geometry2 = new this.$three.BoxGeometry( 200, 100, 50,4,4);
      const material2 = new this.$three.MeshLambertMaterial( { color:0xFFFFFF} );
      const mesh2 = new this.$three.Mesh( geometry2,material2);
      mesh2.position.set(-300,0,0);
      this.scene.add(mesh2);

      const geometry3 = new this.$three.BoxGeometry( 200, 100, 50,4,4);
      const material3 = new this.$three.MeshLambertMaterial( { color:0xFFFFFF} );
      const mesh3 = new this.$three.Mesh( geometry3,material3);
      mesh3.position.set(0,-150,0);
      this.scene.add(mesh3);

      const mesh4 = new this.$three.Mesh( geometry3,material3);
      mesh4.position.set(0,150,0);
      this.scene.add(mesh4);

      const mesh5 = new this.$three.Mesh( geometry3,material3);
      mesh5.position.set(300,0,0);
      this.scene.add(mesh5);

      const mesh6 = new this.$three.Mesh( geometry3,material3);
      mesh6.position.set(0,0,-100);
      this.scene.add(mesh6);
    },

    threeStart() {
      this.scene = new this.$three.Scene();
      this.renderer = initThree("lightId");
      this.camera = initCamera({render: this.renderer, scene: this.scene,  position: {x: 600, y: 0, z: 600}, up: {x: 0, y: 1, z: 0}});
      this.light = initDirectionalLight({
        scene: this.scene,
        color: `#${this.lightColor}`
      });
      this.initObject();
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    },
    reRender() {
      // initDirectionalLight({
      //   scene: this.scene,
      //   color: `0X${this.lightColor}`
      // });
      this.light.color.setHex(`0X${this.lightColor}`)
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }
  },
};
</script>

<style scoped>
.light {
  height: 300px;
  width: 300px;
}
.light-div {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
</style>
