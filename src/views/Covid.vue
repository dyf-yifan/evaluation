<!-- 新型冠状病毒防治统一考试 -->
<template>
  <div>
    <div>
      <div>
        <img
          src="https://photonj.photo.store.qq.com/psc?/V10LAMgn2hjZo4/DkqUZ9iBKRJfSLPQfqcDxxV6Hg572RP.Ckm3aWweB5ZU5Q71ivgdBzM59hUWZ3W07rX0OxoeiAgsC6tO7TgG0g!!/b&bo=OwHRAAAAAAADEN4!&rf=viewer_311&t=5"
          alt=""
        />
      </div>
      <div>
        <div v-for="(type, index1) in typeList" :key="index1">
          <div v-if="type.status == 1" v-show="index1 == index">
            {{ type.question }}

            <div v-for="(choice, index2) in type.choiceList" :key="index2">
              <input
                type="radio"
                :name="type.homeTypeId"
                :value="choice.homeChoiceId"
              />{{ choice.content }}
            </div>
          </div>

          <div v-if="type.status == 2" v-show="index1 == index">
            {{ type.question }}

            <div v-for="(choice, index2) in type.choiceList" :key="index2">
              <input type="checkBox" :value="choice.homeChoiceId" />{{
                choice.content
              }}
            </div>
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
      covid: [],
      typeList: [],
      choiceList: [],
      radio: "1",
      codeId: [],
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
        url: "http://localhost:8080/api/home/",
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
      if (this.index == this.typeList.length - 1) {
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
      this.axios
        .post("http://localhost:8080/api/homeChoice/result", this.codeId)
        .then(res => {
          alert(res.data.data);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
