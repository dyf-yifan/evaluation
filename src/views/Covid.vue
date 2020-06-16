<!-- 新型冠状病毒防治统一考试 -->
<template>
  <div>
    <div class="home">
      <div class="home-img">
        <img
          src="https://photonj.photo.store.qq.com/psc?/V10LAMgn2hjZo4/DkqUZ9iBKRJfSLPQfqcDxxV6Hg572RP.Ckm3aWweB5ZU5Q71ivgdBzM59hUWZ3W07rX0OxoeiAgsC6tO7TgG0g!!/b&bo=OwHRAAAAAAADEN4!&rf=viewer_311&t=5"
          alt=""
          class="home-imgl"
        />
      </div>
      <div class="task-home mar" v-for="(item, index) in covid" :key="index">
        <div
          class="task-question"
          v-for="(type, index1) in item.typeList"
          :key="index1"
        >
          <div v-if="type.status == 1">
            {{ type.question }}
            <div
              class="task-content"
              v-for="(choice, index2) in type.choiceList"
              :key="index2"
            >
              <input
                type="radio"
                :name="type.homeTypeId"
                :value="choice.homeChoiceId"
              />{{ choice.content }}
            </div>
          </div>

          <div v-if="type.status == 2">
            {{ type.question }}
            <div
              class="task-content"
              v-for="(choice, index2) in type.choiceList"
              :key="index2"
            >
              <input type="checkBox" :value="choice.homeChoiceId" />{{
                choice.content
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="getCode()">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      covid: [],
      typeList: this.covid[0],
      choiceList: [],
      radio: "1",
      codeId: []
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
        this.typeList = this.covid.typeList;
      });
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
<style lang="scss" scoped>
input {
  outline: 0;
}
.task-question {
  margin-top: 10px;
  font-size: 16px;
}
.home-imgl {
  width: 100%;
  height: 150px;
}
.task-home {
  margin-top: 10px;
  height: auto;
  width: 90%;
}
.task-content {
  margin-top: 5px;
  width: 100%;
  height: auto;
  min-height: 32px;
  display: flex;
  align-items: center;
  border: 0.5px solid #e8e8e8;
  border-radius: 5px;
  font-size: 14px;
}
</style>
