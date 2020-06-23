<!--  -->
<template>
  <div class="login">
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
        <van-button size="small" type="info">发送验证码</van-button>
      </template>
    </van-field>
    <div class="login-l">
      <van-button class="login-btn" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tel: "",
      sms: "",
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {},

  methods: {},
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
