<template>
  <div class="conteiner">
    <div class="c-container mar">
      <div class="c-title">项目标题</div>
      <div class="c-huanl c-l">
        {{ this.listsContent.title }}
      </div>

      <div class="c-title">
        欢迎语
      </div>
      <div class="c-huanl c-l">
        <div class="c-huanll">
          亲爱的同学们，在延迟开学期间，请您花一点时间，填答以下有关网络课程的调查问卷。问卷采取匿名方式，请认真作答。“固居于室，得以静心，专注于学，突破提升”。希望你秉持学校和老师的教诲，在家长的悉心关怀下，合理规划居家学习与生活，讲安全、讲卫生、少出门、不聚集，科学防控病毒，静候春暖花开。
        </div>
      </div>

      <div class="c-title">题目</div>

      <div
        class="c-huanl c-ll"
        v-for="(item1, index1) in question"
        :key="index1"
      >
        <div class="d-right">
          <i class="iconfont" @click="show(index1)">&#xe61c;</i>
          <div class="xuan" v-show="showXuan == index1 && showXuan1">
            <div class="xuanl"><i class="iconfont">&#xe692;</i> 上移</div>
            <div class="xuanl"><i class="iconfont">&#xe619;</i> 下移</div>
            <div class="xuanl"><i class="iconfont">&#xe603;</i> 删除</div>
          </div>
        </div>
        <div v-if="item1.status == 1">
          <div class="c-questionl">
            {{ item1.question }}
          </div>
          <div class="c-hu" v-for="(item2, index2) in item1.list" :key="index2">
            <i class="iconfont">&#xe67f;</i>
            {{ item2.content }}
          </div>
        </div>
        <div v-if="item1.status == 2">
          <div class="c-questionl">
            {{ item1.question }}
          </div>
          <div class="c-hu" v-for="(item2, index2) in item1.list" :key="index2">
            <i class="iconfont">&#xe994;</i>
            {{ item2.content }}
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
      listsContent: [],
      id: this.$route.query.id,
      question: [],
      showXuan: "",
      showXuan1: false,
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getListsContent();
  },

  methods: {
    getListsContent() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/list/" + this.id,
        headers: {
          "Content-Type": "Access-Control-Allow-Origin",
        },
        params: {},
      }).then((res) => {
        this.listsContent = res.data.data;
        this.question = this.listsContent.oneList;
        console.log(this.listsContent);
      });
    },
    show(index) {
      this.showXuan = index;
      if (this.showXuan1) {
        this.showXuan1 = false;
      } else {
        this.showXuan1 = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.xuan {
  position: absolute;
  width: 90px;
  border-radius: 5%;
  border: 1px solid rgba(107, 96, 96, 0.19);
  background-color: #fff;
  z-index: 1001;
  margin-top: 25px;
}
.xuanl {
  width: 100%;
  height: 35px;
  font-size: 13px;
  border-bottom: 1px solid #e8e8e8;
  color: #363636;
  text-align: center;
}
.conteiner {
  width: 100%;
  height: 100%;
}
.c-container {
  width: 90%;
  height: 0 auto;
}
.c-title {
  margin-top: 5%;
  width: 100%;
  height: 30px;
  font-size: 14px;
  color: dimgrey;
}
.c-titlel {
  width: 100%;
  height: auto;
}
.c-huanll {
  width: 100%;
}
.c-hu {
  font-size: 13.5px;
  margin-top: 5px;
}
.d-right {
  display: flex;
  justify-content: flex-end;
}
</style>
