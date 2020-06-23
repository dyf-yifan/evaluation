<!--  -->
<template>
  <div class="container">
    <div class="back blue-color sea">
      <i class="iconfont" @click="goBack()">&#xe609;返回</i>
    </div>
    <div class="search-top">
      <img class="search-img" :src="require('../assets/sousuo.png')" alt="" />
      <input
        v-model="keywords"
        type="text"
        placeholder="搜索你最感兴趣的经典测评"
        class="search mar"
      />
    </div>

    <div v-show="searchListShow" class="searchLenght mar">
      {{ searchListLenght }}个相关测评
    </div>

    <div
      class="search-content mar"
      v-for="(item, index) in searchList"
      :key="index"
    >
      <div class="search-title">{{ item.title }}</div>
      <div class="search-part">已有{{ item.participate }}人参与</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: "",
      searchList: [],
      searchListLenght: "",
      searchListShow: false,
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
    goBack() {
      window.history.go(-1);
    },
    serach() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/list/home/keywords",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin",
        },
        params: {
          keywords: this.keywords,
        },
      }).then((res) => {
        this.searchList = res.data.data;
        this.searchListLenght = this.searchList.length;
        this.searchListShow = true;
        console.log(this.searchListLenght);
        console.log(this.searchList);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.sea {
  display: flex;
}
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
  width: 75%;
  height: 30px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid rgb(236, 236, 236);
  padding-left: 5%;
  color: rgb(155, 163, 170);
}
.search-top {
  display: flex;
  margin-top: 10%;
  width: 100%;
}
.search-img {
  margin-left: 3%;
}
.search-content {
  width: 90%;
  padding-top: 15px;
  padding-bottom: 5px;
  padding-left: 1%;
  border-bottom: 1px solid rgb(236, 232, 232);
}
.searchLenght {
  margin-top: 20px;
  width: 90%;
  height: 23px;
  font-size: 13px;
  color: rgb(184, 188, 190);
  border-bottom: 1px solid rgb(235, 232, 232);
}
.search-title {
  font-size: 14px;
  color: rgb(110, 101, 101);
}
.search-part {
  font-size: 11px;
  color: rgb(184, 188, 190);
}
</style>
