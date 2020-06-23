<!-- 疫情防控专题模板 -->
<template>
  <div class="containerl" id="capture">
    <img
      class="module-img"
      :src="require('../assets/banner_plague.png')"
      alt="mkjn"
    />
    <div class="fenxiang-img">
      <a href="javascript:void(0)" @click="share()"
        ><img
          class="fenxiang"
          :src="require('../assets/fenxiang.png')"
          alt="lalal"
      /></a>
      <div id="light" class="white_content">
        >
        <a href="javascript:void(0)" @click="close()">
          <div class="close-img">
            <img
              class="close"
              :src="require('../assets/close.png')"
              alt=""
            /></div
        ></a>
        <img v-bind:src="imgUrl" class="er-img" alt="" />
      </div>
      <div id="fade" class="black_overlay"></div>
    </div>

    <div class="content-top mar df-center">
      <div class="all df-centerl">- 全部 -</div>
      <van-button
        type="default"
        @click="toModuleSearch()"
        to="/module-search"
        class="af"
      >
        <i class="iconfont">&#xe617;</i> 搜索
      </van-button>
    </div>
    <div class="df">
      <div
        class="module-card mar"
        @click="toListContent(item.list_id)"
        v-for="(item, index) in module"
        :key="index"
      >
        <div class="module-bc">
          <img
            :src="item.img"
            alt=""
            class="clip-img"
            crossorigin="anonymous"
          />
        </div>
        <div class="module-content">
          <div class="module-title mar d-one">{{ item.title }}</div>
          <div class="module-bot">
            <div class="module-part d-one">被引用{{ item.participate }}次</div>
            <div class="df-centerll">
              <button class="module-btn ">
                免费使用
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="html2canvas.js"></script>
<script>
import html2canvas from "html2canvas";
// Vue.filter("format", function(value) {
//   return value + "?t=129094392478";
// });
export default {
  data() {
    return {
      module: [],
      background: "white",
      base64: "",
      imgUrl: ""
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    this.getModule();
    // this.getQrCode();
  },

  methods: {
    toModuleSearch() {
      this.$router.push({
        path: "/module-search"
      });
    },
    goBack() {
      window.history.go(-1);
    },
    toListContent(listId) {
      this.$router.push({
        path: "/yiqing-module/survey-content",
        query: { id: listId }
      });
    },
    img2base64(url, crossOrigin) {
      return new Promise(resolve => {
        const img = new Image();

        img.onload = () => {
          const c = document.createElement("canvas");

          c.width = img.naturalWidth;
          c.height = img.naturalHeight;

          const cxt = c.getContext("2d");

          cxt.drawImage(img, 0, 0);
          // 得到图片的base64编码数据
          resolve(c.toDataURL("image/png"));
        };

        crossOrigin && img.setAttribute("crossOrigin", crossOrigin);
        img.src = url;
      });
    },
    getModule() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/list/special",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {}
      }).then(res => {
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          list[i].img = list[i].img + "?t=129094392478";
          // list[i].img.setAttribute("crossOrigin", "anonymous");
        }
        this.module = list;
        console.log(this.module);
      });
    },
    share() {
      html2canvas(document.getElementById("capture")).then(function(canvas) {
        let capture = document.getElementById("capture").style;
        let light = document.getElementById("light").style;
        light.display = "block";
        light.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
        light.backgroundRepeat = "no-repeat";
        light.backgroundSize = "100% 100%";
        // console.log(canvas.toDataURL("image/png"));
        document.getElementById("fade").style.display = "block";
        // console.log(canvas.toDataURL("image/png"));
      }, this.getQrCode());

      // alert(this.$route.path)
      // alert(window.location.href)
    },
    close() {
      document.getElementById("light").style.display = "none";
      document.getElementById("fade").style.display = "none";
    },
    base64ToBlob(urlData) {
      var arr = urlData.split(",");
      var mime = arr[0].match(/:(.*?);/)[1] || "image/png";
      // 去掉url的头，并转化为byte
      var bytes = window.atob(arr[1]);
      // 处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
      var ia = new Uint8Array(ab);

      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }

      return new Blob([ab], {
        type: mime
      });
    },
    getQrCode() {
      this.axios({
        method: "POST",
        url: "http://120.26.70.42:8080/api/code/QrCode",
        headers: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        params: {
          content: window.location.href
        }
      }).then(res => {
        this.imgUrl = res.data.data;
        console.log(this.imgUrl);
      });
    },
    //保存图片
    saveSharePic() {
      // 想要保存的图片节点
      const dom = document.getElementById("light");
      // 创建一个新的canvas
      const canvas = document.createElement("canvas");
      const width = document.body.offsetWidth; // 可见屏幕的宽
      const height = document.body.offsetHeight; // 可见屏幕的高
      console.log(
        "可见屏幕宽高：" +
          document.body.offsetWidth +
          "、" +
          document.body.offsetHeight
      );
      const scale = window.devicePixelRatio; // 设备的devicePixelRatio
      // 将Canvas画布放大scale倍，然后放在小的屏幕里，解决模糊问题
      canvas.width = width * scale;
      canvas.height = height * scale;
      console.log("canvas宽高：" + canvas.width + "、" + canvas.height);
      canvas.getContext("2d").scale(scale, scale);
      // dom节点绘制成canvas
      html2canvas(dom).then(function(canvas) {
        const img = canvas2Image(canvas, canvas.width, canvas.height);
        img.style.cssText =
          "width:100%;position:absolute;top:0;left:0;opacity:0;z-index:999;";
        console.log("图片宽高：" + img.width + "、" + img.height);
        document.body.appendChild(img);
      });
    },

    //利用canvas获取图片的base64编码创建图片对象
    canvas2Image(canvas, width, height) {
      const retCanvas = document.createElement("canvas");
      const retCtx = retCanvas.getContext("2d");
      retCanvas.width = width;
      retCanvas.height = height;
      retCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height);
      const img = document.createElement("img");
      img.src = retCanvas.toDataURL("image/png", 1); // 可以根据需要更改格式
      return img;
    }
  }
};
</script>
<style lang="scss" scoped>
.er-img {
  width: 20%;
  height: 50px;
  margin-top: 21%;
}
.close-img {
  display: flex;
  justify-content: flex-end;
}
.close {
  width: 20px;
  height: 20px;
}
.black_overlay {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.7;
  filter: alpha(opacity=88);
}
.white_content {
  display: none;
  position: absolute;
  width: 75%;
  height: 400px;
  left: 42%;
  right: 25%;
  top: 20%;
  margin-left: -120px;
  border: 1px solid rgb(218, 213, 213);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 1002;
  overflow: auto;
}
.fenxiang-img {
  display: flex;
  justify-content: flex-end;
  margin-top: -140px;
  margin-right: 2%;
}
.fenxiang {
  width: 23px;
  height: 24px;
}
.content-top {
  margin-top: 110px;
}
.module-img {
  width: 100%;
  height: 145px;
}
.a-style {
  color: #828282;
  width: 30%;
  height: 57%;
  border: 1px solid #e8e8e8;
  font-size: 14px;
  border-radius: 20px;
}
.df {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
}
.module-card {
  margin-top: 4%;
  width: 45%;
  height: 165px;
  border-radius: 1%;
  box-shadow: 0 2px 12px 0 rgba(37, 37, 37, 0.1);
}
.module-bc {
  width: 100%;
  height: 60%;
}
.clip-img {
  width: 53%;
  height: 35%;
  position: absolute;
  clip: rect(0px 180px 95px 0px);
}
.module-content {
  padding-left: 1%;
  width: 100%;
  height: 40%;
}
.module-title {
  width: 95%;
  height: 50%;
  font-size: 15px;
}
.module-bot {
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
  padding-top: 2%;
  padding-bottom: 5%;
}
.module-part {
  height: 100%;
  width: 59%;
  font-size: 13px;
  color: rgb(184, 188, 190);
  padding-left: 2%;
}
.module-btn {
  // height: 80%;
  font-size: 12px;
  background-color: #fff;
  border: 1px solid rgb(108, 169, 230);
  color: rgb(108, 169, 230);
  border-radius: 3%;
}
.containerl {
  width: 100%;
  height: 568px;
}
</style>
