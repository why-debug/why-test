<template>
  <el-row :gutter="20" style="width: 100%">
    <h1>添加账号</h1>
    <div id="Cform">
      <el-col :span="6" :offset="2">
        <div class="grid-content bg-purple">
          <el-form
            :model="formInline"
            class="demo-form-inline"
            label-width="80px"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item label="账号" prop="name">
              <el-input type="text" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="formInline.pwd" show-password></el-input>
            </el-form-item>

            <el-form-item label="用户组" prop="region">
              <el-select v-model="formInline.region" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="Log('ruleForm')">添加</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </div>
  </el-row>
</template>
<script>
// import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      formInline: {
        name: "",
        pwd: "",
        region: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择用户组", trigger: "blur" }]
      }
    };
  },
  methods: {
    Log(formName) {
      var data = {
        account: this.formInline.name,
        password: this.formInline.pwd,
        userGroup: this.formInline.region
      };
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // location.href = "#/Index";
          // that.$router.push("/Index");
         this.axios
            .post("users.php?a=add", qs.stringify(data))
            .then(res => {
              if (res.data.code == 0) {
                that.$router.push("/Index/admin_list");
                this.$message({
                  message: "恭喜你，添加账户成功！",
                  type: "success"
                });
              } else {
                 this.$message.error('错了哦，重新试一下吧！'+res.data.msg);
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
#Cform {
  height: 370px;
  background: #fff;
  padding-top: 30px;
}

/* #Cform input {
  background: #fff;
} */

.el-main > div > h1 {
  line-height: 72px;
  background: #fff;
  font-size: 22px;
  border-bottom: 1px solid #ccc;
  padding-left: 30px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #ccc;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-select {
  width: 100%;
}
</style>