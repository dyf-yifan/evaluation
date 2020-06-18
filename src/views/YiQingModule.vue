<!-- 疫情防控专题模板 -->
<template>
  <div class="container">
    <img
      class="module-img"
      :src="require('../assets/banner_plague.png')"
      alt="mkjn"
    />
    <div class="fenxiang-img">
      <a
        href="javascript:void(0)"
        onclick="document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'"
        ><img
          class="fenxiang"
          :src="require('../assets/fenxiang.png')"
          alt="lalal"
      /></a>
      <div id="light" class="white_content">
        <a
          href="javascript:void(0)"
          onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'"
          >
          <div class="close-img"><img class="close" :src="require('../assets/close.png')" alt=""
        /></div></a>
      </div>
      <div id="fade" class="black_overlay"></div>
    </div>

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
.close-img {
  display: flex;
  justify-content: flex-end;
}
.close {
  width: 20px;
  height: 20px;
}
.black_overlay {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.7;
  filter: alpha(opacity=88);
}
.white_content {
  display: none;
  position: absolute;
  width: 75%;
  height: 320px;
  left: 50%;
  right: 50%;
  top: 25%;
  margin-left: -120px;
  border: 1px solid rgb(218, 213, 213);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 1002;
  overflow: auto;
}
.fenxiang-img {
  display: flex;
  justify-content: flex-end;
  margin-top: -122px;
}
.fenxiang {
  width: 25px;
  height: 26px;
}
.content-top {
  margin-top: 95px;
}
.module-img {
  width: 100%;
  height: 120px;
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
  margin-top: 9px;
  width: 47%;
  height: 160px;
  border-radius: 1%;
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
  clip: rect(0px 150px 85px 0px);
}
.module-content {
  padding-left: 1%;
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
  height: 100%;
  font-size: 10px;
  color: rgb(184, 188, 190);
}
.module-btn {
  height: 80%;
  font-size: 1px;
  background-color: #fff;
  border: 1px solid rgb(140, 196, 253);
  color: rgb(140, 196, 253);
  border-radius: 3%;
}
</style>
