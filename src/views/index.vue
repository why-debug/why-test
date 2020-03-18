<template>
  <div>
    <router-view />
    <div class="nav_btm">
      <div @click="links(item.paths,index)" v-for="(item,index) in list" :key="item.img" :class="checked==index?'gre':''">
        <Icon :type="item.img" size="18" />
        <p>{{ item.txt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { img: "md-home", txt: "首页", paths: "/index/Home" },
        { img: "ios-chatboxes-outline", txt: "微聊", paths: "/index/talk" },
        { img: "ios-star-outline", txt: "推荐", paths: "/index/track" },
        { img: "md-person", txt: "我的", paths: "/index/Myhouse" }
      ],
      checked:0,
    };
  },
  methods: {
    links(paths,index) {
      this.$router.push(paths);
      this.checked=index
    }
  },
  mounted(){
      

  }
};
</script>

<style lang="less" scoped>
.nav_btm {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #f2f2f2;
  background: #fff;
  align-items: center;
  div {
    text-align: center;
    p {
      font-size: 12px;
    }
  }
  .gre{
      color: #00bc5b;
  }
}
</style>