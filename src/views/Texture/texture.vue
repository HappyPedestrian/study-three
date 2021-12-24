<!--
 * @Description: 纹理贴图
 * @Autor: Happy_Pedestrian
 * @Date: 2021-12-22 09:02:24
 * @LastEditors: Happy_Pedestrian
 * @LastEditTime: 2021-12-22 15:48:42
-->
<template>
  <div class="line-page">
     <div class="item">
      <h3>创建纹理贴图</h3>
      <CreateTextrue />
    </div>
    <div class="item">
      <h3>纹理坐标</h3>
      <UvVertex />
    </div>
    <div class="item">
      <h3>偏移，阵列</h3>
      <Move />
    </div>
  </div>
</template>

<script>
import CreateTextrue from './modules/CreateTextrue.vue';
import UvVertex from './modules/UvVertex.vue';
import Move from './modules/Move.vue';
export default {
  components: {
    CreateTextrue,
    UvVertex,
    Move
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
      height: 600px;
      width: 600px;
      .line-item {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
