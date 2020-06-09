<template>
  <van-popup v-model="isDialog" class="open-popup" @open="open" @close="close">
    <div class="title">{{title}}</div>
    <van-field v-model="phone" readonly />
    <van-field
      v-show="CodeMode==0"
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

    <van-field
      v-show="CodeMode==1"
      v-model="openInfo.sms"
      clearable
      placeholder="请输入图形验证码"
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
    <p style="color:#2577E8FF;margin-left: 16px;margin-bottom:60px" @click="CodeMode==0?CodeMode=1:CodeMode=0">切换验证方式</p>
    <van-checkbox style="margin-left: 16px;" v-model="checked" label-disabled>
      <span :class="isChecked?'why':''">阅读并同意</span>
      <span style="color:#2577E8FF" @click="$router.push('/ua')">《服务协议》</span>
    </van-checkbox>
    <!-- <p>{{checked}}</p> -->
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
  name: "LogoutModal",
  props: ["isModal", "title", "btnText", "codeMode", "phone"],
  data() {
    return {
      // 切换验证方式
      CodeMode: 0,
      checked: false,
      loginLoading: false,
      errorMessage: "",
      isDialog: false,
      openInfo: {
        sms: ""
      },
      smsBtn: {
        text: "获取验证码",
        disabled: false,
        timer: null,
        count: ""
      },
      isPhoneError: false,
      isSmsError: false,
      isChecked: false
    };
  },
  watch: {
    isModal(newVal) {
      this.isDialog = newVal;
    },
    codeMode(n) {
      this.CodeMode = n;
    }
  },
  created() {
    this.$store.commit("newcodeMode", this.codeMode);
    if (!!this.saName && this.saName.indexOf("广东") > -1) {
      this.codeMode = 1;
    }
  },
  methods: {
    open() {},
    close() {
      this.$emit("update:isModal", false);
    },
    getCode() {
      let returnMsg = validateMobilePhone(this.phone);
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
            msisdn: this.phone
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
      if (!!!this.phone) {
        this.isPhoneError = true;
        isResult = false;
      }

      if (!!!this.openInfo.sms) {
        this.isSmsError = true;
        isResult = false;
      }
      if (this.checked == false) {
        this.isChecked = true;
        isResult = false;
      } else {
        this.isChecked = false;
      }
      console.log(this.isChecked);

      if (!isResult) return false;

      this.isPhoneError = false;
      this.isSmsError = false;

      this.$emit("refreshClick", this.openInfo);
      this.close();
    }
  }
};
</script>

<style lang="scss">
.open-popup {
  width: 350px;
  border-radius: 5px;
  font-size: 16px;
  .title {
    line-height: 50px;
    text-align: center;
  }
  .why {
    color: red !important;
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