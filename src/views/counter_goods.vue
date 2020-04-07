<template>
  <div>
    <span>时间范围</span>
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
    <div class="counter_content">
      <div id="myChart" :style="{width: '1000px', height: '600px'}"></div>
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  name: "FuncFormsBase",
  data() {
    return {
      xdata: [],
      ydata: []
    };
  },
  mounted() {
    this.axios.get("counter.php?a=goods&field=date").then(res => {
      res.data.data.forEach(v => {
        this.xdata.push(v.ctime);
        this.ydata.push(parseInt(v.num));
      });
      this.drawLine();
    });
  },
  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "商品数量"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xdata
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          // {
          //   name: "邮件营销",
          //   type: "line",
          //   stack: "总量",
          //   areaStyle: {},
          //   data: [120, 132, 101, 134, 90, 230, 210]
          // },
          // {
          //   name: "联盟广告",
          //   type: "line",
          //   stack: "总量",
          //   areaStyle: {},
          //   data: [220, 182, 191, 234, 290, 330, 310]
          // },
          // {
          //   name: "视频广告",
          //   type: "line",
          //   stack: "总量",
          //   areaStyle: {},
          //   data: [150, 232, 201, 154, 190, 330, 410]
          // },
          // {
          //   name: "直接访问",
          //   type: "line",
          //   stack: "总量",
          //   areaStyle: {},
          //   data: [320, 332, 301, 334, 390, 330, 320]
          // },
          {
            name: "商品数量",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: this.ydata
          }
        ]
      });
    }
  }
};
</script>
<style>
.el-date-editor {
  margin: 0 10px;
}
</style>

