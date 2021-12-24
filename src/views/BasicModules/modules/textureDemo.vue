<!--
 * @Description: 
 * @Autor: Happy_Pedestrian
 * @Date: 2021-11-11 15:33:18
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-10 15:45:11
-->
<template>
  <div class="texture">
    <div id="textureId" class="texture-div"></div>
    <div id="texture3DId" class="texture-div"></div>
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
      renderer: {},
      camera: {},
      scene: {},
      renderer3d: {},
      camera3d: {},
      scene3d: {},
      mesh3d: {},
    };
  },
  mounted() {
    this.threeStart();
  },
  methods: {
    initObject() {
      const geometry = new this.$three.PlaneGeometry(300, 300, 1, 1);

      const that = this;
      // 纹理坐标怎么弄
      const texture = new this.$three.TextureLoader();
      texture.load(
        require("../../../assets/flower.jpg"),
        (texture) => {
          const material = new that.$three.MeshBasicMaterial({ map: texture });
          const mesh = new that.$three.Mesh(geometry, material);
          that.scene.add(mesh);
          that.renderer.clear();
          that.renderer.render(that.scene, that.camera);
        },
        null,
        () => {
          console.log("加载失败");
        }
      );

      //
      // window.addEventListener( 'resize', this.onWindowResize, false );
    },
    // onWindowResize() {
    //   const el = document.getElementById('textureId');
    //   const { width, height } = el.getBoundingClientRect();
    //   this.camera.aspect = width / height;
    //   this.camera.updateProjectionMatrix();
    //   this.renderer.setSize( width, height );
    // },

    initObject3d() {
      const geometry = new this.$three.BoxGeometry(200, 200, 200);

      const canvas = this.getClockCanvas();
      // 纹理坐标怎么弄
      const texture = new this.$three.Texture(canvas);

      this.texture3d = texture;
      const material = new this.$three.MeshBasicMaterial({ map: texture });

      const mesh = new this.$three.Mesh(geometry, material);
      this.mesh3d = mesh;
      this.scene3d.add(mesh);

      //
      // window.addEventListener( 'resize', this.onWindowResize, false );
    },

    threeStart() {
      this.scene = new this.$three.Scene();
      this.renderer = initThree("textureId");
      this.camera = initCamera({
        render: this.renderer,
        scene: this.scene,
        position: { x: 0, y: 0, z: 400 },
      });
      initDirectionalLight({ scene: this.scene, color: 0xffffff });
      this.initObject();
      // this.renderer.clear();
      // this.renderer.render(this.scene, this.camera);

      this.scene3d = new this.$three.Scene();
      this.renderer3d = initThree("texture3DId");
      this.camera3d = initCamera({
        render: this.renderer3d,
        scene: this.scene,
        position: { x: 0, y: 400, z: 400 },
      });
      initDirectionalLight({ scene: this.scene3d, color: 0xffffff });
      this.initObject3d();
      this.renderer3d.clear();
      this.renderer3d.render(this.scene3d, this.camera3d);
      this.animate();
    },
    animate() {
      this.texture3d.needsUpdate = true;
      this.mesh3d.rotation.y -= 0.01;
      this.mesh3d.rotation.x -= 0.01;
      requestAnimationFrame(this.animate);
      this.renderer3d.render(this.scene3d, this.camera3d);
    },
    getClockCanvas() {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      function canvObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.borderWidth = 2;
        this.borderColor = "#000000";
        this.fill = false;
        this.fillStyle = "#ff0000";
        this.update = function() {
          if (!this.ctx) throw new Error("没有指定ctx对象");
          const ctx = this.ctx;
          ctx.save();
          ctx.lineWidth = this.borderWidth;
          ctx.strokeStyle = this.borderColor;
          ctx.fillStyle = this.fillColor;
          ctx.translate(this.x, this.y);
          if (this.rotation) {
            ctx.rotate((this.rotation * Math.PI) / 180);
          }
          if (this.draw) {
            this.draw(ctx);
          }
          if (this.fill) {
            ctx.fill();
          }
          ctx.stroke();
          ctx.restore();
        };
      }
      function Line() {}
      Line.prototype = new canvObject();
      Line.prototype.fill = false;
      Line.prototype.start = [0, 0];
      Line.prototype.end = [5, 5];
      Line.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.moveTo(...this.start);
        ctx.lineTo(...this.end);
        ctx.closePath();
      };

      function Circle() {}

      Circle.prototype = new canvObject();
      Circle.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath;
      };
      if (ctx) {
        const circle = new Circle();
        circle.ctx = ctx;
        circle.x = 100;
        circle.y = 100;
        circle.radius = 90;
        circle.fill = true;
        circle.borderWidth = 6;
        circle.fillColor = "#FFFFFF";

        const hour = new Line();
        hour.ctx = ctx;
        hour.x = 100;
        hour.y = 100;
        hour.borderColor = "#000000";
        hour.borderWidth = 10;
        hour.rotation = 0;
        hour.start = [0, 20];
        hour.end = [0, -50];

        const minute = new Line();
        minute.ctx = ctx;
        minute.x = 100;
        minute.y = 100;
        minute.borderColor = "#333333";
        minute.borderWidth = 7;
        minute.rotation = 0;
        minute.start = [0, 20];
        minute.end = [0, -80];

        const seconds = new Line();
        seconds.ctx = ctx;
        seconds.x = 100;
        seconds.y = 100;
        seconds.borderColor = "#ff0000";
        seconds.borderWidth = 4;
        seconds.rotation = 0;
        seconds.start = [0, 20];
        seconds.end = [0, -80];

        const center = new Circle();
        center.ctx = ctx;
        center.x = 100;
        center.y = 100;
        center.radius = 5;
        center.fill = true;
        center.borderColor = "orange";

        let ls = [];
        let scale = null;
        for (var i = 0; i < 12; i++) {
          scale = ls[i] = new Line();
          scale.ctx = ctx;
          scale.x = 100;
          scale.y = 100;
          scale.borderColor = "orange";
          scale.borderWidth = 2;
          scale.rotation = i * 30;
          scale.start = [0, -70];
          scale.end = [0, -80];
        }

        setInterval(function() {
          ctx.clearRect(0, 0, 200, 200);
          ctx.fillStyle = "orange";
          ctx.fillRect(0, 0, 200, 200);

          circle.update();
          for (let i = 0; i < ls.length; i++) {
            scale = ls[i];
            scale.update();
          }
          hour.rotation = new Date().getHours() * 30;
          hour.update();

          minute.rotation = new Date().getMinutes * 6;
          minute.update();

          seconds.rotation = new Date().getSeconds() * 6;
          seconds.update();

          center.update();
        }, 1000 / 60);
        return canvas;
      } else {
        alert("当前浏览器不支持canvas元素");
      }
    },
  },
};
</script>

<style scoped>
.texture {
  height: 300px;
  width: 600px;
  display: flex;
}
.texture-div {
  border: none;
  cursor: pointer;
  width: 50%;
  height: 100%;
  background-color: #eeeeee;
}
</style>
