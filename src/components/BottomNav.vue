<template>
  <van-tabbar v-model="active" active-color="#2577E8" inactive-color="#ccc" :border="false" route>
    <van-tabbar-item icon="wap-home" to="/home">
      <span>首页</span>
      <img slot="icon" slot-scope="props" :src="props.active ? homeIcon.active : homeIcon.inactive" />
    </van-tabbar-item>
    <!--<van-tabbar-item v-if="isShow">
            <img class="center-icon" src="../assets/images/center-icon.png" @click="uploadVideoRing">
    </van-tabbar-item>-->
    <!-- <van-tabbar-item v-if="isShow">
      <div class="tab-btn" @click="uploadVideoRing">
        <img src="@/assets/images/menu-btn.png" />
        <span>办理业务</span>
      </div>
    </van-tabbar-item>-->
    <van-tabbar-item v-if="loginShow">
      <div class="tab-btn" @click="$router.push('/login')">
        <img src="@/assets/images/menu-btn.png" />
        <span>办理业务</span>
      </div>
    </van-tabbar-item>

    <img v-if="isShow" src="@/assets/images/home_addquanzi.png" @click="show=true" alt width="50" />
    <van-popup round closeable :style="{ height: '30%' }" v-model="show" position="bottom">
      <div style="text-align: center;">
        <img src="@/assets/images/home_addquanzi.png" @click="show=false" width="50" alt />
      </div>
      <div class="add_popup">
        <p @click="$router.push('/search')">
          <img src="@/assets/images/addquanzi.png" alt width="70" />
          <span>加入圈子</span>
        </p>
        <p @click="uploadVideoRing">
          <img src="@/assets/images/banli.png" alt width="70" />
          <span>办理业务</span>
        </p>
      </div>
    </van-popup>

    <van-tabbar-item name="mine" icon="user-o" @click="mine" :class="!!!isMe ? 'disable' : ''">
      <span>我的</span>
      <img slot="icon" :src="$route.name == 'mine' ? userIcon.active : userIcon.inactive" />
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Vue from "vue";
import { Popup, Toast } from "vant";
import { Storage } from "../api/common";
Vue.use(Popup);
Vue.use(Toast);
const overTime = new Storage();
export default {
  name: "BottomNav",
  data() {
    return {
      active: 0,
      isShow: false,
      loginShow: true,
      isMe: false,
      // 首页弹出层
      show: false,
      homeIcon: {
        active: require("@/assets/images/home-active.png"),
        inactive: require("@/assets/images/home-default.png")
      },
      userIcon: {
        active: require("@/assets/images/user-active.png"),
        inactive: require("@/assets/images/user-default.png")
      }
    };
  },
  mounted() {
    const role = overTime.get("role");
    const loginShow = localStorage.getItem("loginShow");
    if (role == "5" && loginShow == 1) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }

    if (role == "") {
      this.isMe = false;
    } else {
      this.isMe = true;
    }
    if (loginShow == 1) {
      this.loginShow = false;
    } else {
      this.loginShow = true;
    }
  },
  methods: {
    mine() {
      if (this.isMe) {
        if (overTime.get("circleUserPhone")) {
          const role = overTime.get("role");
          if (role == "1") {
            this.$router.push("/circle-list");
          } else if (role == "2") {
            this.$router.push("/manage-list");
          } else if (role == "3") {
            this.$router.push("/circle-detail");
          } else {
            if (!overTime.get("hasJoinedNoCircle")) {
              // this.$router.push("/nob");
              Toast("请先办理业务或加入圈子");
            } else {
              this.$router.push("/upload-list");
            }
          }
        } else {
          this.$router.push({
            name: "login",
            params: {
              where: "mine"
            }
          });
        }
        /*if (overTime.get("circleUserPhone")) {
                        this.$router.push("/mine")
                    } else {
                        this.$router.push({
                            name: 'login',
                            params: {
                                where: 'mine'
                            }
                        })
                    }*/
      }
    },
    // 上传视频彩铃
    uploadVideoRing() {
      if (overTime.get("circleUserPhone")) {
        if (!overTime.get("hasJoinedNoCircle")) {
          this.$router.push("/service-ring");
        } else {
          this.$router.push("/upload-list");
        }
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.add_popup {
  display: flex;
  justify-content: space-around;
  align-items: center;
  p {
    width: 80px;
    text-align: center;
    padding: 0;
    margin: 0;
    span {
      margin-top: 10px;
      display: inline-block;
    }
  }
}
.center-icon {
  width: 55px;
  height: 55px;
  margin-bottom: 20px;
}
.disable {
  color: #d0cccc;
}
.tab-btn {
  height: 36px;
  padding: 0 18px 0 15px;
  border-radius: 36px;
  background-color: #2577e8;

  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    height: 18px;
    margin-right: 4px;
  }
  > span {
    color: #ffffff;
    font-size: 14px;
  }
}
.van-tabbar-item {
  flex-flow: row;

  img {
    margin-right: 4px;
  }

  span {
    font-size: 14px;
  }
}
</style>
