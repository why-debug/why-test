<template>
  <div id="orde">
    <div class="tit">
      <span>订单号</span>
      <el-input v-model="input" placeholder="订单号"></el-input>
      <span>收货人</span>
      <el-input v-model="input" placeholder="收货人"></el-input>
      <span>手机号</span>
      <el-input v-model="input" placeholder="手机号"></el-input>
      <span>订单状态</span>
      <el-input v-model="input" placeholder="订单状态"></el-input>

      <div class="tit_time">
        <span>选择时间</span>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
        <el-button type="primary" size="medium">查询</el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="order" label="订单号" width="150"></el-table-column>
      <el-table-column prop="date" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="name" label="收货人" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="time" label="送达时间" width="120"></el-table-column>
      <el-table-column prop="remark" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="money" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="state" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="total,prev, pager, next, jumper"
      :total="1000"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  // methods: {
  //   handleClick(row) {
  //     console.log(row);
  //   }
  // },

  data() {
    return {
      tableData: [
        {
          order: "14214314",
          date: "2016-05-02",
          phone: "18181358988",
          name: "王小虎",
          time: "19:32:00",
          money: "108",
          remark: "微辣",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "已受理"
        },
        {
          order: "14214314",
          date: "2016-05-04",
          phone: "18181358988",
          time: "19:32:00",
          name: "王小虎",
          money: "108",
          remark: "微辣",
          address: "上海市普陀区金沙江路 1517 弄",
          state: "已受理"
        },
        {
          order: "14214314",
          date: "2016-05-01",
          phone: "18181358988",
          time: "19:32:00",
          name: "王小虎",
          money: "108",
          remark: "微辣",
          address: "上海市普陀区金沙江路 1519 弄",
          state: "已受理"
        },
        {
          order: "14214314",
          date: "2016-05-03",
          phone: "18181358988",
          time: "19:32:00",
          name: "王小虎",
          money: "108",
          remark: "微辣",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "已受理"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ""
    };
  }
};
</script>
<style scoped>
#orde {
  padding-top: 26px;
  background: #fff;
  height: 100%;
}
#orde .tit {
  margin-left: 15px;
}
#orde .tit .tit_time {
  margin-top: 26px;
}
#orde .tit span {
  margin: 0 15px;
}
#orde .tit .el-input {
  width: 16%;
}
#orde .el-table {
  margin-top: 75px;
}
</style>