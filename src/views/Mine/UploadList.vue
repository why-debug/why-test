<template>
  <div id="list">
    <div class="top-container">
      <div class="top-box">
        <img src="../../assets/images/pic_cailing.png" />
        <div>尊敬的{{infos.tel}}用户</div>
        <div
          class="text-one"
          :style="{'color':hasOpenBiz?'':'#FE341F'}"
        >你的圈子视频彩铃业务{{hasOpenBiz?'已开通':'尚未开通'}}</div>
        <div class="click-open" @click="openCircle">
          <van-loading v-if="loading" color="#1989fa" />
          <span v-else-if="!hasOpenBiz">点我开通 ></span>
        </div>
      </div>
      <div class="center-box">
        <div class="info-box">
          <span class="left-box">彩铃名称</span>
          <span class="right-box">{{currentRing||'暂未设置'}}</span>
        </div>
        <div class="info-box">
          <span class="left-box">手机号</span>
          <span class="right-box">{{infos.tel}}</span>
        </div>
        <div class="info-box">
          <span class="left-box">业务资费</span>
          <span class="right-box">{{infos.price}}元/月</span>
        </div>
      </div>
    </div>
    <div class="case-title">视频彩铃列表</div>
    <div class="list-container">
      <div
        class="list-box"
        v-for="(item,index) in ringList"
        :key="index"
        :style="{'color':item.color}"
      >
        <div class="left-box">{{index+1}}&nbsp;&nbsp;{{item.name}}</div>
        <div class="right-box">{{item.status|listStatus}}</div>
      </div>
      <div
        style="text-align: center;color: #ccc;height: 100px;line-height: 100px"
        v-if="noDatas"
      >暂无铃音</div>
    </div>
    <logout-modal
      :is-modal.sync="isCircle"
      :phone="infos.tel"
      title="删除圈子"
      btn-text="确认"
      @refreshClick="endCircleBusiness"
    />
    <!-- <div id="bottom"></div> -->
    <div class="footer">
      <van-button type="info" class="bottom-btn" @click="$router.push('/service-ring')">上传视频彩铃</van-button>
      <van-button type="danger" class="bottom-btn" @click="isCircle = true">删除该圈子</van-button>
    </div>

    <!--<login-modal :is-modal.sync="show" title="开通确认" btn-text="确认开通" @refreshClick="loginOpenBusiness">
            <span>资费{{infos.price}}元/月</span>
    </login-modal>-->

    <logout-modal
      :is-modal.sync="show"
      :phone="infos.tel"
      title="开通确认"
      btn-text="确认开通"
      @refreshClick="loginOpenBusiness"
    >
      <span>资费{{infos.price}}元/月</span>
    </logout-modal>
  </div>
</template>

<script>
import LoginModal from "../components/LoginModal";
import LogoutModal from "../components/LogoutModal";
import api from "../../api/basic";
import { Storage } from "../../api/common";
const overTime = new Storage();

