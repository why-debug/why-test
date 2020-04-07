<template>
  <el-row :gutter="20" style="width: 100%">
    <h1>新增商品</h1>
    <el-col :span="6" :offset="2">
      <div class="goods">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="奢侈品" value="奢侈品"></el-option>
              <el-option label="实惠品" value="实惠品"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品特色">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="新品上市" name="type"></el-checkbox>
              <el-checkbox label="第二杯半价" name="type"></el-checkbox>
              <el-checkbox label="主打产品" name="type"></el-checkbox>
              <el-checkbox label="火爆产品" name="type"></el-checkbox>
              <el-checkbox label="祖传手艺" name="type"></el-checkbox>
              <el-checkbox label="源自四川" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action="http://work.08321.org/sell/goods.php?a=uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="form.prom">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="食品规格">
            <el-radio-group v-model="form.spec">
              <el-radio label="单规格"></el-radio>
              <el-radio label="多规格"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="包装费">
            <el-input-number v-model="num1" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number
              v-model="num2"
              @change="handleChange"
              :min="1"
              :max="100"
              :step="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
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
    return {
      form: {
        name: "",
        region: "实惠品",
        date1: "",
        date2: "",
        delivery: false,
        type: ["新品上市", "火爆产品"],
        prom: "促销",
        spec: "单规格",
        desc: ""
      },
      imgUrl: "",
      dialogVisible: false,
      num1: 0,
      num2: 20
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      var data = {
        goodsname: this.form.name,
        goodscategory: this.form.region,
        goodsfeature: this.form.type.join('，'),
        imgUrl: this.imgUrl,
        isPromotion: this.form.prom,
        standard: this.form.spec,
        packprice: this.num1,
        price: this.num2,
        goodsdesc: this.form.desc
      };
      // console.log(this.form.type);
      
      this.axios.post("goods.php?a=add", qs.stringify(data)).then(res => {
        if (res.data.code == 0) {
          this.$router.push("/Index/goods_list");
          this.$message({
            message: "恭喜你，添加商品成功！",
            type: "success"
          });
        } else {
          this.$message.error("错了哦，重新添加一下吧！" + res.data.msg);
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(value) {
      console.log(value);
    },
    handleAvatarSuccess(res) {
      console.log(res);
      this.imgUrl = "http://work.08321.org" + res.data;
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
<style >
.goods .el-col {
  width: 100%;
}
.goods .el-form {
  width: 600px;
  margin-top: 30px;
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