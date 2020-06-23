<!--  -->
<template>
  <div class="login">
    <div class="back blue-color">
      <i class="iconfont" @click="goBack()">&#xe609;</i>
    </div>
    <div class="title">登录“测评”</div>
    <van-field v-model="tel" type="tel" label="手机号" />
    <van-field
      v-model="sms"
      center
      clearable
      label="短信验证码"
      placeholder="请输入短信验证码"
    >
      <template #button>
        <van-button size="small" type="info" @click="send()"
          >发送验证码</van-button
        >
      </template>
    </van-field>
    <div class="login-l">
      <van-button class="login-btn" type="info" @click="confirm()"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      sms: ""
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {},

  methods: {
    goBack() {
      window.history.go(-1);
    },
    send() {
      this.axios({
        method: "POST",
        url: "http://localhost:8080/api/sms/",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {
          phone: this.tel
        }
      }).then(
        this.$toast({
          message: "验证码已发送",
          position: "middle"
        })
      );
    },
    confirm() {
      this.axios({
        method: "POST",
        url: "http://localhost:8080/api/user/phone",
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
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 10%;
}
.login {
  margin-top: 20%;
}
.login-btn {
  margin-top: 10%;
  width: 50%;
  height: 30px;
}
.login-l {
  display: flex;
  justify-content: center;
}
</style>
