<!-- 疫情防控专题模板 -->
<template>
  <div class="container">
    <img
      class="module-img"
      :src="require('../assets/banner_plague.png')"
      alt="mkjn"
    />
    <div class="content-top mar df-center">
      <div class="all df-centerl">- 全部 -</div>
      <router-link to="/yiqing-module/module-search" class="a-style df-centerl">
        <i class="iconfont">&#xe617;</i>
        <span class="search-left">搜索</span>
      </router-link>
    </div>
    <div class="df">
      <div class="module-card mar" v-for="(item, index) in module" :key="index">
        <div class="module-bc">
          <img :src="item.img" alt="" class="clip-img" />
        </div>
        <div class="module-content">
          <div class="module-title mar d-one">{{ item.title }}</div>
          <div class="module-bot">
            <div class="module-part d-one">被引用{{ item.participate }}次</div>
            <div class="df-centerll">
              <button class="module-btn ">
                免费使用
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      module: [],
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
          "Content-Type": "Access-Control-Allow-Origin",
        },
        params: {},
      }).then((res) => {
        this.module = res.data.data;
        console.log(this.module);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.module-img {
  width: 100%;
  height: 128px;
}
.a-style {
  color: #828282;
  width: 30%;
  height: 57%;
  border: 1px solid #e8e8e8;
  font-size: 14px;
  border-radius: 20px;
}
.df {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
}
.module-card {
  margin-top: 16px;
  width: 45%;
  height: 160px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.module-bc {
  width: 100%;
  height: 60%;
}
.clip-img {
  width: 100%;
  height: 100%;
  position: absolute;
  clip: rect(0px 144px 85px 0px);
}
.module-content {
  padding-left: 1%;
  // padding-right: 5%;
  width: 100%;
  height: 40%;
}
.module-title {
  width: 95%;
  height: 50%;
  font-size: 13px;
}
.module-bot {
  width: 100%;
  height: 40%;
  display: flex;
  align-items: center;
  padding-top: 2%;
  padding-bottom: 2%;
}
.module-part {
  // width: 59%;
  height: 100%;
  font-size: 10px;
  color: rgb(184, 188, 190);
  // padding-right: 2px;
}
.module-btn {
  // width: 41%;
  height: 80%;
  font-size: 1px;
  background-color: #fff;
  border: 1px solid rgb(140, 196, 253);
  color: rgb(140, 196, 253);
  border-radius: 3%;
}
</style>
