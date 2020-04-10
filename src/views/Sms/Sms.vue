<template>
    <div class="panel" >
        <div class="header">
            <span class="title">咪咕圈子彩铃</span>
        </div>

        <div class="info">
            <img src="@/assets/images/sms-logo.png"/>
            <div class="nice">尊敬的{{msisdnMessage}}</div>
            <div class="note">现邀请您加入咪咕圈子彩铃（统付），本号码开通无任何费用。</div>

            <van-field v-model="code" clearable placeholder="请输入短信验证码" type="number">
                <van-button slot="button" size="small" class="sms-btn" :disabled="smsBtn.disabled" @click="getCode">
                    {{smsBtn.text}}
                </van-button>
            </van-field>

            <van-button type="gray" round class="comfirm-btn" :disabled="code!=''?false:true"
                        :loading="btnLoading"
                        @click="toComfirm">立即登录
            </van-button>
        </div>
    </div>
</template>

<script>
    import api from "@/api/basic"

    export default {
        name: "Sms",
        data() {
            return {
                btnLoading: false,
                code: "",
                seq: "",
                smsBtn: {
                    disabled: false,
                    text: "获取验证码"
                },
                msisdn: {
                    me: "",
                    client: "",
                    circle: ""
                }
            }
        },
        mounted() {
            this.$toast.loading({
                mask: true,
                message: '请稍候...',
                duration: 0
            })
            this.seq = this.$route.query.seq
            this.orderDetail(_ => {
                this.$toast.clear()
            })
        },
        computed: {
            msisdnMessage() {
                if(this.msisdn.me) {
                    return `${this.msisdn.me.substring(0, 3)}****${this.msisdn.me.substring(this.msisdn.me.length - 4)}`
                }

                return ""
            }
        },
        methods: {
            getCode() {
                if (this.seq) {
                    // 开始倒计时
                    const TIME_COUNT = 60;
                    if (!this.smsBtn.timer) {
                        this.smsBtn.count = TIME_COUNT;
                        this.smsBtn.disabled = true;
                        this.smsBtn.text = this.smsBtn.count + "s后重发";
                        this.smsBtn.timer = setInterval(() => {
                            if (this.smsBtn.count > 0 && this.smsBtn.count <= TIME_COUNT) {
                                this.smsBtn.count--;
                                this.smsBtn.text = this.smsBtn.count + "s后重发";
                            } else {
                                this.smsBtn.text = "获取验证码";
                                clearInterval(this.smsBtn.timer);
                                this.smsBtn.timer = null;
                                this.smsBtn.disabled = false;
                            }
                        }, 1000)
                    }
                    // 发送请求
                    api.sendOrderSms(this.seq).then(res => {
                        this.$toast(res.data.msg)
                    })
                } else {
                    this.$notify({
                        type: 'danger',
                        message: "请重新进入页面",
                        duration: 2000
                    })
                }
            },
            toComfirm() {
                this.btnLoading = true
                api.sendTFOpenBiz({ seq: this.seq, smsVcode: this.code }).then(res => {
                    const { data } = res
                    if (data.code === this.$common.SUCCESS) {
                        //成功
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })

                        this.btnLoading = false
                    }
                }).catch(_ => {
                    this.btnLoading = false
                })
            },
            orderDetail(fn) {
                api.getOrderInfo(this.seq).then(res => {
                    const { data } = res
                    if (data.code === this.$common.SUCCESS) {
                        this.msisdn.me = data.data.msisdn
                        this.msisdn.client = data.data.clientManagerMsisdn
                        this.msisdn.circle = data.data.circleManagerMsisdn
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })
                    }

                    fn && fn()
                }).catch(fn)
            }
        }
    }
</script>

<style lang="scss">
body {
    background-color: #ffffff;
}
.panel {
    position: relative;

    .header {
        width: 100%;
        height: 64px;
        background-color: #E40077;
        padding: 30px 0 10px 0;
        text-align: center;

        > .title {
            font-size: 17px;
            font-family: "PingFang SC";
            color: #ffffff;
            line-height: 24px;
            letter-spacing: 1px;
        }
    }

    .info {
        padding: 38px;

        > img {
            height: 20px;
            margin-bottom: 12px;
        }

        > .nice {
            font-family: "PingFang SC";
            line-height: 28px;
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 50px;
        }

        > .note {
            font-size: 16px;
            font-weight: bold;
            font-family: "PingFang SC";
            color: #333333;
            line-height: 30px;
            margin-bottom: 80px;
        }

        /deep/ .van-cell {
            padding: 0;
            border-bottom: 1px solid #EBEBEB;
        }

        .sms-btn {
            border: 0;
            border-radius: 0;
            border-left: 1px solid #EBEBEB;
            color: #008AFF;
        }

        /deep/ .van-button--small {
            font-size: 14px
        }

        /deep/ .van-button--gray {
            width: 100%;
            margin-top: 28px;
            color: #ffffff;
            background-color: #E40077;
            border: 1px solid #E40077;
        }

        /deep/ .van-button--disabled {
            background-color: #cccccc;
            border: 1px solid #cccccc;
        }

        /deep/ .sms-btn.van-button--disabled {
            background-color: transparent;
            border-color: transparent;
            border-left-color: #EBEBEB;
        }
    }
}
</style>