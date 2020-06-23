<template>
  <div>
    <div class="s-container mar">
      <div>
        <div v-for="(type, index1) in questions" :key="index1">
          <div class="s-card" v-if="type.status == 0">
            <div class="s-question">{{ type.question }}</div>
            <van-swipe-cell
              :before-close="beforeClose"
              v-for="(choice, index2) in type.list"
              :key="index2"
            >
              <van-cell
                class="s-content"
                :border="false"
                :value="choice.content"
                @click="
                  function tests() {
                    start = index1;
                    end = index2;
                  }
                "
                :id="index2"
              />
              <template #right>
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>
          </div>

          <div class="s-card" v-if="type.status == 1">
            <div>{{ type.question }}</div>

            <van-swipe-cell
              :before-close="beforeClose"
              v-for="(choice, index2) in type.list"
              :key="index2"
            >
              <van-cell
                class="s-content"
                :border="false"
                :value="choice.content"
                @click="
                  function tests() {
                    start = index1;
                    end = index2;
                  }
                "
                :id="index2"
              />
              <template #right>
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>
          </div>

          <div class="s-card" v-if="type.status == 2">
            <div>{{ type.question }}</div>

            <van-swipe-cell
              class="s-content"
              :before-close="beforeClose"
              v-for="(choice, index2) in type.list"
              :key="index2"
            >
              <van-cell
                :border="false"
                :value="choice.content"
                @click="
                  function tests() {
                    start = index1;
                    end = index2;
                  }
                "
                :id="index2"
              />
              <template #right>
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>
          </div>
          <div class="s-card" v-if="type.status == 3">
            <div>{{ type.question }}</div>
            <van-swipe-cell
              :before-close="beforeClose"
              v-for="(choice, index2) in type.list"
              :key="index2"
            >
              <van-cell
                class="s-content"
                :border="false"
                :value="choice.content"
                @click="
                  function tests() {
                    start = index1;
                    end = index2;
                  }
                "
                :id="index2"
              />
              <template #right>
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <div class="fix">
        <van-button class="height-btnl" type="info" @click="toCreateModule(id)"
          >使用此模板创建</van-button
        >
        <van-button class="height-btn" plain type="info" to="/my-project"
          >查看更多</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
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
      codeId: [],
      start: "",
      end: 0
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
      });
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            this.questions[this.start].list.splice(this.end, 1);
            instance.close();
          });
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.s-container {
  width: 93%;
  height: 100%;
  margin-top: 6%;
}
.s-question {
  font-size: 14px;
  color: #5c5858;
}
.s-content {
  font-size: 13px;
  height: auto;
  color: #a1998e;
}
.s-card {
  border: 1px solid rgb(236, 229, 229);
  margin-top: 3%;
  padding-top: 1%;
  padding-left: 2%;
}
</style>
