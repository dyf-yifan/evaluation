<!-- 新型冠状病毒防治统一考试 -->
<template>
  <div>
    <img :src="require('../assets/test.png')" class="test-img" />
    <div class="task-home mar">
      <div class="task">
        <div v-for="(type, index1) in typeList" :key="index1">
          <div v-if="type.status == 1" v-show="index1 == index">
            <div class="task-question">{{ type.question }}</div>
            <div
              class="task-answer"
              v-for="(choice, index2) in type.choiceList"
              :key="index2"
            >
              <input
                class="inputl"
                type="radio"
                :name="type.homeTypeId"
                :value="choice.homeChoiceId"
                @click="getCode(index1, choice.homeChoiceId)"
              />
              {{ choice.content }}
            </div>
          </div>

          <div v-if="type.status == 2" v-show="index1 == index">
            <div class="task-question">{{ type.question }}</div>
            <div
              class="task-answer"
              v-for="(choice, index2) in type.choiceList"
              :key="index2"
            >
              <input
                class="inputl"
                type="checkBox"
                :name="type.homeTypeId"
                :value="choice.homeChoiceId"
                @click="getCode1(index1, choice.homeChoiceId)"
              />{{ choice.content }}
            </div>
          </div>
        </div>
      </div>
      <div class="df-centerlll">
        <van-button
          type="info"
          plain
          class="c-btn"
          @click="top()"
          v-show="front"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      covid: [],
      typeList: [],
      choiceList: [],
      radio: "1",
      codeId: [[]],
      index: 0,
      front: false,
      behind: true,
      code: false,
      score: ""
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getCovid();
  },

  methods: {
    goBack() {
      window.history.go(-1);
    },
    getCovid() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/home/",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {}
      }).then(res => {
        this.covid = res.data.data;
        this.typeList = this.covid[0].typeList;
      });
    },
    nest() {
      if (Array.isArray(this.codeId[this.index])) {
        if (this.codeId[this.index].length != 0) {
          if (this.index == this.typeList.length - 2) {
            this.behind = false;
            this.code = true;
          }
          this.index++;
          this.front = true;
        } else {
          //弹框
          this.$toast({
            message: "选中答案才可以下一题",
            position: "middle"
          });
        }
      } else {
        if (this.codeId[this.index] != null) {
          if (this.index == this.typeList.length - 1) {
            this.behind = false;
            this.code = true;
          }
          this.index++;
          this.front = true;
        } else {
          //弹框
          this.$toast({
            message: "选中答案才可以下一题",
            position: "middle"
          });
        }
      }
    },
    top() {
      if (this.index == 1) {
        this.front = false;
      }
      this.index--;
      this.behind = true;
      this.code = false;
    },
    getCode(index, value) {
      this.codeId[index] = value;
    },
    getCode1(index, value) {
      if (Array.isArray(this.codeId[index])) {
        let arr = [];
        arr = this.codeId[index];
        if (arr.length > 0) {
          if (arr.indexOf(value) == -1) {
            arr.push(value);
            this.codeId[index] = arr;
          }
        }
      } else {
        let arr1 = [];
        arr1.push(value);
        this.codeId[index] = arr1;
      }
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
