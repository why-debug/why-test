<template>
  <div class="listcontent container">
    <h1>账号列表</h1>
    <el-table :data="tableData" style="width: 100%" ref="multipleTable">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户组" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.userGroup }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="Btn">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 40,100]"
        :page-size="pageNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="page"
      ></el-pagination>
      <p>
        <el-button type="danger" @click="del">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        <el-button
          type="danger"
          @click="toggleSelection([tableData[1],tableData[3]])"
        >选中第二、第四行</el-button>
      </p>
    </div>
  </div>
</template>
<script>
// import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageNum: 5,
      total: 20
    };
  },
  created() {
    this.getData();
    
  },
  methods: {
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    del() {
      this.$refs.multipleTable.selection.forEach(v => {
        console.log(v.id);
      });
    },
    handleEdit(id) {
      // console.log(id);
      this.$router.push('/index/admin_edit/'+id)
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageNum=val
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      this.axios
        .get(
          `users.php?a=list&currentPage= 
            ${this.page}
            &pageSize=${this.pageNum}`
        )
        .then(res => {
          this.tableData = res.data.data;
          this.total = parseInt(res.data.total);
          
        });
    }
  }
};
</script>
<style >
.el-main > div > h1 {
  line-height: 72px;
  background: #fff;
  font-size: 22px;
  border-bottom: 1px solid #ccc;
  padding-left: 30px;
}
#Btn {
  background: #fff;
  height: 152px;
  padding-top: 28px;
  padding-left: 26px;
}
#Btn > p {
  margin-top: 28px;
}
.el-table th > .cell {
  padding-left: 14px;
}
</style>