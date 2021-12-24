<template>
  <div class="line-page">
     <div class="item">
      <h3>arcCurve线</h3>
      <ArcCurve />
    </div>
    <div class="item">
      <h3>样板线</h3>
      <SplineCurve />
    </div>
    <div class="item">
      <h3>组合曲线</h3>
      <CurvePath />
    </div>
    <div class="item">
      <h3>管道成型</h3>
      <TubeGeometry />
    </div>
    <div class="item">
      <h3>旋转成型</h3>
      <LatheGeometry />
    </div>
    <div class="item">
      <h3>拉伸或扫描成型</h3>
      <ExtradeGeometry />
    </div>
  </div>
</template>

<script>
import ArcCurve from './modules/ArcCurve.vue'
import SplineCurve from './modules/SplineCurve.vue'
import CurvePath from './modules/CurvePath.vue';
import TubeGeometry from './modules/TubeGeometry.vue'
import LatheGeometry from './modules/LatheGeometry.vue'
import ExtradeGeometry from './modules/ExtradeGeometry.vue'
export default {
  components: {
    ArcCurve,
    SplineCurve,
    CurvePath,
    TubeGeometry,
    LatheGeometry,
    ExtradeGeometry,
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
.line-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  .item {
    margin: 10px;
    border: 3px solid rgb(255, 220, 181);
    ::v-deep.line-container {
      height: 400px;
      width: 400px;
      .line-item {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
