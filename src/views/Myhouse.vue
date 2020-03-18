<template>
  <div class="myhouse">
    <div class="head">
      <div style="display: flex;justify-content: space-between">
        <div style="display:flex">
          <img style="border-radius:50%" src="../assets/images/1.jpg" alt width="60" height="60" />

          <div style="margin-left:10px;color:#fff">
            <router-link to='/'><h2>登录/注册</h2></router-link>
            <p>可以与经纪人发起聊天</p>
          </div>
        </div>
        <span>
          <Icon type="md-settings" size='20' color='#fff'/>
        </span>
      </div>
      <div class="bom">
        <div v-for="item in headlist" :key="item.id">
          <p style="margin-bottom:10px">{{item.num}}</p>
          <p>
            <Icon :type="item.ico" />
            <span style="margin-left:10px">{{item.name}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="options">
      <div v-for="item in optionlist" :key="item.name">
        <div>
          <Icon :type="item.ico" />
          <span style="margin-left:10px">{{item.name}}</span>
        </div>
        <span>></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //头部数据
      headlist: [
        { name: "钱包", num: 0, ico: "md-browsers" },
        { name: "优惠", num: 0, ico: "md-browsers" },
        { name: "积分", num: 0, ico: "md-browsers" }
      ],
      //选项数据
      optionlist: [
        { ico: "md-settings", name: "我的积分" },
        { ico: "", name: "我的订阅" },
        { ico: "", name: "微聊联系人" },
        { ico: "", name: "房贷计算器" },
        { ico: "", name: "我的房子" },
        { ico: "", name: "我的看房记录" },
        { ico: "", name: "我的问答" },
        { ico: "", name: "设置" },
        { ico: "", name: "意见反馈" }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.myhouse {
  background: #f4f4f4;
  .head {
    width: 100%;
    height: 200px;
    background: #5ecbfc;
    padding: 20px 10px;
    margin-bottom: 10px;
    .bom {
      color: #fff;
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
      div {
        padding: 10px 30px;
        text-align: center;
      }
      div:not(:last-child) {
        border-right: 1px solid #fff;
      }
    }
  }
  .options > div {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    background: #fff;
  }
  .options > div:nth-child(4),
  .options > div:nth-child(6),
  .options > div:nth-child(8) {
    margin-top: 10px;
  }
}
</style>