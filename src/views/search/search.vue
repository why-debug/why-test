<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      @search="onSearch"
      @cancel="onCancel"
      :left-icon="img"
      show-action
      style="padding: 20px 20px 0 20px;"
      placeholder="输入圈子名称或手机号"
    />
    <van-divider />
    <van-loading v-if="Loading" color="#1989fa" vertical type="spinner">加载中...</van-loading>
    <div v-if="dataList.length>0">
      <ul
        v-for="(item, index) in dataList"
        :key="index"
        @click="$router.push({path: '/share', query: {id: item.circleId}})"
      >
        <li class="data_list">
          <div class="list_left">
            <img src="../../assets/images/detail-icon.png" width="40" />
          </div>
          <div class="list_right">
            <p>{{item.circleName}}</p>
            <p>{{item.ctime}}</p>
          </div>
          <!-- <span>{{item.phone}}</span> -->
        </li>
      </ul>
    </div>
    <h3 v-else-if="shows" style="text-align: center;color:#f00">没有相关圈子，请重新输入!</h3>
  </div>
</template>
<script>
import Vue from "vue";
import { Search, Toast, Divider, Loading } from "vant";
import api from "@/api/basic";
import { Storage } from "../../api/common";
const overTime = new Storage();

Vue.use(Loading);
Vue.use(Search);
Vue.use(Toast);
Vue.use(Divider);
export default {
  data() {
    return {
      value: "",
      // msisdn: 13568880671,
      // circleId: "d6d3059d-5087-4937-93f6-725737c5a7d5",
      page: 1,
      total: 10,
      shows: false,
      Loading:false,
      dataList: [],
      searchData: [],
      img: require("@/assets/images/search.png")
    };
  },
  computed: {
    ctime() {
      for (const item of this.dataList) {
        var d = new Date(item.ctime);
        var sa =
          d.getFullYear() +
          "年" +
          (d.getMonth() + 1) +
          "月" +
          d.getDate() +
          "日";
        item.ctime = sa;
      }
    }
  },
  mounted() {
    // localStorage.setItem("said", this.circleId);
  },
  methods: {
    onSearch(val) {
      if (val.length == 11) {
        var num = Number(val);
      }
      this.Loading=true
      api
        .circleList({
          msisdn: typeof num === "number" ? num : "",
          circleName: typeof num === "number" ? "" : val,
          page: this.page,
          // limit: this.total,
          saId: overTime.get("said") || ""
        })
        .then(res => {
          const { data } = res;
          if (data.code === this.$common.SUCCESS) {
            this.dataList = data.data;
            this.total = data.count;
            this.ctime;
            this.Loading=false
            if (this.dataList.length <= 0 && this.value != "") {
              this.shows = true;
            } else {
              this.shows = false;
            }
          } else {
            this.$notify({
              type: "danger",
              message: data.msg,
              duration: 2000
            });
          }
        });

      //   var search = this.search;
      //   if (val) {
      //     this.searchData = this.dataList.filter(function(product) {
      //       // 每一项数据
      //       return Object.keys(product).some(function(key) {
      //         // 每一项数据的参数名
      //         return (
      //           String(product[key])
      //             // toLowerCase() 方法用于把字符串转换为小写。
      //             .toLowerCase()
      //             // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
      //             .indexOf(val) > -1
      //         );
      //       });
      //     });

      //     console.log(this.searchData);
      //   }
    },
    onCancel() {
      this.dataList = [];
      this.shows = false;
    }
  }
};
</script>

<style lang="scss" >
@import "../../assets/css/reset.scss";
body {
  background: #fff;
}
.data_list {
  display: flex;
  justify-content: space-between;
  .list_left {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .list_right {
    width: 80%;
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
    p:first-child {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    p:last-child {
      color: #a4a4a4;
    }
  }
}
</style>