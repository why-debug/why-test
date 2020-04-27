<template>
  <div id="share">
    <div class="panel">
      <div class="detail">
        <circle-info :item-data="infos">
          <div class="top-box">
            <img src="../../assets/images/detail-icon.png" />
            <div class="cicle-name">{{infos.circleName}}</div>
          </div>
        </circle-info>
      </div>
      <div class="ring">
        <div class="cell">
          <div class="ring-name">{{infos.latestRingName || " "}}</div>
          <div class="status" v-if="infos.latestRingName">最近设置</div>
        </div>
      </div>
      <div class="bottom">
        <van-button round color="#458FCE" size="normal" @click="show = true">加入该圈子</van-button>
      </div>
    </div>

    <login-modal :is-modal.sync="show" title="确认加入" btn-text="加入圈子" @refreshClick="loginShare" />
  </div>
</template>

<script>
import CircleInfo from "./../components/CircleInfo";
import LoginModal from "../components/LoginModal";
import api from "@/api/basic";

export default {
  name: "index",
  components: {
    CircleInfo,
    LoginModal
  },
  data() {
    return {
      show: false,
      circleId: "",
      infos: {}
    };
  },
  mounted() {
    this.circleId = this.$route.query.id;
    console.log(this.circleId);
    this.circleDetail();
  },
  methods: {
    circleDetail() {
      api.circleInfo({ circleId: this.circleId }).then(res => {
        const { data } = res;
        this.infos = data.data;
        console.log(this.infos);
      });
    },
    loginShare(form) {
      this.$toast.loading({
        mask: true,
        message: "请稍候...",
        duration: 0
      });
      api
        .circleShareJoin({
          msisdn: form.phone,
          smsVcode: form.sms,
          circleId: this.circleId
        })
        .then(res => {
          const { data } = res;
          if (data.code === this.$common.SUCCESS) {
            this.$notify({
              message: "加入成功",
              duration: 2000,
              background: "#07c160",
              onClose: _ => {
                this.$router.push({ name: "shareSuccess" });
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
  }
};
</script>

<style scoped lang="scss">
#share {
  position: relative;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 26px;

  .panel {
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
  }

  .detail {
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: 0 5px;

    .top-box {
      position: relative;
      text-align: center;
      padding: 56px 0 36px;
      font-size: 15px;
      color: #333333;
      border-bottom: 1px solid #ebebeb;

      &::after {
        position: absolute;
        content: "";
        bottom: -10px;
        left: -20px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: #f5f5f5;
      }

      &::before {
        position: absolute;
        content: "";
        bottom: -10px;
        right: -20px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: #f5f5f5;
      }

      .cicle-name {
        padding-top: 20px;
        font-size: 18px;
        font-weight: 600;
      }

      img {
        width: 46px;
        height: 46px;
      }
    }

    /deep/ .center-box {
      padding: 10px 15px;
    }
  }

  .ring {
    position: relative;
    padding: 0 20px 40px 20px;

    &::after {
      position: absolute;
      content: "";
      top: -1px;
      left: 20px;
      right: 20px;
      height: 1px;
      background-color: #f5f5f5;
    }

    .cell {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      color: #458fce;
    }
  }

  .bottom {
    padding: 40px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>