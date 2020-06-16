<!-- index首页 -->
<template>
  <div class="d-swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <router-link to="/covid">
        <van-swipe-item>
          <img
            src="https://photonj.photo.store.qq.com/psc?/V10LAMgn2hjZo4/DkqUZ9iBKRJfSLPQfqcDxxV6Hg572RP.Ckm3aWweB5ZU5Q71ivgdBzM59hUWZ3W07rX0OxoeiAgsC6tO7TgG0g!!/b&bo=OwHRAAAAAAADEN4!&rf=viewer_311&t=5"
            class="swipe-img"
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
      <div class="content-card mar" v-for="(item, index) in lists" :key="index">
        <img
          class="img-card"
          @click="toListContent(item.list_id)"
          :src="item.img"
        />
        <div class="img-z white-color">
          <div class="title">{{ item.title }}</div>
          <div class="part">{{ item.participate }}人参与了</div>
        </div>
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
        url: "http://localhost:8080/api/list/home",
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
.img-card {
  width: 40%;
  height: 100%;
  border-radius: 1px;
  // position: absolute;
  // clip: rect(0px 0x 150px 0px);
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
  margin-top: -14px;
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
  margin-top: 10px;
  height: 150px;
  width: 95%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.img-z {
  width: 60%;
  height: 60%;
  margin-left: 3%;
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
