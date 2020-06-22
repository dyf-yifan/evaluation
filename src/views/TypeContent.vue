<template>
  <div class="container mar">
    <div class="task-home">
      <div
        class="task mar-top"
        v-for="(type, index1) in questions"
        :key="index1"
      >
        <div class="task-if" v-if="type.status == 0" v-show="index1 == index">
          <div class="task-question">{{ type.question }}</div>
          <div
            class="task-content"
            v-for="(choice, index2) in type.list"
            :key="index2"
          >
            <input
              type="radio"
              :name="type.homeTypeId"
              :value="choice.homeChoiceId"
            />{{ choice.content }}
          </div>
        </div>

        <div class="task-if" v-if="type.status == 1" v-show="index1 == index">
          <div class="task-question">{{ type.question }}</div>

          <div v-for="(choice, index2) in type.list" :key="index2">
            <input
              type="radio"
              :name="type.homeTypeId"
              :value="choice.homeChoiceId"
            />{{ choice.content }}
          </div>
        </div>

        <div class="task-if" v-if="type.status == 2" v-show="index1 == index">
          <div class="task-question">{{ type.question }}</div>

          <div v-for="(choice, index2) in type.list" :key="index2">
            <input type="checkBox" :value="choice.homeChoiceId" />{{
              choice.content
            }}
          </div>
        </div>
        <div class="task-if" v-if="type.status == 3" v-show="index1 == index">
          <div class="task-question">{{ type.question }}</div>
          <div v-for="(choice, index2) in type.list" :key="index2">
            <input
              type="radio"
              :name="type.homeTypeId"
              :value="choice.homeChoiceId"
            />{{ choice.content }}
          </div>
        </div>
      </div>
    </div>
    <button @click="top()" v-show="front">上一页</button>
    <button @click="nest()" v-show="behind">下一页</button>
    <button @click="getCode()" v-show="code">提交</button>
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
      alert("成绩请到教务处查询");
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 95%;
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
  border: 1px solid red;
  font-size: 15px;
}
.task-question {
  width: 100%;
  font-size: 20px;
}
</style>
