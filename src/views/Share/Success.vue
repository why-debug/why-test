<template>
  <div id="success">
    <van-icon name="checked" size="65px" color="#458FCE" />
    <div class="title">加入成功</div>
    <div>请重新登录</div>
    <div class="bottom-box">
      <van-button type="info" class="btn" plain @click="exit">知道了</van-button>
      <div>如果有其他问题，请联系圈子管理员或客户经理</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  methods: {
    //   退出
    exit() {
      this.$router.push("/login");
      localStorage.clear();
    }
  }
};
</script>

<style scoped lang="scss">
#success {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff !important;
  text-align: center;
  font-size: 15px;
  padding-top: 65px;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin: 24px 0 10px;
  }

  .bottom-box {
    position: absolute;
    bottom: 35px;
    left: 0;
    right: 0;
    font-size: 12px;
    color: #a4a4a4;

    .btn {
      width: 150px;
      height: 35px;
      line-height: 35px;
      border-color: #458fce;
      color: #458fce;
      margin-bottom: 90px;
      font-size: 15px;
    }
  }
}
</style>
