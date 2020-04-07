<template>
  <div>
    <ul class="tit">
      <li>
        <img src="../assets/images/home02.jpg" alt />
        <div>
          <p>总订单</p>
          <span>102，400</span>
        </div>
      </li>
      <li>
        <img src="../assets/images/home01.jpg" alt />
        <div>
          <p>总订单</p>
          <span>102，400</span>
        </div>
      </li>
      <li>
        <img src="../assets/images/home03.jpg" alt />
        <div>
          <p>总订单</p>
          <span>102，400</span>
        </div>
      </li>
      <li>
        <img src="../assets/images/home04.jpg" alt />
        <div>
          <p>总订单</p>
          <span>102，400</span>
        </div>
      </li>
    </ul>

    <div class="counter_content">
      <div id="myChart" ref="myChart" :style="{width: '1000px', height: '600px'}"></div>
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      xdata: [],
      ydata: [],
      ydata2: []
    };
  },
  mounted() {
    // 用户统计
    this.axios.get("counter.php?a=users&field=date").then(res => {
      // console.log(res);
      res.data.data.forEach(v => {
        this.xdata.push(v.ctime);
        this.ydata.push(parseInt(v.num));
      });
      this.myChart();
    });
    // 商品统计
    this.axios.get("counter.php?a=goods&field=date").then(res => {
      res.data.data.forEach(v => {
        // this.xdata.push(v.ctime);
        this.ydata2.push(parseInt(v.num));
      });
      this.myChart();
    });
  },
  methods: {
    myChart() {
      var myChart = echarts.init(this.$refs.myChart);
      myChart.setOption({
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["管理员人数", "商品数量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xdata
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "管理员人数",
            type: "line",
            // stack: "总量",
            data: this.ydata
          },
          {
            name: "商品数量",
            type: "line",
            // stack: "总量",
            data: this.ydata2
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.el-date-editor {
  margin: 0 10px;
}
.tit {
  display: flex;
  justify-content: space-around;
}
.tit > li {
  width: 15%;
  background: #fff;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
}
.tit > li img {
  width: 25%;
}
.tit > li span {
  font-weight: bold;
}
.tit > li p {
  line-height: 25px;
  text-align: center;
}
</style>

