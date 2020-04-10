<template>
    <div id="login">
        <img src="../../assets/images/yidong.png" class="logo">
        <div class="title">欢迎登录</div>
        <van-field v-model="phone" placeholder="请输入手机号" type="tel" clearable maxlength="11"
                   :error-message="errorMessage" @clear="errorMessage=''"/>
        <van-field v-model="sms" clearable placeholder="请输入短信验证码" type="number">
            <van-button slot="button" size="small" class="sms-btn" :disabled="smsBtn.disabled" @click="getCode">
                {{smsBtn.text}}
            </van-button>
        </van-field>
        <van-button type="info" round class="comfirm-btn" :disabled="phone!=''&&sms!=''?false:true"
                    :loading="loginLoading"
                    @click="toComfirm">立即登录
        </van-button>
        <!--<div class="foot">目前仅限江苏省移动用户可以登录使用</div>-->
    </div>
</template>

<script>
    import api from '../../api/basic'
    import {validateMobilePhone, Storage, jumpHtml} from '../../api/common';
    const overTime = new Storage();
    export default {
        name: "Login",
        data() {
            return {
                loginLoading: false,
                phone: "",
                sms: "",
                smsBtn: {
                    text: "获取验证码",
                    disabled: false,
                    timer: null,
                    count: ""
                },
                errorMessage: ''
            }
        },
        mounted() {
            const linkUUID = this.$route.query.link_uuid
            if(!!linkUUID) {
                overTime.set('linkUUID', linkUUID, 40000000);
            } else {
                overTime.set('linkUUID', "", 40000000);
            }
        },
        methods: {
            // 获取验证码
            getCode() {
                let returnMsg = validateMobilePhone(this.phone);
                if (returnMsg == "") {
                    this.errorMessage = '';
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
                    api.sendCode({
                        msisdn: this.phone
                    }).then(res => {
                        this.$toast(res.data.msg)
                    })
                } else {
                    this.errorMessage = returnMsg
                }

            },
            // 确定认证
            toComfirm() {
                let returnMsg = validateMobilePhone(this.phone);
                if (returnMsg == "") {
                    this.loginLoading = true;
                    // 发送请求
                    api.login2({
                        msisdn: this.phone,
                        smsVcode: this.sms,
                    }).then(res => {
                        this.loginLoading = false;
                        let datas = res.data;
                        if (datas.code == "000000") {
                            // this.$store.commit('newMsisdn', this.phone)
                            overTime.set('circleUserPhone', this.phone, 40000000);
                            overTime.set('hasOpenBiz', datas.data.hasOpenBiz, 40000000);
                            overTime.set('hasJoinedNoCircle', datas.data.role == "4" ? true : (datas.data.hasJoinedNoCircle ? true : false), 40000000);
                            overTime.set('saName', datas.data.saName, 40000000);
                            overTime.set('role', datas.data.role, 40000000);
                            if(datas.data.currentRing){
                                overTime.set('currentRing', datas.data.currentRing, 40000000);
                            }
                            this.$notify({
                                message: '登陆成功',
                                duration: 2000,
                                background: '#07c160'
                            })

                            // 跳转
                            // const nowUrl = overTime.get('now_url') || ""
                            // this.$router.push((jumpHtml(datas.data.role, nowUrl) || "/home"))
                            this.$router.push("/home")
                            /*if(this.$route.params.where&&this.$route.params.where == "mine") {
                                this.$router.push("/mine")
                            } else {
                                switch (datas.data.role) {
                                    case 1:
                                        this.$router.push("/circle-list")
                                        break
                                    case 2:
                                        this.$router.push("/manage-list")
                                        break
                                    case 3:
                                        this.$router.push("/circle-detail")
                                        break
                                    case 4:
                                        this.$router.push("/upload-list")
                                        break
                                    case 5:
                                        this.$router.push("/home")
                                        break
                                }
                            }*/
                            /*if(this.$route.params.where&&this.$route.params.where == "mine"){
                                this.$router.push("/mine")
                            }else {
                                if (!datas.data.hasJoinedNoCircle) {
                                    this.$router.push("/service-ring")
                                } else {
                                    this.$router.push("/upload-list")
                                }
                            }*/
                        } else {
                            this.$toast(datas.msg)
                        }
                    })

                } else {
                    this.errorMessage = returnMsg
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #login {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
        box-sizing: border-box;
        padding: 37px;

        .logo {
            width: 64px;
        }

        .title {
            margin: 10px 0 40px;
            font-size: 24px;
            font-weight: 600;
            color: #333333;
        }

        .error {
            position: absolute;
            bottom: 0;
            left: 0;
        }
        /deep/ .van-field__error-message{
            position: absolute;
            bottom: -33px;
            left: 0;
        }
        /deep/ .van-cell__value{
            overflow: unset;
        }

        /deep/ .van-cell {
            margin-bottom: 20px;
            padding: 10px 0;
            overflow: unset;
        }

        /deep/ .van-cell:not(:last-child)::after {
            left: 0;
        }

        .sms-btn {
            border: 0;
            border-radius: 0;
            border-left: 1px solid #EBEBEB;
            color: #458FCE;
        }

        .comfirm-btn {
            width: 100%;
            margin-top: 30px;
        }

        .foot {
            /*position: absolute;*/
            /*bottom: 22px;*/
            /*left: 0;*/
            /*right: 0;*/
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #A4A4A4;
        }
    }
</style>
