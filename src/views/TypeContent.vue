<!--  -->
<template>
  <div>
    <div class="task" v-for="(item, index) in questions" :key="index">
      <div class="task-question">{{ item.question }}</div>
      <div class="task-answer">{{ item.content }}</div>
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
      question: []
    };
  },
  components: {},
  computed: {},
  created() {
    this.getListsContent();
  },
  mounted() {},
  methods: {
    getListsContent() {
      this.axios({
        method: "POST",
        url: "http://localhost:8080/api/list/" + this.id,
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {}
      }).then(res => {
        this.listsContent = res.data.data;
        this.question = this.listsContent.oneList;
        for (let i = 0; i < this.question.length; i++) {
          let start = JSON.stringify(this.question[i].question);
          // let content = JSON.stringify(this.question[i].content);
          // for (let j = 0; j < this.question.length; j++) {
          //   let str = "A";
          //   content =
          //     document.writeln(String.fromCharCode(str.charCodeAt() + j)) +
          //     JSON.stringify(this.question[i].content);
          //   this.question[j].content = content;
          // }
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
    }
  }
};
</script>
<style lang="scss" scoped>
.task {
  width: 90%;
  height: auto;
}
.task-question {
  width: 100%;
  height: auto;
  border: 1px solid red;
}
.task-answer {
  width: 100%;
  height: 100px;
}
</style>
