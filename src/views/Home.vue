<template>
    <div id="home">
        <div class="top"></div>
        <div style="padding: 0 10px;">
            <div class="introduction bg-white">
                <div v-for="(item,index) in introduction" :key="index" class="item-box">
                    <div class="title">
                        <img :src="item.icon">
                        {{item.title}}
                    </div>
                    <div class="context">{{item.context}}</div>
                </div>
            </div>
            <div class="case-title">精选铃音展示</div>
            <div class="video-wrap bg-white">
                <van-tabs v-model="activeName" color="#2577E8" title-active-color="#2577E8" :border="false">
                    <van-tab v-for="(item,index) in videoList" :key="index" :title="item.type" :name="item.type">
                        <div style="margin-top: 10px">
                            <div class="video-box" v-for="(it,idx) in item.rings" :key="idx" @click="showVideo(index,idx)">
                                <img class="cover" :src="$config.fileUrl+it.cover">
                                <img class="play-btn position-center" src="../assets/images/btn_bofang.png">
                                <div class="name">{{it.name}}</div>
                                <span class="duration">{{it.duration}}</span>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <!--        帮助 按钮-->
        <drag-help @click.native="$router.push('/qa')"/>
        <bottom-nav />
    </div>
</template>

<script>
    import api from '../api/basic'
    import DragHelp from "../components/DragHelp";
    import {Storage} from '../api/common';
    import BottomNav from "../components/BottomNav";
    const overTime = new Storage();
    export default {
        name: 'home',
        components: {BottomNav, DragHelp},
        data() {
            return {
                // 数据
                introduction: [
                    {
                        title: "业务介绍",
                        icon: require("../assets/images/pic_yewu.png"),
                        context: "圈子视频彩铃是服务于特定圈子客户，由被叫客户付费，在通话接通前为主叫客户提供一段定制化视频媒体的业务。"
                    }
                ],
                videoList: [],
                activeName: '最新上架'
            }
        },
        methods: {
            showVideo(index, idx) {
                this.$router.push({
                    name: 'videoShow',
                    params: {
                        videoSrc: this.videoList[index].rings[idx].ring
                    }
                })
            },
        },
        mounted() {
            // overTime.set('userId','handong',100000);
            api.sampleRings().then(res => {
                if (res.data.code == "000000") {
                    this.videoList = res.data.data
                    // console.log(res.data.data)
                    
                } else {
                    this.$toast(res.data.msg)
                }
            })
            
        }
    }
</script>
<style scoped lang="scss">
    #home {
        min-height: 100vh;
        background-color: #EFEFF4;

        .header{
            width: 100%;
            height: 30px;
            line-height: 30px;
            background-color: #000;
            text-align: right;
            padding-right: 10px;
        }
        .top {
            width: 100%;
            height: 140px;
            background: url("../assets/images/home-top.png") no-repeat;
            background-size: cover;
        }
        .login-link{
            color: #FEFEFE;
        }
        .introduction {
            width: 100%;
            height: auto;
            padding: 0 20px;
            border-radius: 8px;
            margin-top: -46px;

            .item-box {
                padding: 20px 0;

                .title {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    color: #333333;

                    img {
                        width: 14px;
                        height: 14px;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                }

                .context {
                    font-size: 15px;
                    padding-top: 11px;
                    line-height: 30px;
                }

                &:last-child {
                    border-top: 1px solid #EBEBEB;
                }
            }
        }

        .case-title {
            font-size: 16px;
            line-height: 32px;
            margin: 10px 0 4px 0;
            color: #333333;
        }

        .video-wrap {
            border-radius: 8px 8px 0 0;
            padding: 0 15px 15px;
            margin-bottom: 50px;

            .video-box {
                position: relative;
                display: inline-block;
                width: 50%;
                height: auto;
                color: #333333;
                font-size: 15px;
                margin: 5px 0 10px;
                padding: 0 5px;

                .cover {
                    width: 100%;
                    height: 109px;
                    border-radius: 5px;
                    overflow: hidden;
                }

                .play-btn {
                    width: 31px;
                    height: 31px;
                }

                .name {
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .duration {
                    position: absolute;
                    right: 10px;
                    top: 5px;
                    color: #fff;
                    font-size: 12px;
                }
            }

            /deep/ .van-tabs__wrap {
                border-bottom: 1px solid #EBEBEB;
            }
        }

        .rz-dialog {
            /deep/ .van-dialog__header {
                padding-top: 17px;
            }

            .close-icon {
                position: absolute;
                top: 20px;
                right: 24px;
            }
        }

        .sms-btn {
            border-color: #fff;
            color: #458FCE;
        }

        .van-button::before {
            background-color: #fff;
            border-color: #fff;
        }

        .comfirm-btn {
            display: block;
            width: 140px;
            height: 37px;
            margin: 24px auto 10px;
            line-height: 35px;
            background-color: #458FCE;
            border-color: #458FCE;
        }

        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            height: 50px;
            background-color: #fff;
            text-align: center;
            padding-top: 5px;

            .fixed-button {
                width: 140px;
                height: 37px;
                line-height: 35px;
                color: #fff;
                background-color: #458FCE;
                border-color: #458FCE;
                /*box-shadow:0px 6px 10px rgba(99,183,255,0.31);*/
            }
        }

        @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
            .video-wrap {
                margin-bottom: 60px;
            }
            .footer {
                height: 65px;
            }
        }

        @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
            .video-wrap {
                margin-bottom: 60px;
            }
            .footer {
                height: 65px;
            }
        }

        @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
            .video-wrap {
                margin-bottom: 60px;
            }
            .footer {
                height: 65px;
            }
        }
    }

</style>
