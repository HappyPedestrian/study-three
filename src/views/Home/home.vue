<template>
  <div class="home-page">
    <div
      class="menu"
      v-for="route in routeList"
      :key="route.path"
      @click="$router.push(route.path)"
    >
      {{ route.meta && route.meta.label }}
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    routeList() {
      let routelist = [];
      this.$router.options.routes.forEach((route) => {
        route.meta && route.meta.isMenu && routelist.push(route);
      });
      return routelist;
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f3f3f3 url("../../assets/images/home_bg.jpeg") center center /
    cover no-repeat;
  .menu {
    height: 40px;
    min-width: 120px;
    display: inline-block;
    margin: 10px;
    background-color: aquamarine;
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
    border: 3px solid #979797;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.7;
  }
}
</style>