export default {
  name: "UploadList",
  components: {
    LoginModal,
    LogoutModal
  },
  data() {
    return {
      loading: false,
      noDatas: false,
      //   退出圈子
      isCircle: false,
      msisdn: "",
      infos: {
        tel: overTime.get("circleUserPhone"),
        ringName: "圈子彩铃",
        price: 0
      },
      circleInfo: {},
      circleId: "",
      show: false,
      ringList: [],
      hasOpenBiz: null,
      currentRing: null
    };
  },
  methods: {
    openCircle() {
      const saName = this.circleInfo.sa || "";
        this.show = true;
      // if (!!saName && saName.indexOf("广东") > -1) {
      //   api
      //     .circleRemindOpenBiz({
      //       circleId: this.circleId,
      //       memberIds: [this.infos.tel],
      //       allFlag: 0
      //     })
      //     .then(res => {
      //       const { data } = res;
      //       if (data.code === this.$common.SUCCESS) {
      //         this.$dialog.alert({
      //           title: "提示",
      //           message: "短信已下发，请注意查收!"
      //         });
      //       } else {
      //         this.$notify({
      //           type: "danger",
      //           message: data.msg,
      //           duration: 2000
      //         });
      //       }
      //     })
      //     .finally(_ => {
      //       this.$toast.clear();
      //     });

      //   // .then(_ => {
      //   //   this.$toast.loading({
      //   //     mask: true,
      //   //     message: "请稍候...",
      //   //     duration: 0
      //   //   });
      //   // })
      //   // .catch(_ => {});
      // } else {
      
      // }
      /*api.openBiz({
                    msisdn: overTime.get("circleUserPhone")
                }).then(res => {
                    this.loading = false;
                    let datas = res.data;
                    if(datas.code == "000000"){
                        this.$toast.success('开通成功');
                        overTime.set("hasOpenBiz", true);
                        this.updateData();
                    }else {
                        this.$toast.fail(datas.msg)
                    }
                })*/
    },
    loginOpenBusiness(form) {
      this.loading = true;
      api
        .openBiz({
          msisdn: this.infos.tel,
          smsVcode: form.sms
        })
        .then(res => {
          const { data } = res;
          if (data.code === this.$common.SUCCESS) {
            this.$notify({
              message: "开通成功",
              duration: 2000,
              background: "#07c160"
            });
            overTime.set("hasOpenBiz", true);
            this.updateData();
          } else {
            this.$notify({
              type: "danger",
              message: data.msg,
              duration: 2000
            });
          }
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    updateData() {
      this.hasOpenBiz = overTime.get("hasOpenBiz");
      this.currentRing = overTime.get("currentRing");
    },
    getMonthPrice() {
      api.getCirclePrice({ type: 2, msisdn: this.infos.tel }).then(res => {
        const { data } = res;
        if (data.code === this.$common.SUCCESS) {
          const priceList = data.data || [];
          if (priceList.length > 0) {
            this.infos.price = priceList[0].price || 10;
          }
        }
      });
    },
    circleDetail() {
      this.$toast.loading({
        mask: true,
        message: "请稍候...",
        duration: 0
      });
      api
        .circleInfo({ msisdn: this.infos.tel })
        .then(res => {
          const { data } = res;
          this.circleInfo = data.data;
          this.circleId = data.data.circleId;
        })
        .finally(_ => {
          this.$toast.clear();
        });
    },
    // 删除圈子
    endCircleBusiness(form) {
      this.$toast.loading({
        mask: true,
        message: "请稍候...",
        duration: 0
      });
      console.log(form);
      api
        .removeCircle({
          // msisdn: this.msisdn,
          // smsVcode: form.sms
          circleId: this.circleId,
          smsVcode: form.sms
        })
        .then(res => {
          const { data } = res;
          if (data.code === this.$common.SUCCESS) {
            overTime.remove("circleUserPhone");
            overTime.remove("saName");
            overTime.remove("role");
            this.$notify({
              message: "删除成功",
              duration: 2000,
              background: "#07c160",
              onClose: _ => {
                this.$router.push("/login");
              }
            });
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
    }
  },
  mounted() {
    this.updateData();
    this.getMonthPrice();
    this.circleDetail();
    this.msisdn = overTime.get("circleUserPhone");
    api
      .ringList({
        msisdn: this.infos.tel
      })
      .then(res => {
        if (res.data.code == "000001") {
          overTime.remove("circleUserPhone");
          overTime.remove("hasOpenBiz");
          overTime.remove("hasJoinedNoCircle");
          this.$router.push("/login");
          return;
        }
        let datas = res.data.data;
        if (datas.rings.length == 0) {
          this.noDatas = true;
        }
        for (let item of datas.rings) {
          switch (item.status) {
            case -2:
              item.color = "#F74734";
              break;
            case -1:
              item.color = "#F74734";
              break;
            case 0:
              item.color = "#A4A4A4";
              break;
            case 1:
              item.color = "#458FCE";
              break;
            case 2:
              item.color = "#31C27C";
              break;
            case 5:
              item.color = "#A4A4A4";
              break;
          }
        }
        this.ringList = datas.rings;
      });
  }
};
</script>

<style scoped lang="scss">
#list {
  padding-bottom: 52px;

  .top-container {
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: 0 20px;

    .top-box {
      text-align: center;
      padding: 26px 0 15px;
      font-size: 15px;
      color: #333333;
      line-height: 30px;
      border-bottom: 1px solid #ebebeb;

      img {
        width: 46px;
        height: 46px;
      }

      .text-one {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
      }

      .click-open {
        width: 90px;
        margin: 0 auto;
        text-align: center;
        color: #458fce;
      }
    }

    .center-box {
      padding: 10px 0;

      .info-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: 40px;
        color: #333;
        font-size: 15px;

        .left-box {
          color: #a4a4a4;
        }
      }
    }
  }

  .case-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
    margin: 10px 0 0 20px;
  }

  .list-container {
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: 0 20px;
    font-size: 15px;

    .list-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      line-height: 50px;
      border-bottom: 1px solid #ebebeb;

      &:last-child {
        border-bottom: 0;
      }
    }
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
    display: flex;
    justify-content: space-around;
    .bottom-btn {
      width: 140px;
      height: 37px;
      line-height: 35px;
      font-size: 15px;
    }
  }

  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .list-container {
      margin-bottom: 15px;
    }
    .footer {
      height: 65px;
    }
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .list-container {
      margin-bottom: 15px;
    }
    .footer {
      height: 65px;
    }
  }

  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .list-container {
      margin-bottom: 15px;
    }
    .footer {
      height: 65px;
    }
  }
  #bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    /deep/ .van-button__text {
      color: #ff0101;
    }
  }
}
</style>
