<!-- index首页 -->
<template>
  <div class="d-swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="swipe-img" />
      </van-swipe-item>
    </van-swipe>
    <div class="content">
      <div class="content-top mar df-center">
        <div class="all df-centerl">- 全部 -</div>
        <div class="search df-centerl">
          <i class="iconfont">&#xe617;</i>
          <span class="search-left">搜索</span>
        </div>
      </div>
      <div class="content-card mar">
        <van-image
          height="100"
          radius="9"
          src="https://source.unsplash.com/user/erondu/daily"
        />
        <div class="img-z white-color">
          <div class="part">
            1016人参与了
          </div>
          <div class="title">
            2020民法典知识全国统一考试
          </div>
        </div>
      </div>

      <div class="content-card mar">
        <van-image
          height="100"
          radius="9"
          src="https://source.unsplash.com/user/erondu/daily"
        />
        <div class="img-z white-color">
          <div class="part">
            1016人参与了
          </div>
          <div class="title">
            2020民法典知识全国统一考试
          </div>
        </div>
      </div>

      <div class="content-card mar">
        <van-image
          height="100"
          radius="9"
          src="https://source.unsplash.com/user/erondu/daily"
        />
        <div class="img-z white-color">
          <div class="part">
            1016人参与了
          </div>
          <div class="title">
            2020民法典知识全国统一考试
          </div>
        </div>
      </div>
    </div>
    <!-- <router-link to="/covid">covid</router-link>
    <router-link to="/yiqing-module">yiqing-module</router-link>
    <router-link to="/type-content">type-content</router-link>
     -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://p1.pstatp.com/large/pgc-image/4d7ab3a119b04958a86862e3342cd462",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQONQ2CGrbZ2Utu8pE0SCjrGvWYrgSHC4kT7EPikPMpQaYfeABI&usqp=CAU",
      ],
    };
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* project id 1445011 */
  src: url("//at.alicdn.com/t/font_1445011_qct0siq58b.eot");
  src: url("//at.alicdn.com/t/font_1445011_qct0siq58b.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1445011_qct0siq58b.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1445011_qct0siq58b.woff") format("woff"),
    url("//at.alicdn.com/t/font_1445011_qct0siq58b.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1445011_qct0siq58b.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.d-swipe {
  width: 100%;
  height: 100%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.swipe-img {
  width: 100%;
  height: 150px;
}
.content {
  position: absolute;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  margin-top: -10px;
  border-radius: 5%;
}
.df-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.df-centerl {
  display: flex;
  justify-content: center;
  align-items: center;
}
.mar {
  margin: 0 auto;
}
.content-top {
  width: 95%;
  height: 50px;
  color: #9c9c9c;
}
.all {
  width: 30%;
  height: 80%;
  font-size: 18px;
  color: #828282;
}
.search {
  width: 30%;
  height: 57%;
  border: 1px solid #e8e8e8;
  font-size: 16px;
  border-radius: 20px;
}
.search-left {
  margin-left: 5%;
}
.content-card {
  margin-top: 12px;
  height: 100px;
  width: 95%;
}
.img-z {
  width: 100%;
  height: 50px;
  margin-left: 3%;
  position: absolute;
  z-index: 1;
  margin-top: -46px;
}
.white-color {
  color: #fff;
}
.part {
  width: 100%;
  height: 30%;
  font-size: 10px;
}
.title {
  width: 100%;
  height: 70%;
  font-size: 13px;
}
</style>
