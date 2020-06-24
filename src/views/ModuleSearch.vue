<template>
  <div class="container">
    <div class="search-top">
      <!-- <img class="search-img" :src="require('../assets/sousuo.png')" alt="" /> -->
      <input
        v-model="keywords"
        type="text"
        placeholder="搜索你最感兴趣的模板"
        class="search mar"
      />
    </div>

    <div v-show="searchListShow" class="searchLenght mar">
      {{ searchListLenght }}个相关模板
    </div>

    <div
      class="search-content mar"
      v-for="(item, index) in moduleSearchList"
      :key="index"
    >
      <div class="search-title">{{ item.title }}</div>
      <div class="search-part">
        共{{ item.oneList.length }}题 | 已有{{ item.participate }}人参与
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: "",
      moduleSearchList: [],
      searchListLenght: "",
      searchListShow: false,
      oneListLength: "",
      oneList: []
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.moduleSerach();
  },

  watch: {
    keywords: function() {
      this.moduleSerach();
    }
  },

  methods: {
    goBack() {
      window.history.go(-1);
    },
    moduleSerach() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/list/special/keywords",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {
          keywords: this.keywords
        }
      }).then(res => {
        this.moduleSearchList = res.data.data;
        this.searchListLenght = this.moduleSearchList.length;
        this.searchListShow = true;
        console.log(this.searchListLenght);
        console.log(this.moduleSearchList);
      });
    }
  }
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
  font-size: 14px;
  outline: none;
  width: 75%;
  height: 35px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid rgb(211, 204, 204);
  padding-left: 5%;
  color: rgb(131, 137, 141);
}
.search-top {
  display: flex;
  margin-top: 5%;
  width: 100%;
}
.search-img {
  margin-left: 3%;
}
.search-content {
  width: 90%;
  padding-top: 3%;
  padding-bottom: 5px;
  padding-left: 1%;
  border-bottom: 1px solid rgb(236, 232, 232);
}
.searchLenght {
  margin-top: 20px;
  width: 90%;
  height: 23px;
  font-size: 14px;
  color: rgb(184, 188, 190);
  border-bottom: 1px solid rgb(235, 232, 232);
}
.search-title {
  font-size: 15px;
  color: rgb(110, 101, 101);
}
.search-part {
  font-size: 12px;
  color: rgb(184, 188, 190);
}
</style>
