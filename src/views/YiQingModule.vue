<!-- 疫情防控专题模板 -->
<template>
  <div>
    <!-- <h1>YiqingModule</h1>
    <router-link to="/yiqing-module/module-search">module-search</router-link>
    <router-link to="/yiqing-module/survey-content">survey-content</router-link>
    <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      module: []
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getModule();
  },

  methods: {
    getModule() {
      this.axios({
        method: "POST",
        url: "http://localhost:8080/api/list/special",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {}
      }).then(res => {
        this.module = res.data.data;
        console.log(this.module);
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
