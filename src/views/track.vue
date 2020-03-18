<template>
  <div>
    <p class="tit">我的足迹</p>
    <div class="history_list" v-for="item in getHistory" :key="item.name">
      <img :src="`http://localhost:80${item.imgs}`" alt />
      <div class="right">
        <div>
          <h2 style="font-size:18px">{{item.name}}</h2>
          <p>{{item.area}} {{item.range}}</p>
          <p>{{item.type}} {{item.point}}平</p>
        </div>
        <span style="color:red;font-size:16px;font-weight:bold">{{item.price}}/平</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getHistory() {
      let arr = [];
      arr = this.$store.state.historydata;
      return [...new Set(arr)].reverse();
    }
  }
};
</script>

<style lang="less" scoped>
.history_list {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  margin: 20px;
  img {
    width: 30%;
    height: 120px;
  }
  .right {
    width: 66%;
    display: flex;
    justify-content: space-between;
  }
}
.tit {
  text-align: center;
  height: 30px;
  background: #0f0;
  font-size: 20px;
  color: #fff;
}
</style>