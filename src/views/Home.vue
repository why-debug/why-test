<template>
  <div class="home">
    <div class="head">
      <Select v-model="model2" size="small" style="width:60px;color:#fff">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <i-Input placeholder="挑好房，上源码房产app" style="width: 200px;">
        <Icon type="ios-search-outline" slot="prefix" />
      </i-Input>
      <Icon type="ios-pin-outline" size="25" color="#fff" />
    </div>
    <div class="slid">
      <Carousel autoplay :autoplay-speed="speed" :radius-dot="radius" loop>
        <CarouselItem>
          <img src="../assets/images/1.jpg" alt />
        </CarouselItem>
        <CarouselItem>
          <img src="../assets/images/2.jpg" alt />
        </CarouselItem>
        <CarouselItem>
          <img src="../assets/images/3.jpg" alt />
        </CarouselItem>
      </Carousel>
    </div>
    <div class="nav">
      <div v-for="item in nav" :key="item.name">
        <p :style="{background:item.bg}">
          <Icon :type="item.icon" size="35" />
        </p>
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="house_GBA">
      <h3 style="color:#00bc5b">
        房产全百科
        <span style="font-size:12px;color:#b7b7b7">专业的买房攻略</span>
      </h3>
      <div class="txt">
        <div v-for="item in house" :key="item.name">
          <p>
            <Icon :type="item.img" size="40" />
          </p>
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="like">
      <h3>猜你喜欢</h3>
      <div class="like_list" @click="like(likes[i])" v-for="(item,i) in likes" :key="i">
        <img :src="`http://localhost:80${item.imgs}`" alt />
        <div class="right">
          <div>
            <h2 style="font-size:18px">{{item.name}}</h2>
            <p>{{item.area}} {{item.range}}</p>
            <p>{{item.type}} {{item.point}}平</p>
          </div>
          <span style="color:red;font-size:16px;font-weight:bold">{{item.price}}/平</span>
        </div>
      </div>
    </div>
  </div>
</template>
<Icon type="" />
<script>
import { gethouseList } from "../api/api";
export default {
  data() {
    return {
      //下拉框数据
      cityList: [
        {
          value: "成都",
          label: "成都"
        },
        {
          value: "重庆",
          label: "重庆"
        },
        {
          value: "杭州",
          label: "杭州"
        },
        {
          value: "上海",
          label: "上海"
        },
        {
          value: "广州",
          label: "广州"
        },
        {
          value: "北京",
          label: "北京"
        }
      ],
      model2: "",
      //轮播数据
      value2: 0,
      speed: 3000,
      radius: true,
      //导航栏数据
      nav: [
        { name: "新房", icon: "ios-home", bg: "#ff5a5f" },
        { name: "二手房", icon: "ios-home-outline", bg: "#a782b9" },
        { name: "租房", icon: "md-briefcase", bg: "#f6d149" },
        { name: "商铺写字楼", icon: "ios-home", bg: "#f9db9f" },
        { name: "卖房", icon: "ios-chatboxes-outline", bg: "#ffa650" },
        { name: "海外房产", icon: "ios-plane-outline", bg: "#57aff8" },
        { name: "小区房价", icon: "ios-home", bg: "#00e4dd" },
        { name: "问答", icon: "ios-refresh-circle-outline", bg: "#d29bcb" }
      ],
      //房产百科数据
      house: [
        { name: "我要贷款", img: "logo-skype" },
        { name: "房贷计算", img: "ios-calculator-outline" },
        { name: "知识", img: "ios-school" },
        { name: "扫一扫", img: "md-expand" }
      ],
      likes: []
    };
  },
  created() {
    gethouseList().then(res => {
      this.likes = res.data;
    });
  },
  methods: {
    like(item) {
      this.$store.commit("gethistory", item);
    }
  },
  mounted() {}
};
</script>

<style lang="less" >
@gre: #00bc5b;
.home {
  background: #f5f5f9;
  .head {
    width: 100%;
    height: 60px;
    background: @gre;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .ivu-input {
      border-radius: 50px;
    }
    .ivu-select-selection {
      background: @gre;
      border: none;
    }
  }
  .slid {
    img {
      width: 100%;
      height: 200px;
    }
  }
  .nav {
    padding-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    background: #fff;
    div {
      width: 21%;
      height: 80px;
      text-align: center;
      p {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #000;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
  }
  .house_GBA {
    width: 100%;
    margin-top: 10px;
    background: #fff;
    padding: 10px 20px;
    .txt {
      display: flex;
      justify-content: space-around;
      div {
        width: 21%;
        text-align: center;
      }
    }
  }
  .like {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    .like_list {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      img {
        width: 30%;
        height: 120px;
      }
      .right {
        width: 66%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>