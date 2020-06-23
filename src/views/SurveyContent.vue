<template>
  <div>
    <div class="container mar">
      <div class="task-home">
        <div
          class="task mar-top"
          v-for="(type, index1) in questions"
          :key="index1"
        >
          <div class="task-if" v-if="type.status == 0">
            <div class="task-question">{{ type.question }}</div>
            <!-- <div
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
            </div> -->
            <van-swipe-cell
              :before-close="beforeClose"
              v-for="(choice, index2) in type.list"
              :key="index2"
            >
              <van-cell
                :border="false"
                :value="choice.content"
                @click="
                  function tests() {
                    this.start = index1;
                    this.end = index2;
                  }
                "
                :id="index2"
              />
              <template #right>
                <van-button square type="danger" text="删除" />
              </template>
            </van-swipe-cell>
          </div>

          <div class="task-if" v-if="type.status == 1">
            <div class="task-question">{{ type.question }}</div>

            <van-swipe-cell
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

          <div class="task-if" v-if="type.status == 2">
            <div class="task-question">{{ type.question }}</div>

            <van-swipe-cell
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
          <div class="task-if" v-if="type.status == 3">
            <div class="task-question">{{ type.question }}</div>
            <van-swipe-cell
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
                :name="index1"
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
        <van-button class="height-btn" plain type="info">查看更多</van-button>
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
      start: 0,
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
            this.questions[this.start].list.splice(this.end - 1, 1);
            instance.close();
          });
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.height-btnl {
  height: 36px;
  width: 55%;
  border-radius: 5%;
  font-size: 13px;
}
.height-btn {
  height: 34px;
  border-radius: 5%;
}
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
.fix {
  border-top: 2px solid rgb(243, 241, 241);
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}
.fixed {
  width: 100%;
  position: fixed;
  height: 100%;
  top: 510px;
}
</style>
