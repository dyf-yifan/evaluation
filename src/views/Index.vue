<!-- index首页 -->
<template>
  <div>
    <h1>首页</h1>
    <router-link to="/covid">covid</router-link>
    <router-link to="/yiqing-module">yiqing-module</router-link>
    <router-link to="/type-content">type-content</router-link>
    <router-link to="/search">search</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang="scss" scoped></style>
