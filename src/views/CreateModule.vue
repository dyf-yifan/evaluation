<template>
  <div class="conteiner">
    <div class="c-container mar">
      <div class="c-title">项目标题</div>
      <div class="c-huanl c-l">
        {{ this.listsContent.title }}
      </div>
      <div class="c-title">
        欢迎语
      </div>
      <div class="c-huanl c-l">
        <div class="c-huanll">
          亲爱的同学们，在延迟开学期间，请您花一点时间，填答以下有关网络课程的调查问卷。问卷采取匿名方式，请认真作答。“固居于室，得以静心，专注于学，突破提升”。希望你秉持学校和老师的教诲，在家长的悉心关怀下，合理规划居家学习与生活，讲安全、讲卫生、少出门、不聚集，科学防控病毒，静候春暖花开。
        </div>
      </div>

      <div class="c-title">题目</div>
      <div class="top">
        <div
          class="c-huanl c-ll"
          v-for="(item1, index1) in question"
          :key="index1"
          v-show="edit"
        >
          <div class="d-right">
            <i class="iconfont ax" @click="showl(index1)">&#xe61c;</i>
            <div class="xuan" v-show="showXuan == index1 && showXuan1">
              <div class="xuanl" @click="top(index1)">
                <i class="iconfont">&#xe692;</i> 上移
              </div>
              <div class="xuanl" @click="under(index1)">
                <i class="iconfont">&#xe619;</i> 下移
              </div>
              <!-- <div class="xuanl" @click="top(index1)">
                <i class="iconfont">&#xe631;</i> 新增
              </div> -->
              <div class="xuanl" @click="remove(index1)">
                <i class="iconfont">&#xe603;</i> 删除
              </div>
            </div>
          </div>
          <div v-if="item1.status == 0" @click="editl(index1)">
            <div class="c-questionl">
              {{ item1.question }}
            </div>
            <div
              class="c-hu"
              v-for="(item2, index2) in item1.list"
              :key="index2"
            >
              <i class="iconfont">&#xe67f;</i>
              {{ item2.content }}
            </div>
          </div>
          <div v-if="item1.status == 1" @click="editl(index1)">
            <div class="c-questionl">
              {{ item1.question }}
            </div>
            <div
              class="c-hu"
              v-for="(item2, index2) in item1.list"
              :key="index2"
            >
              <i class="iconfont">&#xe67f;</i>
              {{ item2.content }}
            </div>
          </div>
          <div v-if="item1.status == 2" @click="editl(index1)">
            <div class="c-questionl">
              {{ item1.question }}
            </div>
            <div
              class="c-hu"
              v-for="(item2, index2) in item1.list"
              :key="index2"
            >
              <i class="iconfont">&#xe994;</i>
              {{ item2.content }}
            </div>
          </div>
        </div>

        <div class="edit mar" v-show="!edit">
          <div class="edit-xuan">
            <div @click="save()"><i class="iconfont">&#xe632;</i> 保存</div>
            <div @click="cancel()"><i class="iconfont">&#xe606;</i> 取消</div>
          </div>
          <div class="edit-question">
            {{ this.tem.question }}
          </div>

          <van-cell-group v-for="(item, index) in this.tem.list" :key="index">
            <van-field
              v-model="tem.list[index].content"
              placeholder="请输入问题选项"
            />
          </van-cell-group>
          <div class="edit-xuan">
            <div><i class="iconfont" @click="add()">&#xe657;</i> 选项</div>
            <div><i class="iconfont">&#xe661;</i> 批量增加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <div class="fix">
        <van-button class="height-btnl" @click="toSuccessTip" type="info"
          >发布</van-button
        >
        <van-button class="height-btn" plain type="info" to="/my-project"
          >更多</van-button
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
      question: [],
      showXuan: "",
      showXuan1: false,
      show: false,
      edit: true,
      tem: [],
      choiceTem: {
        content: "请选择"
      },
      temIndex: ""
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getListsContent();
  },

  methods: {
    editl(index) {
      if (this.edit) {
        this.edit = false;
      } else {
        this.edit = true;
      }
      this.tem = this.question[index];
      this.temIndex = index;
    },
    // 成功提示
    toSuccessTip() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/user/phone",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {
          phone: this.tel,
          verifyCode: this.sms
        }
      }).then(res => {
        let verify = res.data.code;
        if (verify === 1) {
          this.$router.push({
            path: "/my-project",
            query: { id: res.data.data.userId }
          });
        } else {
          this.$toast({
            message: res.data.msg,
            position: "middle"
          });
        }
      });
      this.$router.push({
        path: "/yiqing-module/survey-content/login-site",
        query: { score: this.score }
      });
    },

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
        console.log(this.listsContent);
      });
    },
    showl(index) {
      this.showXuan = index;
      if (this.showXuan1) {
        this.showXuan1 = false;
      } else {
        this.showXuan1 = true;
      }
    },
    under(index) {
      if (index + 1 === this.question.length) {
        //弹出框，提示不能在向下了
        this.$toast({
          message: "不能再往下了",
          position: "middle"
        });
      } else {
        let tem = this.question[index];
        this.question[index] = this.question[index + 1];
        this.question[index + 1] = tem;
        this.showXuan1 = false;
      }
    },
    top(index) {
      if (index === 0) {
        //弹出框，提示不能在向上了
      } else {
        let tem = this.question[index];
        this.question[index] = this.question[index - 1];
        this.question[index - 1] = tem;
        this.showXuan1 = false;
      }
    },
    remove(index) {
      this.question.splice(index, 1);
      this.showXuan1 = false;
    },
    add() {
      let tem = { content: "" };
      this.tem.list.push(tem);
    },
    save() {
      Dialog.confirm({
        message: "确定保存吗？"
      }).then(() => {
        this.question[this.temIndex] = this.tem;
        this.edit = !this.edit;
      });
    },
    cancel() {
      Dialog.confirm({
        message: "确定取消吗？"
      }).then(() => {
        this.edit = !this.edit;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ax {
  margin-top: 1%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  height: 200px;
  background-color: #fff;
}
.top {
  margin-bottom: 100px;
}
.fixl {
  border-bottom: 2px solid rgb(243, 241, 241);
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
}

.fixedl {
  width: 100%;
  position: fixed;
}
.xuan {
  position: absolute;
  width: 90px;
  border-radius: 5%;
  border: 1px solid rgba(107, 96, 96, 0.19);
  background-color: #fff;
  z-index: 1001;
  margin-top: 25px;
}
.xuanl {
  width: 100%;
  height: 35px;
  font-size: 13px;
  border-bottom: 1px solid #e8e8e8;
  color: #363636;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.conteiner {
  width: 100%;
  height: 100%;
}
.c-container {
  width: 90%;
  height: 0 auto;
}
.c-title {
  margin-top: 5%;
  width: 100%;
  height: 30px;
  font-size: 15px;
  color: dimgrey;
}
.c-titlel {
  width: 100%;
  height: auto;
}
.c-huanll {
  width: 100%;
}
.c-hu {
  font-size: 13.5px;
  margin-top: 5%;
}
.d-right {
  display: flex;
  justify-content: flex-end;
}
.c-questionl {
  font-size: 16px;
}
</style>
