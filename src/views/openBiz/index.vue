<template>
  <div id="open">
    <header class="head">
      <p>业务开通</p>
    </header>
    <div class="conent">
      <img src="../../assets/images/sms-logo.png" alt width="120" />
      <h2 style="margin:10px 0 50px">业务开通</h2>
      <div style="position: relative;">
        <van-field v-model="phone" readonly />
        <van-field
          style="padding-right:90px"
          v-model="vcode"
          clearable
          placeholder="请输入图形验证码"
          type="number"
        ></van-field>
        <img class="vcode" @click="replace" :src="imgCode" />
      </div>
      <div v-show="true" style="font-size:12px;margin-top:60px">
        <p>资费介绍：</p>
        <p>
          视频彩铃连续包月：首次月
          <span style="color:#E40077">1元/月</span>，第三月起
          <span style="color:#E40077">6元/月</span>
        </p>
      </div>

      <div>
        <van-button v-show="true" style="width:100%;margin-top:150px" round color="#E40077">确认开通</van-button>
        <p
          v-show="false"
          style="display: flex;justify-content: space-between;align-items:center;margin:270px 0px 0px"
        >
          <span>资费：6元/月</span>
          <van-button style="width:50%;" round color="#E40077" @click="toOpen">确认开通</van-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: 15882600182,
      vcode: "",
      imgCode: "http://211.137.107.18:8888/page/cm/image.jsp"
    };
  },
  methods: {
    // 点击更新图形验证码
    replace() {
      const num = Math.ceil(Math.random() * 10); // 生成一个随机数（防止缓存）
      this.imgCode = "http://211.137.107.18:8888/page/cm/image.jsp?" + num;
    },
    toOpen(){

    }
  }
};
</script>

<style lang="scss" scoped>
#open {
  background: #fff;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.head {
  width: 100%;
  padding: 30px 0 20px;
  text-align: center;
  background: #e40077;
  p {
    color: #fff;
    font-size: 20px;
    margin: 0;
    justify-content: space-between;
  }
}
.conent {
  padding: 30px 42px 20px;
}
.van-cell {
  padding: 20px 0px 10px;
}
.van-cell::after {
  left: 0;
  z-index: 99;
}
.vcode {
  width: 80px;
  height: 30px;
  position: absolute;
  right: 0;
  bottom: 5px;
}
</style>