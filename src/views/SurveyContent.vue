<template>
  <div>
    <div class="container mar">
      <i class="iconfont" @click="goBack()">&#xe609;</i>
      <div class="task-home">
        <div
          class="task mar-top"
          v-for="(type, index1) in questions"
          :key="index1"
        >
          <div class="task-if" v-if="type.status == 0">
            <div class="task-question">{{ type.question }}</div>
            <div
              class="task-content"
              v-for="(choice, index2) in type.list"
              :key="index2"
            >
              <input
                type="radio"
                :name="type.one_id"
                :value="choice.homeChoiceId"
                disabled="disabled"
              />{{ choice.content }}
            </div>
          </div>

          <div class="task-if" v-if="type.status == 1">
            <div class="task-question">{{ type.question }}</div>

            <div v-for="(choice, index2) in type.list" :key="index2">
              <input
                type="radio"
                :name="type.one_id"
                :value="choice.homeChoiceId"
                disabled="disabled"
              />{{ choice.content }}
            </div>
          </div>

          <div class="task-if" v-if="type.status == 2">
            <div class="task-question">{{ type.question }}</div>

            <div v-for="(choice, index2) in type.list" :key="index2">
              <input
                type="checkBox"
                :value="choice.homeChoiceId"
                disabled="disabled"
              />{{ choice.content }}
            </div>
          </div>
          <div class="task-if" v-if="type.status == 3">
            <div class="task-question">{{ type.question }}</div>
            <div v-for="(choice, index2) in type.list" :key="index2">
              <input
                type="radio"
                :name="type.one_id"
                :value="choice.homeChoiceId"
                disabled="disabled"
              />{{ choice.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <div class="fix">
        <van-button class="height-btnl" type="info" @click="toCreateModule(id)"
          >使用此模板创建</van-button
        >
        <van-button class="height-btn" plain type="info">查看更多</van-button>
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
      questions: [],
      question: [],
      index: 0,
      front: false,
      behind: true,
      code: false,
      codeId: []
    };
  },
  components: {},
  computed: {},
  created() {
    this.getListsContent();
  },
  mounted() {},
  methods: {
    goBack() {
      window.history.go(-1);
    },
    toCreateModule(id) {
      this.$router.push({
        path: "/yiqing-module/survey-content/create-module",
        query: { id: id }
      });
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
        for (let i = 0; i < this.question.length; i++) {
          let start = JSON.stringify(this.question[i].question);
          let newS = start.indexOf("：");
          let result = start.substring(newS + 1);
          result = result.substring(0, result.length - 1);
          result = i + 1 + "." + result;
          this.question[i].question = result;
        }
        this.questions = this.question;
        console.log(this.questions);
      });
    }
    // set() {
    //   alert(this.$route.params.id);
    // }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 85%;
}
.task-home {
  width: 100%;
}
.mar-top {
  margin-top: 20px;
}
.task {
  width: 100%;
}
.task-if {
  width: 100%;
}
input {
  width: 100%;
  margin-top: 5px;
  font-size: 15px;
}
.task-question {
  width: 100%;
  height: auto;
  font-size: 15px;
}
</style>
