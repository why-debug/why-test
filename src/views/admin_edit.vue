<template>
  <el-row :gutter="20" style="width: 100%">
    <h1>修改账号</h1>
    <div id="Cform">
      <el-col :span="6" :offset="2">
        <div class="grid-content bg-purple">
          <el-form :model="formInline" class="demo-form-inline" label-width="80px">
            <el-form-item label="账号">
              <el-input type="text" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="用户组">
              <el-select v-model="formInline.region" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="Log">修改</el-button>
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
        id: "",
        region: ""
      }
    };
  },
  mounted() {
    // console.log(this.$route.params.id);

    this.formInline.id = this.$route.params.id;
    this.axios.get(`users.php?a=readOne&id=${this.formInline.id}`).then(res => {
      // console.log(res);
      this.formInline.name = res.data.data.account;
      this.formInline.region = res.data.data.userGroup;
    });
  },
  methods: {
    Log() {
      var data = {
        account: this.formInline.name,
        userGroup: this.formInline.region,
        id: this.formInline.id
      };
      this.axios.post("users.php?a=edit", qs.stringify(data)).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$router.push("/Index/admin_list");
          this.$message({
            message: "恭喜你，修改账户成功！",
            type: "success"
          });
        } else {
          this.$message.error("错了哦，重新试一下吧！" + res.data.msg);
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