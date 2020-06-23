<!--  -->
<template>
  <div class="m-container blue-color">
    <div class="m-card padding-card mar">
      <div class="m-title d-one">网课问卷调查-学生版</div>
      <div class="m-middle df-center">
        <div class="m-middle-l"><i class="iconfont">&#xe739;</i> 收集中</div>
        <div class="m-middle-ll">收集数量：0份</div>
      </div>
      <div class="m-bottom df-centerlll">
        <div><i class="iconfont icon-blue">&#xe605;</i> 编辑</div>
        <div><i class="iconfont icon-blue">&#xe62e;</i> 分享</div>
        <div><i class="iconfont icon-blue">&#xe60e;</i> 数据</div>
        <div><i class="iconfont icon-blue">&#xe644;</i> 更多</div>
      </div>
    </div>
    <div class="m-card padding-card mar">
      <div class="m-title d-one">网课问卷调查-学生版</div>
      <div class="m-middle df-center">
        <div class="m-middle-lll"><i class="iconfont">&#xe739;</i> 未发布</div>
        <div class="m-middle-ll">收集数量：0份</div>
      </div>
      <div class="m-bottom df-centerlll">
        <div><i class="iconfont icon-blue">&#xe605;</i> 编辑</div>
        <div><i class="iconfont icon-blue">&#xe62e;</i> 分享</div>
        <div><i class="iconfont icon-blue">&#xe60e;</i> 数据</div>
        <div><i class="iconfont icon-blue">&#xe644;</i> 更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    goBack() {
      window.history.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.m-container {
  width: 100%;
  height: auto;
}
.m-card {
  margin-top: 5%;
  width: 89%;
  height: 120px;
  box-shadow: 0 2px 5px 2px rgba(41, 35, 35, 0.2),
    1px 6px 5px 1px rgba(107, 96, 96, 0.19);
}
.m-title {
  width: 100%;
  height: 30%;
  font-size: 17px;
  color: #4f4f4f;
}
.m-middle {
  width: 100%;
  height: 30%;
  font-size: 13px;
}
.m-bottom {
  width: 100%;
  height: 40%;
  font-size: 13.5px;
  color: #828282;
}
.m-middle-l {
  color: #1aad19;
}
.m-middle-ll {
  color: #9c9c9c;
}
.m-middle-lll {
  color: rgb(255, 205, 3);
}
</style>
