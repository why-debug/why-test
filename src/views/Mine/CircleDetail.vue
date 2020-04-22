<template>
    <div id="list">
        <div class="top-container">
            <circle-info :item-data="infos">
                <div class="top-box">
                    <img src="../../assets/images/detail-icon.png">
                    <div class="cicle-name">{{infos.circleName || ""}}</div>
                </div>
            </circle-info>
        </div>
        <div class="case-title">我的信息</div>
        <van-cell-group>
            <div class="flex-row-between my-info">
                <div>
                    <span>{{msisdn}}</span>
                    <!--<span style="margin-left: 20px">无铃音</span>-->
                </div>
                <van-button plain type="info" size="small" round @click="openBusiness" v-if="memberItem.freezeStatus == '1'">开通业务</van-button>
            </div>
        </van-cell-group>
        <div class="case-title">视频彩铃</div>
        <div class="list-container">
            <div class="list-box" style="color: #458FCE" v-if="currentRing">
                <div class="left-box">{{currentRing}}</div>
                <div class="right-box">当前播放</div>
            </div>
            <div style="text-align: center;color: #ccc;height: 100px;line-height: 100px" v-else>暂无铃音</div>
        </div>
        <!--<div class="footer">
            <van-button type="info" round class="bottom-btn" @click="$router.push('/service-ring')">上传视频彩铃</van-button>
        </div>-->
        <!--        开通弹窗-->
        <login-modal :is-modal.sync="show" title="开通确认" btn-text="确认开通" @refreshClick="loginOpenBusiness">
            <span>资费{{infos.price}}元/月</span>
        </login-modal>

        <!--        退出圈子弹窗-->
        <logout-modal :is-modal.sync="isCircle" :phone="msisdn" title="退出圈子" btn-text="确认" @refreshClick="endCircleBusiness" />

        <div id="bottom">
            <van-button round color="#ffffff" size="small" @click="isCircle = true">　　退出该圈子　　</van-button>
        </div>
    </div>
</template>

