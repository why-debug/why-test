<template>
  <div class="goods">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.goodsname }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品特性">
              <span>{{ props.row.goodsfeature }}</span>
            </el-form-item>
            <el-form-item label="是否促销">
              <span>{{ props.row.isPromotion }}</span>
            </el-form-item>
            <el-form-item label="食品规格">
              <span>{{ props.row.standard }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.goodscategory }}</span>
            </el-form-item>
            <el-form-item label="包装费">
              <span>{{ props.row.packprice }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.imgUrl" alt width="100px" />
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsdesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="goodsname"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="props">
          <img :src="props.row.imgUrl" alt width="100px" />
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="goodsdesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit( scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pageNum"
      :current-page="page"
      :page-sizes="[5, 10, 20, 40,100]"
      layout="total,sizes,prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
// import qs from "qs";

export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageNum: 10,
      total: 20
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageNum = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    handleDelete(id) {
      // console.log(id);
      this.axios.get(`goods.php?a=delete&id=${id}`).then(res => {
        if (res.data.code == 0) {
          this.$router.push("/Index/admin_list");
          this.$message({
            message: "恭喜你，删除账户成功！",
            type: "success"
          });
        } else {
          this.$message.error("错了哦，重新试一下吧！" + res.data.msg);
        }
      });
    },
    // handleEdit(id) {
    //  console.log(id);
    // this.axios.get(`goods.php?a=readOne&id=${id}`).then(res => {
    //   console.log(res);
    // });
    // var data = {
    //   goodsname: res.data.data.name,
    //   goodscategory: res.data.data.region,
    //   goodsfeature: res.data.data.type,
    //   imgUrl: res.data.data.imgUrl,
    //   isPromotion: res.data.data.prom,
    //   standard: res.data.data.spec,
    //   packprice: res.data.data.num1,
    //   price: res.data.data.num2,
    //   goodsdesc: res.data.data.desc
    // };
    // this.axios.post("goods.php?a=edit", qs.stringify(data)).then(res => {
    //   console.log(res);
    // });
    // },
    getData() {
      this.axios
        .get(
          `goods.php?a=list&currentPage= 
            ${this.page}
            &pageSize=${this.pageNum}`
        )
        .then(res => {
          this.tableData = res.data.data;
          // console.log(this.tableData);

          this.total = parseInt(res.data.total);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #759cd3;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.goods {
  height: 100%;
  background: #fff;
}
.el-pagination {
  margin-top: 30px;
  margin-left: 10px;
  margin-bottom: 100px;
}
</style>