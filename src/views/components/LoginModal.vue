<template>
  <van-popup v-model="isDialog" class="open-popup" @open="open" @close="close">
    <div class="title">{{title}}</div>
    <van-field
      v-model="openInfo.phone"
      placeholder="请输入手机号"
      type="tel"
      clearable
      maxlength="11"
      :error-message="errorMessage"
      @clear="errorMessage=''"
      :error="isPhoneError"
    />
    <van-field
      v-model="openInfo.sms"
      clearable
      placeholder="请输入短信验证码"
      type="number"
      :error="isSmsError"
    >
      <van-button
        slot="button"
        size="small"
        class="sms-btn"
        :disabled="smsBtn.disabled"
        @click="getCode"
      >{{smsBtn.text}}</van-button>
    </van-field>
    <div class="flex-row-between bottom-div">
      <div>
        <slot />
      </div>
      <van-button
        type="info"
        round
        class="comfirm-btn"
        :loading="loginLoading"
        @click="submitPhone"
      >{{btnText}}</van-button>
    </div>
  </van-popup>
</template>

<script>
import api from "@/api/basic";
import { validateMobilePhone } from "@/api/common";

export default {
  name: "LoginModal",
  props: ["isModal", "title", "btnText"],
  data() {
    return {
      loginLoading: false,
      errorMessage: "",
      isDialog: false,
      openInfo: {
        phone: "",
        sms: ""
      },
      smsBtn: {
        text: "获取验证码",
        disabled: false,
        timer: null,
        count: ""
      },
      isPhoneError: false,
      isSmsError: false
    };
  },
  mounted() {
    
  },
  watch: {
    isModal(newVal) {
      this.isDialog = newVal;
    }
  },
  methods: {
    open() {},
    close() {
      this.$emit("update:isModal", false);
    },
    getCode() {
      let returnMsg = validateMobilePhone(this.openInfo.phone);
      if (returnMsg == "") {
        this.errorMessage = "";
        // 开始倒计时
        const TIME_COUNT = 60;
        if (!this.smsBtn.timer) {
          this.smsBtn.count = TIME_COUNT;
          this.smsBtn.disabled = true;
          this.smsBtn.text = this.smsBtn.count + "s后重发";
          this.smsBtn.timer = setInterval(() => {
            if (this.smsBtn.count > 0 && this.smsBtn.count <= TIME_COUNT) {
              this.smsBtn.count--;
              this.smsBtn.text = this.smsBtn.count + "s后重发";
            } else {
              this.smsBtn.text = "获取验证码";
              clearInterval(this.smsBtn.timer);
              this.smsBtn.timer = null;
              this.smsBtn.disabled = false;
            }
          }, 1000);
        }
        // 发送请求
        api
          .sendCode({
            msisdn: this.openInfo.phone
          })
          .then(res => {
            this.$toast(res.data.msg);
          });
      } else {
        this.errorMessage = returnMsg;
      }
    },
    submitPhone() {
      let isResult = true;
      if (!!!this.openInfo.phone) {
        this.isPhoneError = true;
        isResult = false;
      }

      if (!!!this.openInfo.sms) {
        this.isSmsError = true;
        isResult = false;
      }

      if (!isResult) return false;

      this.isPhoneError = false;
      this.isSmsError = false;

      this.$emit("refreshClick", this.openInfo);
      this.close();
    }
  }
};
</script>

<style scoped lang="scss">
.open-popup {
  width: 350px;
  border-radius: 5px;
  font-size: 16px;
  .title {
    line-height: 50px;
    text-align: center;
  }

  .sms-btn {
    border: 0;
    border-radius: 0;
    color: #458fce;
  }
  .bottom-div {
    height: 70px;
    padding: 0 20px;
    font-size: 15px;
    align-items: center;

    .comfirm-btn {
      width: 140px;
      height: 37px;
      line-height: 37px;
      background-color: #458fce;
    }
  }

  /deep/ .van-field__error-message {
    position: absolute;
    /*bottom: -33px;*/
    left: 0;
  }
  /deep/ .van-cell__value {
    overflow: unset;
  }

  /deep/ .van-cell {
    margin-bottom: 10px;
    overflow: unset;
  }

  /deep/ .van-cell:not(:last-child)::after {
    left: 0;
  }
}
</style>