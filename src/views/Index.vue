<template>
  <div class="index">
    <el-container>
      <el-aside width="275px">
        <!--外卖商家中心LOGO-->
        <div>
          <p>
            <el-avatar :size="60">
              <i class="el-icon-dish-1"></i>
            </el-avatar>
          </p>
          <p>外卖商家中心</p>
        </div>
        <el-menu
          :default-active="this.$route.path"
          background-color="#304156"
          text-color="#F4F5F6"
          active-text-color="#3D94EE"
          router
        >
          <!--后台首页-->
          <el-menu-item index="/Index/home">
            <i class="el-icon-house"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>

          <!--订单管理-->
          <el-menu-item index="/index/orde_manage">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>

          <!--商品管理-->
          <el-submenu index="/index/goods">
            <template slot="title">
              <i class="el-icon-box"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/index/goods_add">新增商品</el-menu-item>
            <el-menu-item index="/index/goods_list">商品列表</el-menu-item>
          </el-submenu>

          <!--店铺管理-->
          <el-menu-item index="/Index">
            <i class="el-icon-takeaway-box"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>

          <!--帐号管理-->
          <el-submenu index="/index/admin">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item index="/index/admin_list">帐号列表</el-menu-item>
            <el-menu-item index="/index/admin_add">添加帐号</el-menu-item>
            <el-menu-item index="/index/admin_changepwd">修改密码</el-menu-item>
          </el-submenu>

          <!--销售统计-->
          <el-submenu index="/index/counter">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item index="/index/counter_goods">商品统计</el-menu-item>
            <el-menu-item index="/index/counter_order">订单统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="height:84px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown>
            <span class="el-dropdown-link">
              欢迎你，
              <span>{{username}}</span>
              <el-avatar :src="headimg">未设置</el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/Index/admin_info">管理员信息</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/Exit">退出系统</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!--右边主体，显示二级路由组件-->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  data() {
    return { headimg:'', username: "111" };
  },
  created() {
    var id = sessionStorage.getItem("id");
    var token = sessionStorage.getItem("token");
    var account = sessionStorage.getItem("account");
    this.name = account;
    this.axios
      .get('users.php?a=chklogin&id='+id+'&token='+token)
      .then(res => {
        if (res.data.code !== 0) {
          this.$message.error("没登陆就想进来？洗洗睡吧，孩子！");
          this.$router.push("/");
        }
      });

      // 读取sessionStorage中的数据显示到页面
      var user=JSON.parse(sessionStorage.getItem('user'));
      this.username=user.account;
      this.headimg=user.imgUrl;
  }
};
</script>

<style>
.el-main > div > h1 {
  line-height: 72px;
  background: #fff;
  font-size: 22px;
  border-bottom: 1px solid #ccc;
  padding-left: 30px;
}
.index .logo img {
  display: block;
  width: 200px;
}
.index,
.index > .el-container {
  height: 100%;
}
.index .el-aside {
  background: #304156;
}
.index .el-menu {
  border-right: 0;
}
/* 外卖商家中心 */
.el-aside > div:first-child {
  font-size: 18px;
  color: #fff;
  padding: 10px 0;
  display: flex;
}
.el-aside > div > p:first-child {
  margin-left: 25px;
  margin-right: 10px;
  text-align: center;
}
.el-aside .el-avatar {
  background: #1296db;
}
.el-aside > div > p:first-child i {
  font-size: 35px;
  margin-top: 10px;
  color: #304156;
}
.el-aside > div > p:last-child {
  line-height: 60px;
}

.index ul > li span {
  font-size: 24px/2em 微软雅黑;
}

.el-header {
  background-color: #fff;
  line-height: 84px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.index .el-avatar {
  cursor: pointer;
  vertical-align: middle;
  margin-left: 10px;
  margin-right: 10px;
}
.el-main .el-row {
  background: #fff;
  margin: 0px !important;
}
.el-main {
  background: #f0f2f5;
}
/* 销售统计 */
.counter_content {
  margin-top: 44px;
  background: #fff;
  padding: 20px;
}
/* 头像默认值 */
.el-header .el-avatar{
  font-size: 12px
}
</style>