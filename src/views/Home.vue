<template>
  <div id="home">
    <div class="top">
      <!-- 退出 -->
      <p v-show="loginShow" class="exit" @click="exit">
        <img
          style="vertical-align: middle;margin-right:4px;width:12px"
          src="../assets/images/exit_home.png"
          alt
        />
        <span style="color:#FFEE00FF;font-size:11px">退出</span>
      </p>
    </div>
    <div style="padding: 0 10px;">
      <div class="introduction bg-white">
        <div v-for="(item,index) in introduction" :key="index" class="item-box">
          <div class="title">
            <img :src="item.icon" />
            {{item.title}}
          </div>
          <div class="context">{{item.context}}</div>
        </div>
      </div>
      <div class="case-title">精选铃音展示</div>
      <div class="video-wrap bg-white">
        <van-tabs @click="onClick" color="#2577E8" title-active-color="#2577E8" :border="false">
          <van-tab v-for="(item,index) in videoList" :key="index" :title="item.type" :name="index"></van-tab>
        </van-tabs>
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <!--<p>刷新次数: {{ count }}</p>
              <div class="home-picture-cont">
                <div
                  v-for="(it,idx) in item.rings"
                  :key="idx"
                  :style="gridHegiht($config.fileUrl+it.cover)"
                  @click="showVideo(index,idx)"
                  :class="['home-picture-cont-img']"
                >
                  <img class="cover" v-lazy="$config.fileUrl+it.cover" />
                  <img class="play-btn position-center" src="../assets/images/btn_bofang.png" />
                  <div class="name">{{it.name}}</div>
                  <span class="duration">{{it.duration}}</span>
                </div>
        </div>-->
        <!-- <van-loading v-show="imgsArr==''?true:false" style="text-align: center;" type="spinner" color="#1989fa"/> -->
        <!-- </van-pull-refresh> -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <!-- 流式布局插件 -->
          <Waterfall
            :list="list[ind]"
            :gutter="10"
            :width="240"
            :gridWidth="-1"
            :breakpoints="{
                    1200: { //当屏幕宽度小于等于1200
                    rowPerView: 4,
                    },
                    800: { //当屏幕宽度小于等于800
                    rowPerView: 3,
                    },
                    500: { //当屏幕宽度小于等于500
                    rowPerView: 2,
                    }
                }"
            backgroundColor="#fff"
            ref="waterfall"
          >
            <template slot="item" slot-scope="props">
              <div class="card" @click="showVideo(props.data.ring)">
                <img
                  class="cover"
                  :src="$config.fileUrl+props.data.cover"
                  alt
                  @load="$refs.waterfall.refresh()"
                />
                <img class="play-btn position-center" src="../assets/images/btn_bofang.png" />
                <div class="name">{{props.data.name}}</div>
                <span class="duration">{{props.data.duration}}</span>
              </div>
            </template>
          </Waterfall>
        </van-pull-refresh>
        <p style="text-align: center;color:#ccc;margin-bottom:0">已经到最底部啦！</p>
      </div>
    </div>
    <!--帮助 按钮-->
    <drag-help @click.native="$router.push('/qa')" />
    <bottom-nav />
  </div>
</template>

<script>
import api from "../api/basic";
import DragHelp from "../components/DragHelp";
import { Storage } from "../api/common";
import BottomNav from "../components/BottomNav";
// 流式布局插件引入
import Waterfall from "vue-waterfall-plugin";
import Vue from "vue";
import { Lazyload, Loading, PullRefresh, Dialog } from "vant";

Vue.use(Loading);
Vue.use(PullRefresh);

Vue.use(Lazyload, {
  lazyComponent: true,
  preload: 1.5
});

