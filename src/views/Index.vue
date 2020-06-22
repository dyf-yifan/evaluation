<!-- index首页 -->
<template>
  <div class="d-swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <router-link to="/covid">
        <van-swipe-item>
          <img
            src="https://cdn1.wenjuan.com/5e342724a320fc092a7707e9_lib_thumbnail_1580486452.png"
            class="swipe-imgl"
          />
        </van-swipe-item>
      </router-link>
      <router-link to="/yiqing-module">
        <van-swipe-item>
          <img :src="require('../assets/img2.jpg')" class="swipe-img"
        /></van-swipe-item>
      </router-link>
    </van-swipe>
    <div class="content">
      <div class="content-top mar df-center">
        <div class="all df-centerl">- 全部 -</div>
        <router-link to="/search" class="a-style df-centerl">
          <i class="iconfont">&#xe617;</i>
          <span class="search-left">搜索</span>
        </router-link>
      </div>
    </div>
    <div
      class="content-card mar"
      @click="toListContent(item.list_id)"
      v-for="(item, index) in lists"
      :key="index"
      v-bind:style="{
        backgroundImage: 'url(' + item.img + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      }"
    >
      <div class="img-z white-color">
        <div class="title">{{ item.title }}</div>
        <div class="part">{{ item.participate }}人参与了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      lists: [],
      listId: null
    };
  },
  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getLists();
  },

  methods: {
    toListContent(listId) {
      this.$router.push({
        path: "/type-content",
        query: { id: listId }
      });
    },
    getLists() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/list/home",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {}
      }).then(res => {
        this.lists = res.data.data;
        this.listId = this.lists.list_id;
        console.log(this.lists);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.clip-img {
  height: 35%;
  position: absolute;
  clip: rect(0px 150px 85px 0px);
}
.img-card {
  width: 40%;
  height: 100%;
  border-radius: 1px;
}
.a-style {
  color: #828282;
  width: 30%;
  height: 57%;
  border: 1px solid #e8e8e8;
  font-size: 14px;
  border-radius: 20px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 140px;
  text-align: center;
  background-color: #39a9ed;
}
.swipe-img {
  width: 100%;
  height: 140px;
}
.content {
  width: 100%;
  border-radius: 5%;
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
.content-card {
  height: 125px;
  margin-top: 12px;
  width: 90%;
  border-radius: 2%;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.img-z {
  width: 100%;
  height: auto;
  margin-left: 4%;
  margin-bottom: 3%;
}
.part {
  width: 100%;
  height: 30%;
  font-size: 10px;
}
.title {
  width: 100%;
  height: 70%;
  font-size: 15px;
}
</style>
