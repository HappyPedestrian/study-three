<template>
  <div class="basic-modules">
    <div class="item">
      <h3>线</h3>
      <LineDemo />
    </div>
    <div class="item">
      <h3>测试</h3>
      <Test></Test>
    </div>
    <div class="item">
      <h3>网格</h3>
      <GridDemo></GridDemo>
    </div>
    <div class="item">
      <h3>动画</h3>
      <Animation></Animation>
    </div>
    <div class="item">
      <h3>光线</h3>
      <LightDemo></LightDemo>
    </div>
    <div class="item">
      <h3>纹理</h3>
      <Texture></Texture>
    </div>
    <div class="item">
      <h3>加载3D模型</h3>
      <LoadModelDemo></LoadModelDemo>
    </div>
    <div class="item">
      <h3>旋转模型</h3>
      <RotateBox></RotateBox>
    </div>
    <div class="item">
      <h3>多个几何体</h3>
      <MultiGeomertry></MultiGeomertry>
    </div>
  </div>
</template>

<script>
import LineDemo from "./modules/LineDemo.vue";
import GridDemo from "./modules/gridDemo.vue";
import Animation from "./modules/animation.vue";
import LightDemo from "./modules/lightDemo.vue";
import Texture from "./modules/textureDemo.vue";
import LoadModelDemo from "./modules/loadModelDemo.vue";
import RotateBox from "./modules/rotateBox.vue";
import MultiGeomertry from "./modules/multiGeometry.vue";
import Test from "./modules/test.vue";
export default {
  components: {
    LineDemo,
    GridDemo,
    Animation,
    LightDemo,
    Texture,
    LoadModelDemo,
    RotateBox,
    MultiGeomertry,
    Test,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.basic-modules {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  .item {
    margin: 10px;
    border: 3px solid rgb(255, 220, 181);
  }
}
</style>
