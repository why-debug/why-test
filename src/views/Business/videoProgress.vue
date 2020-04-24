<template>
  <div>
    <div class="loadpage">
      <div style="text-align: center;margin-bottom: 60px;">
        <div class="tit">
          <img src="../../assets/images/video-manage.png" alt width="30px" />
        </div>
        {{videoName}}
      </div>
      <div v-if="during" style="text-align: center;">
        <van-progress :percentage="speed" />
        <p style="font-size:12px;margin-bottom: 80px;">上传中...({{loaded}}MB/{{total}}MB)</p>
        <h2>视频上传中...{{speed}}%</h2>
        <p style="font-size:12px;">美好的内容值得等待，请勿离开当前页面</p>
      </div>
      <div v-else style="text-align: center;">
        <h2 style="color:#2476E7;margin-bottom: 100px;">上传完成</h2>
        <button class="btn" @click="successVideo()">确 定</button>
        <!-- <van-button style="padding:0 10px" round type="info" @click="successVideo()">确定</van-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Progress, Button } from "vant";
import Vue from "vue";
import api from "@/api/basic";
Vue.use(Progress);
Vue.use(Button);
export default {
  data() {
    return {
      videoName: "",
      during: true
    };
  },
  computed: {
    total() {
      let videoTotal = this.$store.state.videoTotal;
      let sum = videoTotal / 1024 / 1024;
      return sum.toFixed(1);
    },
    loaded() {
      let videoLoaded = this.$store.state.videoPro;
      let sum = videoLoaded / 1024 / 1024;
      return sum.toFixed(1);
    },
    speed() {
      let Speed = this.$store.state.videoSpeed;
      if (Speed == 100) {
        setTimeout(() => {
          this.during = false;
        }, 2000);
      }

      return Speed;
    }
  },
  methods: {
    successVideo() {
      this.$router.go(-2);
    }
  },
  mounted() {
    this.videoName = this.$route.query.videoName;
    this.$store.commit("newvideoSpeed", 0);
    this.during = true;
  }
};
</script>

<style lang="scss" scoped>
.loadpage {
  width: 75%;
  background: #fff;
  margin: 0 auto;
  margin-top: 40px;
  padding: 40px 30px 60px;
  .tit {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #C4DAFA;
    margin: 0 auto;
  }
  .btn {
    width: 140px;
    height: 40px;
    border-radius: 20px;
    background: #2476E7;
    color: #fff;
    border: none;
  }
}
</style>