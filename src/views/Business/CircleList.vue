<template>
  <div class="box-list">
    <!-- 顶部背景图 -->
    <div class="tit_bg">
      <!-- <img class="exit" @click="exit" src="../../assets/images/exit.png" alt width="30" /> -->
      <img class="add" @click="add" src="../../assets/images/add.png" alt width="60" />
      <div class="head_phone">
        <div class="tit_header">
          <div>
            <img src="../../assets/images/head.png" alt width="30" />
          </div>
        </div>
        <p class="phone">{{phoneNumFilter}}</p>
      </div>
    </div>
    <div id="list" style="margin: 10px;border-radius: 10px ">
      <van-list v-model="loading" :finished="finished" finished-text="已经全部加载完成" @load="onLoad">
        <van-swipe-cell v-for="(item,i) in dataList" :key="i" :ref="`list${i}`" class="list-box">
          <van-cell>
            <template slot="title">
              <circle-list-item :circle-item="item" />
              <!--<span class="share-box">分享加入</span>
              </circle-list-item>-->
            </template>
            <van-icon
              @click="handleClick($event,i)"
              slot="right-icon"
              name="ellipsis"
              style="line-height: 45px;"
            />
          </van-cell>
          <template slot="right">
            <!--<van-button type="info" text="编辑" @click="editCircle"/>-->
            <van-button type="danger" text="删除" @click="removeCircle(item.circleId)" />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
    <!-- 底部选项标签 -->
    <div id="bottom">
      <van-tabbar v-model="active" active-color="#2577E8" :border="false" route>
        <van-tabbar-item icon="wap-home" to="/home">
          <span>首页</span>
          <img slot="icon" :src="homeIcon.inactive" />
        </van-tabbar-item>
        <!--<van-tabbar-item v-if="isShow">
                <img class="center-icon" src="../assets/images/center-icon.png" @click="uploadVideoRing">
        </van-tabbar-item>-->
        <!-- <van-tabbar-item v-if="isShow">
                <div class="tab-btn" @click="uploadVideoRing">
                    <img src="@/assets/images/menu-btn.png">
                    <span>办理业务</span>
                </div>
        </van-tabbar-item>-->
        <van-tabbar-item name="mine" icon="user-o">
          <span style="color:#2577E8">我的</span>
          <img slot="icon" :src="userIcon.active" />
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import CircleListItem from "../components/CircleListItem";
import api from "@/api/basic";
import { Dialog } from "vant";
import { SwipeCell } from "vant";
import Vue from "vue";
Vue.use(SwipeCell);

