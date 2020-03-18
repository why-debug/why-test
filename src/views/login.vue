<template>
  <div class="login">
    <div style="text-align: center;margin-bottom:30px">
      <img src="../assets/images/ym.jpg" alt width="50%" />
    </div>
    <form>
      <p>
        <Icon type="md-person" color="#00bc5b" size="16" />
        <input type="text" v-model="phone" prop="name" placeholder="请输入手机号" />
      </p>
      <p>
        <label for="pwd" prop="pwd">
          <Icon type="ios-lock-outline" color="#00bc5b" size="16" />
        </label>
        <input id="pwd" v-model="pwd" type="password" placeholder="请输入密码" />
      </p>
      <Button
        @click="login('warning','success')"
        type="success"
        long
        style="height:40px;margin-top:20px"
      >登 陆</Button>
    </form>
    <div class="btm">
      <router-link style="color:#00bc5b" to="/register">手机快速注册</router-link>
      <router-link style="color:#00bc5b" to="/register">忘记密码?</router-link>
    </div>
  </div>
</template>

<script>
import { getlogin } from "../api/api";
export default {
  data() {
    return {
      phone: "",
      pwd: ""
    };
  },
  methods: {
    login(warning, success) {
      if (this.thone == "" || this.pwd == "") {
        this.$Message[warning]({
          background: true,
          content: "请输入用户名和密码"
        });
      } else {
        getlogin()
          .post("/login.php", `acc=${this.phone}&pwd=${this.pwd}`)
          .then(res => {
            if (res.data == "ok") {
              this.$Message[success]({
                background: true,
                content: "恭喜你，登陆成功！"
              });
              this.$router.push("/index/Home");
            } else {
              this.$Message[warning]({
                background: true,
                content: "账号或密码错误！"
              });
            }
          });
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.login {
  padding: 20px;
  p {
    border-bottom: 1px solid #f2f2f2;
    input {
      border: none;
      outline: none;
      margin-left: 20%;
      padding: 10px 0;
    }
  }
  .btm {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