import vueWaterfallEasy from "vue-waterfall-easy";
const overTime = new Storage();
export default {
  name: "home",
  components: { BottomNav, DragHelp, vueWaterfallEasy, Waterfall },
  data() {
    return {
      // 数据
      list: [],
      ind: 0,
      loginShow: false,
      isLoading: false,
      introduction: [
        {
          title: "业务介绍",
          icon: require("../assets/images/pic_yewu.png"),
          context:
            "圈子视频彩铃是服务于特定圈子客户，由被叫客户付费，在通话接通前为主叫客户提供一段定制化视频媒体的业务。"
        }
      ],
      videoList: [],
      active: 0
    };
  },
  methods: {
    // 安全退出
    exit() {
      Dialog({ message: "" });
      Dialog.confirm({
        title: "退出登录",
        message: "确认退出吗？"
      })
        .then(() => {
          // on confirm
          this.$router.push("/login");
          localStorage.clear();
        })
        .catch(() => {
          // on cancel
        });
    },
    showVideo(idx) {
      this.$router.push({
        name: "videoShow",
        params: {
          videoSrc: idx
        }
      });
    },
    onClick(index, name) {
      this.ind = index;
    },
    onRefresh() {
      setTimeout(() => {
        // Toast("刷新成功");
        this.isLoading = false;
        // this.count++;
      }, 1000);
    }
  },
  // computed: {
  //   gridHegiht() {
  //     return function(imgUrl) {
  //       let img = new Image();
  //       img.src = imgUrl;
  //       let heightSm = "";
  //       return (img.onload = function() {
  //         let width = img.width;
  //         let height = img.height;
  //         heightSm = {
  //           "grid-row": `auto / span ${height > width ? "24" : "12"}`
  //         };
  //         return heightSm;
  //       })();
  //     };
  //   }
  // },
  mounted() {
    this.loginShow = localStorage.getItem("loginShow");
    // overTime.set('userId','handong',100000);
    api.sampleRings().then(res => {
      if (res.data.code == "000000") {
        this.videoList = res.data.data;
        // console.log(res.data.data);
        res.data.data.forEach(e => {
          this.list.push(e.rings);
        });
      } else {
        this.$toast(res.data.msg);
      }
    });
    // 保存saId
    const saId = this.$route.query.saId;
    if (saId) {
      // localStorage.setItem("said", saId);
      overTime.set("said", saId, 40000000);
    }
  }
};
</script>
<style scoped lang="scss">
#home {
  min-height: 100vh;
  background-color: #efeff4;
  .header {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #000;
    text-align: right;
    padding-right: 10px;
  }
  .top {
    width: 100%;
    height: 140px;
    background: url("../assets/images/home-top.png") no-repeat;
    background-size: cover;
    .exit {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 0;
      margin: 0;
    }
  }
  .login-link {
    color: #fefefe;
  }
  .introduction {
    width: 100%;
    height: auto;
    padding: 0 20px;
    border-radius: 8px;
    margin-top: -46px;
    .item-box {
      padding: 20px 0;
      .title {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333333;
        img {
          width: 14px;
          height: 14px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .context {
        font-size: 15px;
        padding-top: 11px;
        line-height: 30px;
      }
      &:last-child {
        border-top: 1px solid #ebebeb;
      }
    }
  }
  .case-title {
    font-size: 16px;
    line-height: 32px;
    margin: 10px 0 4px 0;
    color: #333333;
  }
  .video-wrap {
    border-radius: 8px 8px 0 0;
    padding: 0 15px 15px;
    margin-bottom: 50px;
    .card {
      position: relative;
      display: inline-block;
      width: 100%;
      height: auto;
      color: #333333;
      font-size: 15px;
      margin: 5px 0 10px;
      padding: 0 5px;
      .cover {
        width: 100%;
        // height: 109px;
        border-radius: 5px;
        overflow: hidden;
      }
      .play-btn {
        width: 31px;
        height: 31px;
      }
      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .duration {
        position: absolute;
        right: 10px;
        top: 5px;
        color: #fff;
        font-size: 12px;
      }
    }
    // 流式布局
    // .home-picture-cont {
    //   width: 100%;
    //   box-sizing: border-box;
    //   padding: 0 2px 10px;
    //   display: grid;
    //   grid-row-gap: 4px;
    //   grid-template-columns: repeat(auto-fill, calc(calc(100% - 3px) / 2));
    //   grid-auto-rows: 10px;
    //   grid-column-gap: 3px;
    //   grid-auto-flow: row dense;
    //   .home-picture-cont-img {
    //     width: 100%;
    //     position: relative;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     .cover {
    //       display: block;
    //       width: 100%;
    //       border-radius: 5px;
    //     }
    //     .name {
    //       width: 100%;
    //       // overflow: hidden;
    //       text-overflow: ellipsis;
    //       white-space: nowrap;
    //       position: absolute;
    //       bottom: -10px;
    //       left: 0;
    //     }
    //     .duration {
    //       position: absolute;
    //       right: 10px;
    //       top: 20px;
    //       color: #fff;
    //       font-size: 12px;
    //     }
    //     .play-btn {
    //       width: 31px;
    //       height: 31px;
    //     }
    //   }
    // }
    /deep/ .van-tabs__wrap {
      border-bottom: 1px solid #ebebeb;
    }
  }
  .rz-dialog {
    /deep/ .van-dialog__header {
      padding-top: 17px;
    }
    .close-icon {
      position: absolute;
      top: 20px;
      right: 24px;
    }
  }
  .van-button::before {
    background-color: #fff;
    border-color: #fff;
  }
  .comfirm-btn {
    display: block;
    width: 140px;
    height: 37px;
    margin: 24px auto 10px;
    line-height: 35px;
    background-color: #458fce;
    border-color: #458fce;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 50px;
    background-color: #fff;
    text-align: center;
    padding-top: 5px;
    .fixed-button {
      width: 140px;
      height: 37px;
      line-height: 35px;
      color: #fff;
      background-color: #458fce;
      border-color: #458fce;
      /*box-shadow:0px 6px 10px rgba(99,183,255,0.31);*/
    }
  }
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .video-wrap {
      margin-bottom: 60px;
    }
    .footer {
      height: 65px;
    }
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .video-wrap {
      margin-bottom: 60px;
    }
    .footer {
      height: 65px;
    }
  }
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .video-wrap {
      margin-bottom: 60px;
    }
    .footer {
      height: 65px;
    }
  }
}
</style>
