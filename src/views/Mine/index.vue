<template>
    <div id="mine">
        <div class="top">
            <div class="phone-box">
                <div class="manager-box">
                    <van-icon name="manager" class="icon" color="#ffffff" size="23"/>
                </div>
                <div style="margin-left: 15px">{{phone}}</div>
            </div>
        </div>
        <div class="content">
            <!--<van-cell title="业务详情" icon="paid" is-link @click="toDetail"/>
            <van-cell title="视频管理" icon="video-o" is-link style="margin-top: 15px" @click="$router.push('/manage-video')"/>
            <van-cell title="" />-->
            <div class="item" @click="toDetail">
                <img src="@/assets/images/business.png">
                <div>业务详情</div>
            </div>
            <!--<div class="item" @click="$router.push('/manage-video')">
                <img src="@/assets/images/video-manage.png">
                <div>视频管理</div>
            </div>-->
        </div>
        <bottom-nav/>

          <van-tabbar v-model="active" active-color="#2577E8" :border="false" route>
        <van-tabbar-item icon="wap-home" to="/home">
            <span>首页</span>
            <img slot="icon" slot-scope="props" :src="props.active ? homeIcon.active : homeIcon.inactive">
        </van-tabbar-item>
        <!--<van-tabbar-item v-if="isShow">
            <img class="center-icon" src="../assets/images/center-icon.png" @click="uploadVideoRing">
        </van-tabbar-item>-->
        <van-tabbar-item v-if="isShow">
            <div class="tab-btn" @click="uploadVideoRing">
                <img src="@/assets/images/menu-btn.png">
                <span>办理业务</span>
            </div>
        </van-tabbar-item>
        <van-tabbar-item name="mine" icon="user-o" @click="mine" :class="!!!isMe ? 'disable' : ''">
            <span>我的</span>
            <img slot="icon" slot-scope="props" :src="$route.name == 'mine' ? userIcon.active : userIcon.inactive">
        </van-tabbar-item>
    </van-tabbar>
    </div>
</template>

<script>
    import {Storage} from '../../api/common';
    import BottomNav from "../../components/BottomNav";

    const overTime = new Storage();
    export default {
        name: "mine",
        components: {BottomNav},
        data() {
            return {
                phone: overTime.get("circleUserPhone")
            }
        },
        methods:{
            toDetail(){
                const role = overTime.get("role")
                if(role == "1") {
                    this.$router.push("/circle-list")
                } else if(role == "2") {
                    this.$router.push("/manage-list")
                } else if(role == "3") {
                    this.$router.push("/circle-detail")
                } else {
                    if (!overTime.get("hasJoinedNoCircle")) {
                        this.$router.push("/nob")
                    } else {
                        this.$router.push("/upload-list")
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #mine {
        .top {
            width: 100%;
            height: 143px;
            background-color: #2C84FF;

            .phone-box {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 20px;
                color: #fff;
                padding: 40px 25px;

                .manager-box {
                    position: relative;
                    width: 43px;
                    height: 43px;
                    background-color: #64b7ff;
                    border-radius: 50%;
                    border: 2px solid #ffffff;

                    .icon {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                        width: 23px;
                        height: 23px;
                    }
                }
            }
        }
        .content{
            position: relative;
            margin: 11px;
            background-color: #fff;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            padding: 20px 10px;
            display: flex;
            justify-content: space-between;

            &::after {
                /*content: "";*/
                position: absolute;
                top: 10px;
                bottom: 10px;
                left: 50%;
                width: 1px;
                background-color: #EBEBEB;
            }

            > .item {
                /*width: 50%;*/
                width: 100%;
                flex: 0 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: column nowrap;
                font-weight: bold;

                img {
                    height: 30px;
                    margin-bottom: 8px;
                }
            }
        }
    }
</style>