<script>
    import CircleInfo from "../components/CircleInfo"
    import api from '@/api/basic'
    import {Storage} from '@/api/common'
    import LoginModal from "../components/LoginModal"
    import LogoutModal from "../components/LogoutModal"

    const overTime = new Storage();

    export default {
        name: "UploadList",
        components: {
            CircleInfo,
            LoginModal,
            LogoutModal
        },
        data() {
            return {
                msisdn: "",
                circleId: "",
                show: false,
                isCircle: false,
                loading: false,
                noDatas: false,
                infos: {},
                openInfo: {
                    phone: "",
                    sms: "",
                },
                memberItem: {},
                hasOpenBiz: null,
                currentRing: null,
            }
        },
        mounted() {
            this.msisdn = overTime.get("circleUserPhone")
            this.circleDetail()
        },
        methods: {
            openBusiness() {
                const sa = this.infos.sa || ""
                if(sa.indexOf("广东") > -1) {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '是否要下发短信？'
                    }).then(_ => {
                        this.$toast.loading({
                            mask: true,
                            message: '请稍候...',
                            duration: 0
                        })
                        api.circleRemindOpenBiz({circleId: this.circleId, memberIds: [this.memberItem.memberId], allFlag: 0}).then(res => {
                            const { data } = res
                            if(data.code === this.$common.SUCCESS) {
                                this.$notify({
                                    message: "开通短信发送成功",
                                    duration: 2000,
                                    background: '#07c160'
                                })
                            } else {
                                this.$notify({
                                    type: 'danger',
                                    message: data.msg,
                                    duration: 2000
                                })
                            }
                        }).finally(_ => {
                            this.$toast.clear()
                        })
                    }).catch(_ => {})
                } else {
                    this.show = true
                }
            },
            circleDetail() {
                this.$toast.loading({
                    mask: true,
                    message: '请稍候...',
                    duration: 0
                })
                api.circleInfo({msisdn: this.msisdn}).then(res => {
                    const { data } = res
                    this.infos = data.data
                    this.circleId = data.data.circleId
                    this.memberStatus()
                }).finally(_ => {
                    this.$toast.clear()
                })
            },
            memberStatus(fn) {
                api.circleMemberList({page: 1, limit: 1, circleId: this.circleId, msisdn: this.msisdn}).then(res => {
                    const { data } = res
                    this.memberItem = data.data[0]
                }).finally(_ => {
                    fn && fn()
                })
            },
            endCircleBusiness(form) {
                this.$toast.loading({
                    mask: true,
                    message: '请稍候...',
                    duration: 0
                })
                api.exitCircle({
                    msisdn: this.msisdn,
                    smsVcode: form.sms
                }).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS){
                        overTime.remove("circleUserPhone");
                        overTime.remove("saName");
                        overTime.remove("role");
                        this.$notify({
                            message: "退出成功",
                            duration: 2000,
                            background: '#07c160',
                            onClose: _ => {
                                this.$router.push("/login")
                            }
                        })
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })
                    }
                }).finally(_ => {
                    this.$toast.clear()
                })
            },
            loginOpenBusiness(form) {
                this.$toast.loading({
                    mask: true,
                    message: '请稍候...',
                    duration: 0
                })
                api.openBiz({
                    msisdn: this.msisdn,
                    smsVcode: form.sms
                }).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS){
                        this.$notify({
                            message: "开通成功",
                            duration: 2000,
                            background: '#07c160',
                            onClose: _ => {
                                this.$router.push({name: "success", query: { path: "no" }})
                            }
                        })
                        overTime.set("hasOpenBiz", true);
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })
                    }
                }).finally(_ => {
                    this.$toast.clear()
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    #list {
        padding-bottom: 52px;

        .top-container {
            width: 100%;
            height: auto;
            background-color: #fff;
            padding: 0 20px;

            .top-box {
                text-align: center;
                padding: 26px 0 30px;
                font-size: 15px;
                color: #333333;
                line-height: 30px;
                border-bottom: 1px solid #EBEBEB;

                .cicle-name {
                    font-size: 18px;
                    font-weight: 600;
                }

                img {
                    width: 46px;
                    height: 46px;
                }

                .text-one {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333333;
                }

                .click-open {
                    width: 90px;
                    margin: 0 auto;
                    text-align: center;
                    color: #458FCE;
                }
            }

            .center-box {
                padding: 10px 0;

                .info-box {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    line-height: 40px;
                    color: #333;
                    font-size: 15px;

                    .left-box {
                        color: #A4A4A4;
                    }
                }
            }
        }

        .case-title {
            font-size: 16px;
            font-weight: bold;
            line-height: 32px;
            margin: 10px 0 0 20px;
        }

        .my-info {
            height: 50px;
            padding: 0 20px;
            align-items: center;

            button {
                color: #458FCE;
                border-color: #458FCE;
            }
        }

        .list-container {
            width: 100%;
            height: auto;
            background-color: #fff;
            padding: 0 20px;
            font-size: 15px;

            .list-box {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                line-height: 50px;
                border-bottom: 1px solid #EBEBEB;

                &:last-child {
                    border-bottom: 0;
                }
            }
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

            .bottom-btn {
                width: 140px;
                height: 37px;
                line-height: 35px;
                font-size: 15px;
                background-color: #458FCE;
            }
        }

        @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
            .list-container {
                margin-bottom: 15px;
            }
            .footer {
                height: 65px;
            }
        }

        @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
            .list-container {
                margin-bottom: 15px;
            }
            .footer {
                height: 65px;
            }
        }

        @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
            .list-container {
                margin-bottom: 15px;
            }
            .footer {
                height: 65px;
            }
        }
    }

    #bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        /deep/ .van-button__text {
            color: #FF0101
        }
    }
</style>
