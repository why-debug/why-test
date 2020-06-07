<template>
  <el-row :gutter="20" style="width: 100%">
    <h1>修改密码</h1>
    <el-col :span="6" :offset="2">
      <div class="grid-content bg-purple">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          id="Cpwd"
        >
          <el-form-item label="原密码" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import qs from "qs";
export default {
  data() {
    var pwd = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入原密码"));
      } else {
        callback();
      }
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error("请输入数字值"));
      //   } else {
      //     if (value < 18) {
      //       callback(new Error("必须年满18岁"));
      //     } else {
      //       callback();
      //     }
      //   }
      // }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        pwd: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        pwd: [{ validator: pwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var data = {
        oldPassword: this.ruleForm.pwd,
        newPassword: this.ruleForm.pass,
        id: sessionStorage.getItem("id"),
        token: sessionStorage.getItem("token")
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("users.php?a=chgpwd", qs.stringify(data))
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: "恭喜你，修改密码成功，请重新登陆！",
                  type: "success"
                });
                sessionStorage.clear();
                this.$router.push("/");
              } else {
                this.$message.error(res.data.msg);
                return false;
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
#Cpwd {
  /* background: #fff; */
  padding-top: 30px;
}
.el-row {
  background: #fff;
  margin: 0px !important;
}
/* .el-form .el-form-item{
  width: ;
} */
</style>