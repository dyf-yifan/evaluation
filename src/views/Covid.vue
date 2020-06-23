<!-- 新型冠状病毒防治统一考试 -->
<template>
  <div>
    <div>
      <div>
        <div v-for="(type, index1) in typeList" :key="index1">
          <div v-if="type.status == 1" v-show="index1 == index">
            {{ type.question }}

            <div v-for="(choice, index2) in type.choiceList" :key="index2">
              <input
                type="radio"
                :name="type.homeTypeId"
                :value="choice.homeChoiceId"
                @click="getCode(index1, choice.homeChoiceId)"
              />{{ choice.content }}
            </div>
          </div>

          <div v-if="type.status == 2" v-show="index1 == index">
            {{ type.question }}

            <div v-for="(choice, index2) in type.choiceList" :key="index2">
              <input
                type="checkBox"
                :name="type.homeTypeId"
                :value="choice.homeChoiceId"
                @click="getCode1(index1, choice.homeChoiceId)"
              />{{ choice.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="top()" v-show="front">上一页</button>
    <button @click="nest()" v-show="behind">下一页</button>
    <button @click="getResult()" v-show="code">提交</button>
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
      code: false
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getCovid();
  },

  methods: {
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
          alert(res.data.data);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