export default {
  name: "CircleList",
  components: {
    CircleListItem
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      total: 0,
      dataList: [],
      timer: null,
      active: 1,
      isShow: false,
      isMe: false,
      phone: "未登录", // 初始电话号码数据
      str: "",
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
  mounted() {},
  methods: {
    // 点击滑动
    handleClick(event, i) {
      event.stopPropagation();
      // console.log(this.$refs[`list${i}`][0]);
      if (this.$refs[`list${i}`][0].offset) {
        this.$refs[`list${i}`][0].close();
        return;
      }
      this.$refs[`list${i}`][0].open();
    },
    // 安全退出(已移动到首页)
    // exit() {
    //   Dialog({ message: "" });
    //   Dialog.confirm({
    //     title: "退出登录",
    //     message: "确认退出吗？"
    //   })
    //     .then(() => {
    //       // on confirm
    //       this.$router.push("/");
    //       localStorage.clear();
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    // },
    onchang(e) {
      this.active = e.detail;
    },
    // 添加圈子
    add() {
      this.$router.push("/create-circle");
    },
    initialize() {
      this.page = 1;
      this.dataList = [];
      this.total = 0;
      this.finished = false;
    },
    createPath() {
      this.$router.push({ name: "createCircle" });
    },
    editCircle() {
      this.$router.push({ name: "editCircle", params: { type: "1" } });
    },
    removeCircle(circleId) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否删除此圈子信息？"
        })
        .then(_ => {
          this.$toast.loading({
            mask: true,
            message: "请稍候...",
            duration: 0
          });
          api
            .removeCircle({circleId:circleId})
            .then(res => {
              const { data } = res;
              if (data.code === this.$common.SUCCESS) {
                this.$notify({
                  message: "删除成功",
                  duration: 2000,
                  background: "#07c160"
                });
                this.initialize();
                this.onLoad();
              } else {
                this.$notify({
                  type: "danger",
                  message: data.msg,
                  duration: 2000
                });
              }
            })
            .finally(_ => {
              this.$toast.clear();
            });
        })
        .catch(_ => {
          this.$notify({
            type: "warning",
            message: "已取消删除",
            duration: 2000
          });
        });
    },
    circleListTable(fn) {
      api
        .circleList({ page: this.page })
        .then(res => {
          // console.log(res);
          const { data } = res;
          if (data.code === this.$common.SUCCESS) {
            this.page += 1;
            this.total = data.count;
            this.dataList = this.dataList.concat(data.data);
            // console.log( this.dataList);
          } else {
            this.$notify({
              type: "danger",
              message: data.msg,
              duration: 2000
            });
          }
        })
        .finally(fn);
    },
    onLoad() {
      if (!!!this.timer) {
        this.timer = setTimeout(() => {
          this.circleListTable(_ => {
            // 加载状态结束
            this.loading = false;
            this.timer = null;
            // 数据全部加载完成
            if (this.dataList.length >= this.total) {
              this.finished = true;
            }
          });
        }, 500);
      }
    }
  },
  computed: {
    // 电话号码隐藏
    phoneNumFilter() {
      // 1字符串转化成数组
      let phoneArr = [...this.phone];
      // 2.将数组中的4-7位变成*
      phoneArr.map((res, index) => {
        if (index > 2 && index < 7) {
          this.str += "*";
          // return '*';
        } else {
          this.str += res;
          // return res;
        }
      });
      return this.str;
    }
  },
  created() {
    this.phone = JSON.parse(localStorage.getItem("circleUserPhone"));
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm.circleListTable()
    });
  }
};
</script>

<style scoped lang="scss">
$bottom-height: 50px;

.box-list {
  position: relative;
  .add {
    position: fixed;
    bottom: 105px;
    right: 25px;
    z-index: 99;
  }
  .tit_bg {
    background: url("../../assets/images/tit_bg.png") no-repeat;
    height: 150px;
    background-size: cover;
    display: flex;
    align-items: center;
    .exit {
      position: absolute;
      top: 25px;
      right: 25px;
    }
    .head_phone {
      display: flex;
      margin-left: 40px;
      height: 50px;
      align-items: center;
      .phone {
        margin-left: 20px;
        font-weight: bold;
        color: #fff;
        font-size: 20px;
      }
      .tit_header {
        background: #fff;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          background: #5e9ffd;
          border-radius: 50%;
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
        }
      }
    }
  }
  background: #f1eff2;
}
#list {
  min-height: calc(100vh - #{$bottom-height});
  padding-bottom: $bottom-height;
  background-color: #ffffff;
  .top {
    padding: 0 20px;
    height: 50px;
    align-items: center;
    background-color: #f5f5f5;

    img {
      width: 14px;
      height: 14px;
    }
  }

  .list-box {
    .share-box {
      display: inline-block;
      margin-left: 10px;
      width: 60px;
      height: 15px;
      text-align: center;
      line-height: 15px;
      background-color: #ffdfba;
      border-radius: 3px;
      color: #ff8800;
    }
  }
  /deep/ .van-button {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  /deep/ .van-dropdown-menu {
    background-color: transparent;
  }
}

#bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: $bottom-height;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-tabbar-item {
    flex-flow: row;

    img {
      margin-right: 4px;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>
