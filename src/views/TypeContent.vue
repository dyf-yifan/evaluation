<template>
  <div class="container mar">
    <div>
      <div
        class="task-home mar"
        v-for="(type, index1) in questions"
        :key="index1"
      >
        <div class="task-if" v-if="type.status == 0" v-show="index1 == index">
          <div class="task-question">{{ type.question }}</div>
          <div
            class="task-answer"
            v-for="(choice, index2) in type.list"
            :key="index2"
          >
            <input
              type="radio"
              class="inputl"
              :name="type.homeTypeId"
              :value="choice.homeChoiceId"
            />{{ choice.content }}
          </div>
        </div>

        <div class="task-if" v-if="type.status == 1" v-show="index1 == index">
          <div class="task-question">{{ type.question }}</div>

          <div
            class="task-answer"
            v-for="(choice, index2) in type.list"
            :key="index2"
          >
            <input
              type="radio"
              class="inputl"
              :name="type.homeTypeId"
              :value="choice.homeChoiceId"
            />{{ choice.content }}
          </div>
        </div>

        <div class="task-if" v-if="type.status == 2" v-show="index1 == index">
          <div class="task-question">{{ type.question }}</div>

          <div
            class="task-answer"
            v-for="(choice, index2) in type.list"
            :key="index2"
          >
            <input
              type="checkBox"
              class="inputl"
              :value="choice.homeChoiceId"
            />{{ choice.content }}
          </div>
        </div>
        <div class="task-if" v-if="type.status == 3" v-show="index1 == index">
          <div class="task-question">{{ type.question }}</div>
          <div
            class="task-answer"
            v-for="(choice, index2) in type.list"
            :key="index2"
          >
            <input
              type="radio"
              class="inputl"
              :name="type.homeTypeId"
              :value="choice.homeChoiceId"
            />{{ choice.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="df-centerlll">
      <van-button type="info" plain class="c-btn" @click="top()" v-show="front"
        >上一页</van-button
      >
      <van-button type="info" class="c-btn" @click="nest()" v-show="behind"
        >下一页</van-button
      >
      <van-button
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        type="info"
        class="c-btn"
        @click="getResult()"
        v-show="code"
        >提交</van-button
      >
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
    },
    set() {
      alert(this.$route.params.id);
    },
    nest() {
      if (this.index == this.questions.length - 2) {
        this.behind = false;
        this.code = true;
      }
      this.index++;
      this.front = true;
    },
    top() {
      if (this.index == 1) {
        this.front = false;
      }
      this.index--;
      this.behind = true;
      this.code = false;
    },
    getCode() {
      var oTxt = document.getElementsByTagName("input");
      var tem = 0;
      for (var i = 0; i < oTxt.length; i++) {
        if (oTxt[i].checked) {
          this.codeId[tem] = oTxt[i].value;
          tem++;
        }
      }
      this.getResult();
    },
    getResult() {
      let tem = [];
      for (let i = 0; i < this.codeId.length; i++) {
        let arr = this.codeId[i];
        if (Array.isArray(arr)) {
          for (let j = 0; i < arr.length; i++) {
            tem.push(arr[j]);
          }
        } else {
          tem.push(arr);
        }
      }
      this.axios
        .post("http://120.26.70.42:8080/api/homeChoice/result", tem)
        .then(res => {
          this.score = res.data.data;
          console.log(this.score);
          this.$router.push({
            path: "/type-content/commit",
            query: { score: this.score }
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
