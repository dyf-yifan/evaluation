<template>
  <div class="conteiner">
    <div class="back blue-color">
      <i class="iconfont" @click="goBack()">&#xe609;</i>
    </div>
    <i class="iconfont" @click="goBack()">&#xe609;</i>
    <div class="c-container mar">
      <div class="c-title">题目</div>
      <div class="top">
        <div class="c-huanl c-ll">
          <div>
            <div class="c-questionl">
              {{ this.question[0].question }}
            </div>
            <div
              class="c-hul"
              v-for="(item, index) in this.question[this.id].list"
              :key="index"
            >
              {{ item.content }}
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
      listsContent: [],
      id: this.$route.query.id,
      question: [],
      showXuan: "",
      showXuan1: false
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getListsContent();
  },

  methods: {
    // 成功提示
    toSuccessTip() {
      this.$toast.success({
        message: "发布成功"
      });
    },

    goBack() {
      window.history.go(-1);
    },
    getListsContent() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/list/" + this.id,
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {}
      }).then(res => {
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
    under(index) {
      if (index + 1 === this.question.length) {
        //弹出框，提示不能在向下了
        this.$toast({
          message: "不能再往下了",
          position: "middle"
        });
      } else {
        let tem = this.question[index];
        this.question[index] = this.question[index + 1];
        this.question[index + 1] = tem;
        this.showXuan1 = false;
      }
    },
    top(index) {
      if (index === 0) {
        //弹出框，提示不能在向上了
      } else {
        let tem = this.question[index];
        this.question[index] = this.question[index - 1];
        this.question[index - 1] = tem;
        this.showXuan1 = false;
      }
    },
    remove(index) {
      this.question.splice(index, 1);
      this.showXuan1 = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.top {
  margin-bottom: 100px;
}
.fixl {
  border-bottom: 2px solid rgb(243, 241, 241);
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}

.fixedl {
  width: 100%;
  position: fixed;
}
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
.c-hul {
  font-size: 13.5px;
  margin-top: 5px;
  border-bottom: 1px solid rgb(212, 210, 210);
}
</style>
