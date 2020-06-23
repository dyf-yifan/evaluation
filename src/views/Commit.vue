<!--  -->
<template
  ><div>
    <div class="back blue-color">
      <i class="iconfont" @click="goBack()">&#xe609;</i>
    </div>
    <span id="app">
      <!-- <span>Prize number: {{ prizeNumber }}</span> -->
      <!-- <button
        type="button"
        @click="!rolling && prizeNumber < 8 && prizeNumber++"
        :disabled="rolling || prizeNumber === 8"
      >
        Add
      </button>
      <button
        type="button"
        @click="!rolling && prizeNumber > 2 && prizeNumber--"
        :disabled="rolling || prizeNumber === 2"
      >
        Remove
      </button> -->
      <div class="wheel-wrapper">
        <div class="wheel-pointer" @click="onClickRotate">
          Start
        </div>
        <div
          class="wheel-bg"
          :class="{ freeze: freeze }"
          :style="`transform: rotate(${wheelDeg}deg)`"
        >
          <div class="prize-list">
            <div
              class="prize-item-wrapper"
              v-for="(item, index) in prizeList"
              :key="index"
            >
              <div
                class="prize-item"
                :style="
                  `transform: rotate(${(360 / prizeList.length) * index}deg)`
                "
              >
                <div class="prize-name">
                  {{ item.name }}
                </div>
                <div class="prize-icon">
                  <img :src="item.icon" class="icon-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
    <div class="score">测试结束，你的得分是{{ this.score }}分</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: this.$route.query.score,
      freeze: false,
      rolling: false,
      wheelDeg: 0,
      prizeNumber: 8,
      prizeListOrigin: [
        {
          icon: "https://u.geelg.com/i/Ta6EFIxPHD981i.png",
          name: "学而思优惠券"
        },
        {
          icon:
            "https://bpic.588ku.com/element_pic/19/04/09/6ae122e4a3f0992e3eb68c927024e062.jpg!/fw/224/quality/90/unsharp/true/compress/true",
          name: "谢谢参与"
        },
        {
          icon: "https://u.geelg.com/i/Ta6EFIxPHD981i.png",
          name: "2元微信红包"
        },
        {
          icon: "https://u.geelg.com/i/Ta6EFIxPHD981i.png",
          name: "100元微信红包"
        },
        {
          icon:
            "https://bpic.588ku.com/element_pic/19/04/09/6ae122e4a3f0992e3eb68c927024e062.jpg!/fw/224/quality/90/unsharp/true/compress/true",
          name: "谢谢参与"
        },
        {
          icon: "https://u.geelg.com/i/Ta6EFIxPHD981i.png",
          name: "2元微信红包"
        },
        {
          icon: "https://u.geelg.com/i/Ta6EFIxPHD981i.png",
          name: "10元微信红包"
        },
        {
          icon:
            "https://bpic.588ku.com/element_pic/19/04/09/6ae122e4a3f0992e3eb68c927024e062.jpg!/fw/224/quality/90/unsharp/true/compress/true",
          name: "谢谢参与"
        }
      ]
    };
  },
  components: {},
  computed: {
    prizeList() {
      return this.prizeListOrigin.slice(0, this.prizeNumber);
    }
  },
  methods: {
    goBack() {
      window.history.go(-1);
    },
    onClickRotate() {
      if (this.rolling) {
        return;
      }
      this.rolling = true;
      const { wheelDeg, prizeList } = this;
      const random = Math.floor(Math.random() * prizeList.length);
      console.log(random);
      this.wheelDeg =
        wheelDeg -
        (wheelDeg % 360) +
        6 * 360 +
        (360 - (360 / prizeList.length) * random);
      setTimeout(() => {
        this.rolling = false;
        // alert("Result：" + prizeList[random].name);
      }, 4500);
    }
  },
  watch: {
    prizeNumber() {
      this.freeze = true;
      this.wheelDeg = 0;

      setTimeout(() => {
        this.freeze = false;
      }, 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.score {
  font-size: 18px;
  text-align: center;
  margin-top: 10%;
}
html {
  background: #dd7c7d;
}

.wheel-wrapper {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wheel-pointer {
  width: 60px;
  height: 60px;
  border-radius: 1000px;
  background: #f01919;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 10;
}
.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 4s ease-in-out;
  background: #f7d5d5;

  &.freeze {
    transition: none;
    background: rgb(226, 156, 51);
  }
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;

  .prize-name {
    padding: 16px 0;
  }
}
</style>
