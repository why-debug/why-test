<template>
  <div style="background-color: #ffffff;">
    <h2 style="text-align: center;margin-bottom:200px">服务协议</h2>
    <van-button
      class="close"
      round
      type="info"
      @click="$router.push({ path: '/upload-list', query:{close:true}})"
    >关闭</van-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.close {
  width: 140px;
  height: 37px;
  line-height: 35px;
  font-size: 15px;
}
</style>