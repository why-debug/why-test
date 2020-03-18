<template>
  <div class="reg">
    <p>
      <input type="text" v-model="phone" placeholder="请输入手机号" />
    </p>
    <p>
      <input type="password" v-model="pwd" placeholder="请输入密码" />
    </p>
    <p class="code">
      <input type="text" v-model="code" placeholder="请输入验证码" />
      <span v-show="show" @click="getcode('warning')">获取验证码</span>
      <span v-show="!show" class="count">{{count}} s</span>
    </p>
    <Radio @change="radio" v-model="single" class="protocol">
      我已同意
      <span>
        <a href>《用户服务协议》</a>及
        <a href>《隐私权政策》</a>
      </span>
    </Radio>
    <Button
      @click="register('success','error')"
      type="success"
      long
      style="height:40px;margin:20px 0"
    >注 册</Button>
    <router-link to="/" style="color:#00bc5b">已有帐号</router-link>
  </div>
</template>

<script>
import { getregister } from "../api/api";
import { getcode } from "../api/api";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
      single: false,
      show: true,
      count: "",
      timer: null,
      code: "",
      codes: ""
    };
  },
  created() {
    console.log(this.single);
  },
  methods: {
    register(success, error) {
      if (
        (this.code == this.codes) &
        (this.code != "") &
        (this.single == true)
      ) {
        getregister()
          .post("/reg.php", `acc=${this.phone}&pwd=${this.pwd}`)
          .then(res => {
            if (res.status == 200) {
              this.$Message[success]({
                background: true,
                content: "恭喜你，注册成功！"
              });
              this.$router.push("/");
              this.codes = "";
            }
          });
      } else {
        this.$Message[error]({
          background: true,
          content: "注册失败"
        });
      }
    },
    radio() {
      this.single = !this.single;
    },
    getcode(warning) {
      const times = 60;
      getcode().then(res => {
        this.$Message[warning]({
          content: "你的验证码为" + res.data,
          duration: 10,
          closable: true
        });
        this.codes = res.data;
      });
      if (!this.timer) {
        this.count = times;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= times) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.reg {
  padding: 20px;
  p {
    border-bottom: 1px solid #f2f2f2;
    input {
      border: none;
      outline: none;
      padding: 10px 0;
    }
  }
  .code {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .protocol {
    margin-top: 10px;
    span {
      color: #00bc5b;
      a {
        color: #00bc5b;
      }
    }
  }
}
</style>