<!--  -->
<template>
  <div class="container">
    <input
      v-model="keywords"
      type="text"
      placeholder="搜索你最感兴趣的经典测评"
      class="search"
    />
    <img class="search-img" :src="require('../assets/sousuo.png')" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: "",
      searchList: [],
    };
  },

  components: {},

  computed: {},

  mounted() {},

  watch: {
    keywords: function() {
      this.serach();
    },
  },

  methods: {
    serach() {
      this.axios({
        method: "POST",
        url: "http://localhost:8080/api/list/home/keywords",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin",
        },
        params: {
          keywords: this.keywords,
        },
      }).then((res) => {
        this.searchList = res.data.data;
        console.log(this.searchList);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
}
::-webkit-input-placeholder {
  color: rgb(155, 163, 170);
}
.search {
  font-size: 10px;
  outline: none;
  width: 70%;
  height: 30px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 20px;
  border: 1px solid rgb(236, 236, 236);
  padding-left: 5%;
  color: rgb(155, 163, 170);
}
.search-img {
  border: 1px solid red;
}
</style>
