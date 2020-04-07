<template>
  <el-row>
    <h1>管理员信息</h1>
    <el-col :span="24">
      <ul class="info">
        <li>管理员ID：{{user.id}}</li>
        <li>账号：{{user.account}}</li>
        <li>用户组：{{user.userGroup}}</li>
        <li>创建时间：{{user.ctime}}</li>
      </ul>

      <div class="headimg">
        <span>管理员头像：</span>
        <el-upload
          class="avatar-uploader"
          action="http://work.08321.org/sell/goods.php?a=uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="user.imgUrl" :src="user.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      user: {
        id: "",
        account: "",
        userGroup: "",
        ctime: "",
        imgUrl: ""
      }
    };
  },
  mounted() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user);
    this.user = user;
    this.user.imgUrl = user.imgUrl;
  },
  methods: {
    handleAvatarSuccess(res) {
      this.user.imgUrl = "http://work.08321.org" + res.data;
      this.axios
        .post(
          "users.php?a=chgImg",
          qs.stringify({ id: this.user.id, imgUrl: this.user.imgUrl })
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "上传头像成功，重新登陆就能看到啦！",
              type: "success"
            });
            this.$router.push("/");
          }
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style>
.el-row {
  background: #fff;
}
.el-row .el-col > .headimg {
  height: 200px;
  line-height: 200px;
  font-size: 22px;
  padding-left: 30px;
  display: flex;
}
.el-row .info > li {
  width: 100%;
  height: 84px;
  font-size: 22px;
  line-height: 84px;
  border-bottom: 1px solid #ccc;
  padding-left: 30px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>