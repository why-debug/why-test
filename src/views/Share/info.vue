<template>
  <div id="share">
    <div class="panel">
      <div class="detail">
        <div class="top-box">
          <img src="../../assets/images/detail-icon.png" />
          <h2 style="margin-top:40px;color:#2577E8FF;font-weight:normal">欢迎您加入</h2>
          <div class="cicle-name">{{infos.circleName}}</div>
        </div>
        <van-field class="ipu" :border="false" v-model="name" label="我的姓名" placeholder="请输入姓名" />
        <van-field
          class="ipu"
          :border="false"
          v-model="tel"
          type="tel"
          label="我的电话"
          placeholder="请输入电话"
        />
        <button class="btn">提交</button>
      </div>
      <!-- <div class="ring">
        <div class="cell">
          <div class="ring-name">{{infos.latestRingName || " "}}</div>
          <div class="status" v-if="infos.latestRingName">最近设置</div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Field, Button } from "vant";
import api from "@/api/basic";
Vue.use(Field);
Vue.use(Button);
export default {
  data() {
    return {
      infos: {},
      name: "",
      tel: "",
    };
  },
  mounted() {
    this.circleDetail();
  },
  methods: {
    circleDetail() {
      api.circleInfo({ circleId: this.circleId }).then(res => {
        const { data } = res;
        this.infos = data.data;
        console.log(this.infos);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
    text-align: center;
    .ipu {
      padding: 20px 0;
    }
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
  .btn {
    background: #2577e8ff;
    margin: 40px 0 20px 0;
    color: #fff;
    border: none;
    width: 50%;
    height: 40px;
    border-radius: 20px;
  }
  //   .ring {
  //     position: relative;
  //     padding: 0 20px 40px 20px;

  //     &::after {
  //       position: absolute;
  //       content: "";
  //       top: -1px;
  //       left: 20px;
  //       right: 20px;
  //       height: 1px;
  //       background-color: #f5f5f5;
  //     }

  //     .cell {
  //       position: relative;
  //       display: flex;
  //       justify-content: space-between;
  //       align-items: center;
  //       padding: 20px 0;
  //       color: #458fce;
  //     }
  //   }
}
</style>