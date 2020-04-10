<template>
    <div id="service">
        <header>用户号码：{{userPhone}}</header>
        <van-field v-model="form.name" required clearable label="彩铃名称" placeholder="请输入彩铃名称"/>
        <van-cell class="van-cell--required diy-cell">
            <span style="padding-right: 35px;display: inline-block">上传视频</span>
            <van-uploader :after-read="uploadVideo" accept="video/mp4" v-model="form.fileList" :max-count="1"
                          class="upload-video">
                <div class="upload-wrap">
                    <img src="../../assets/images/icon_shangchuan.png">
                    <span>添加视频文件</span>
                </div>
            </van-uploader>
        </van-cell>
        <van-cell>
            <span class="tips">要求：上传视频小于40M，时长最少为7秒，最多不超过48秒，格式为mp4或mov。</span>
        </van-cell>
<!--        <van-field style="margin: 10px 0;font-size: 15px" v-model="form.des" type="textarea"-->
<!--                   placeholder="请输入视频中的描述（音频文字内容）" rows="5"/>-->
        <van-cell>
            <div class="select-box" :class="index==currentIndex?'active':''" v-for="(item,index) in option" :key="index"
                 :data-index="index"
                 @click="choose($event)">{{item.name}}
            </div>
        </van-cell>
        <div class="footer">
            <div class="wrap" v-if="!hasJoinedNoCircle">
                <div class="left-box">
                    <div>包月费用:<b>￥{{monthMoney}}</b></div>
                    <span>(以话费形式收取)</span>
                </div>
                <van-button type="info" round class="bottom-btn" @click="openService">业务开通</van-button>
            </div>
            <div class="wrap" v-else>
                <van-button type="info" round class="bottom-btn" @click="openService" style="margin: 0 auto">确定
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../api/basic';
    import {Storage} from '../../api/common';

    const overTime = new Storage();

    export default {
        name: "ServiceRing",
        data() {
            return {
                userPhone: overTime.get("circleUserPhone"),
                hasJoinedNoCircle: false,   //是否开通业务
                currentIndex: 0,
                form: {
                    name: "",
                    des: "",
                    fileList: []
                },
                monthMoney: "",
                option: [{
                    id: "0",
                    name: "作为唯一播放"
                }, {
                    id: "1",
                    name: "加入当前播放列表"
                }]
            }
        },
        methods: {
            uploadVideo(file) {
                console.log(file)
            },
            choose(e) {
                let index = e.target.dataset.index;
                this.currentIndex = index;
            },
            openService() {
                if (this.form.name != "" && this.form.fileList.length != 0) {
                    this.$toast.loading({
                        mask: true,
                        message: '请稍候...',
                        duration: 0
                    });
                    if (!overTime.get("hasJoinedNoCircle")) {
                        //去开通圈子
                        api.addCircle({
                            msisdn: this.userPhone,
                            circleType: 2,
                            price: this.monthMoney,
                            linkUUID: overTime.get("linkUUID") || ""
                        }).then(response => {
                            if (response.data.code == "000000") {
                                overTime.set("hasJoinedNoCircle", true);
                                this.hasJoinedNoCircle = true;
                                this.uploadRing()
                            } else {
                                this.$toast.clear();
                                this.$toast(response.data.msg);
                            }
                        }).catch(res => {
                            this.$toast.clear();
                            this.$toast(response.data.msg);
                        })
                    } else {
                        this.uploadRing()
                    }
                } else {
                    if (this.form.name == "") {
                        this.$toast("请输入彩铃名称")
                    } else if (this.form.fileList.length == 0) {
                        this.$toast("请上传视频文件")
                    }
                }
            },
            uploadRing() {
                api.uploadRing({
                    msisdn: this.userPhone,
                    ringName: this.form.name,
                    ringContent: "",
                    setType: this.currentIndex,
                    file: this.form.fileList[0].file
                }).then(res => {
                    this.$toast.clear();
                    let datas = res.data;
                    if (datas.code == "000000") {
                        if (this.hasJoinedNoCircle) {
                            this.$toast.success('上传成功');
                            setTimeout(() => {
                                this.$router.push("/upload-list")
                            }, 2000)
                        } else {
                            this.$router.push({
                                name: 'success',
                                params: {
                                    where: this.hasJoinedNoCircle ? 'hm' : 'sr'
                                }
                            })
                        }
                    } else {
                        this.$toast.fail(datas.msg)
                    }
                }).catch(_ => this.$toast.clear());
            }
        },
        mounted() {
            if (overTime.get("hasJoinedNoCircle") != undefined) {
                this.hasJoinedNoCircle = overTime.get("hasJoinedNoCircle")
            }

            api.getCirclePrice({type: 2, msisdn: this.userPhone}).then(res => {
                const { data } = res
                if(data.code === this.$common.SUCCESS) {
                    const priceList = data.data || []
                    if(priceList.length > 0) {
                        this.monthMoney = priceList[0].price || 10
                    }
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    #service {
        header {
            font-weight: 500;
            color: #333333;
            margin: 18px 0 6px 19px;
        }

        .diy-cell {
            /deep/ .van-cell__value {
                display: flex;
                align-items: center;
            }

            &::before {
                top: 52px;
            }
        }

        .upload-wrap {
            width: 103px;
            height: 103px;
            background-color: #F8F8F8;
            text-align: center;
            padding-top: 28px;
            border-radius: 12px;
            margin-bottom: 7px;

            img {
                width: 32px;
                height: 26px;
            }

            span {
                display: block;
                font-size: 12px;
                color: #A4A4A4;
            }
        }

        .tips {
            font-size: 12px;
            color: #757575;
        }

        .select-box {
            display: inline-block;
            background-color: #F5F5F5;
            margin-right: 14px;
            border-radius: 17px;
            font-size: 15px;
            color: #333333;
            padding: 0 15px;
            line-height: 30px;
            border: 1px solid #F5F5F5;
        }

        .active {
            color: #458FCE;
            background-color: rgba(69, 143, 206, 0.1);
            border-color: #458FCE;
        }

        .upload-video {
            /deep/ .van-uploader__preview {
                margin: 0;
            }

            /deep/ .van-uploader__preview-image {
                width: 103px;
                height: 103px;
            }

            /deep/ .van-icon-warning-o {
                font-size: 40px !important;

                &:before {
                    content: "\F0CE";
                }
            }

            /deep/ .van-uploader__preview-delete {
                background-color: unset;
                color: rgba(0, 0, 0, .34);
                font-size: 18px;
                top: 0;
                bottom: unset;
            }

            /deep/ .van-icon-delete {
                &:before {
                    content: "\F031";
                }
            }
        }

        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            right: 0;
            height: 55px;
            background-color: #fff;
            padding: 0 15px;

            .wrap {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .left-box {
                    div {
                        font-size: 15px;
                        color: #333333;
                    }

                    span {
                        color: #A4A4A4;
                        font-size: 12px;
                    }

                    b {
                        color: #458FCE;
                        font-size: 19px;
                    }
                }
            }

            .bottom-btn {
                width: 140px;
                height: 37px;
                line-height: 35px;
                font-size: 15px;
                background-color: #458FCE;
            }
        }

        @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
            .footer {
                height: 72px;
                padding: 0 15px 17px;
            }
        }

        @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
            .footer {
                height: 72px;
                padding: 0 15px 17px;
            }
        }

        @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
            .footer {
                height: 72px;
                padding: 0 15px 17px;
            }
        }

    }
</style>
