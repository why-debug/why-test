<template>
    <div id="create">
        <van-steps :active="stepActive" active-color="#458FCE" style="padding-top: 20px" class="header">
            <van-step>基本信息</van-step>
            <van-step>成员信息</van-step>
            <van-step>上传视频彩铃</van-step>
        </van-steps>
        <div v-show="stepActive==0">
            <circle-edit-item :submit-data.sync="isSubmitBasic" :price-type-list="priceTypeList" @refreshClick="basicSubmit" @errorClick="basicError"/>
        </div>
        <div v-show="stepActive==1" class="step-2">
            <add-member-item :member-item="msisdnList" :submit-data.sync="isSubmitMember" :is-trim="true"
                             :is-error.sync="isMsisdnList" @refreshClick="memberSubmit" @errorClick="memberError"/>
        </div>
        <div v-show="stepActive==2" class="step-3">
            <circle-video-item :submit-data.sync="isSubmitRing" @refreshClick="ringSubmit" @errorClick="ringError"/>
        </div>

        <div class="btn-group flex-row-between footer">
            <van-button type="default" @click="submitBack" :disabled="loading" v-if="stepActive>0">上一步</van-button>
            <van-button type="info" @click="submitNext" :loading="loading" :disabled="loading" loading-text="提交中..." v-if="stepActive<2" style="background: #458FCE">下一步
            </van-button>
            <van-button type="info" @click="submitData" :loading="loading" :disabled="loading" loading-text="提交中..." v-if="stepActive == 2" style="background: #458FCE">提交</van-button>
        </div>
    </div>
</template>

<script>
    import AddMemberItem from "./../components/AddMemberItem"
    import CircleEditItem from "../components/CircleEditItem"
    import CircleVideoItem from "../components/CircleVideoItem"
    import api from "@/api/basic"
    import {Storage} from '../../api/common';
    const overTime = new Storage();

    export default {
        name: "CreateCircle",
        components: {
            CircleVideoItem,
            CircleEditItem,
            AddMemberItem
        },
        data() {
            return {
                loading: false,
                stepActive: 0,
                circleId: "",
                basicObject: {},
                memberObject: {},
                ringObject: {},
                msisdnList: [],
                isSubmitRing: false,
                isSubmitMember: false,
                isMsisdnList: false,
                isSubmitBasic: false,
                priceTypeList: []
            }
        },
        mounted() {
            api.getCirclePrice({sa: overTime.get('saName'), type: 1}).then(res => {
                const { data } = res

                if(data.code === this.$common.SUCCESS) {
                    this.priceTypeList = data.data || []
                } else {
                    this.priceTypeList = []
                }
            }).catch(_ => {
                this.priceTypeList = []
            })
        },
        methods: {
            basicSubmit(form) {
                this.basicObject = form
                api.addCircle({
                    ...form,
                    circleType: 1,
                    linkUUID: overTime.get("linkUUID") || ""
                    
                }).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS) {
                        this.circleId = data.data
                        this.stepActive += 1
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })
                    }
                }).finally(_ => {
                    this.loading = false
                })
            },
            basicError() {
                this.loading = false
            },
            memberSubmit(form) {
                this.memberObject = form
                const { msisdns } = form

                if(msisdns.length === 0 || (msisdns.length === 1 && !!!msisdns[0])) {
                    this.stepActive += 1
                    this.loading = false
                    return true
                }

                const saName = overTime.get("saName")
                if(!!saName && saName.indexOf("广东") > -1) {
                    api.shareCircle({...form, circleId: this.circleId}).then(res => {
                        const { data } = res
                        if(data.code === this.$common.SUCCESS) {
                            this.$notify({
                                message: "添加成功",
                                duration: 2000,
                                background: '#07c160',
                                onClose: _ => {
                                    this.msisdnList = ""
                                    this.stepActive += 1
                                }
                            })
                        } else {
                            this.$notify({
                                type: 'danger',
                                message: "添加成员返回错误",
                                duration: 2000
                            })
                        }
                    }).finally(_ => {
                        this.loading = false
                    })
                } else {
                    api.addCircleMember({...form, circleId: this.circleId}).then(res => {
                        const { data } = res
                        if(data.code === this.$common.SUCCESS) {
                            if(msisdns.length === data.data.successList.length) {
                                this.$notify({
                                    message: "添加成功",
                                    duration: 2000,
                                    background: '#07c160',
                                    onClose: _ => {
                                        this.msisdnList = ""
                                        this.stepActive += 1
                                    }
                                })
                            } else {
                                let msisdnList = []
                                msisdns.forEach(item => {
                                    data.data.failedList.forEach(it => {
                                        if(item === it.msisdn) {
                                            msisdnList.push(item+"#"+it.info)
                                        }
                                    })
                                })
                                this.msisdnList = msisdnList.join("\n")
                                this.isMsisdnList = true

                                this.$notify({
                                    type: 'danger',
                                    message: "添加成员返回错误",
                                    duration: 2000
                                })
                            }
                        } else {
                            this.$notify({
                                type: 'danger',
                                message: data.msg,
                                duration: 2000
                            })
                        }
                    }).finally(_ => {
                        this.loading = false
                    })
                }
            },
            memberError() {
                this.loading = false
            },
            ringSubmit(form) {
                this.ringObject = form
                api.uploadRing({
                    msisdn: this.basicObject.msisdn,
                    ringName: form.ringName,
                    ringContent: form.ringContent,
                    setType: form.currentIndex,
                    file: form.fileList[0].file
                }).then(res => {
                    const { data } = res
                    if (data.code === this.$common.SUCCESS) {
                        this.$notify({
                            message: "上传成功",
                            duration: 2000,
                            background: '#07c160',
                            onClose: _ => {
                                this.$router.go(-1)
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
                    this.loading = false
                })
            },
            ringError() {
                this.loading = false
            },
            submitBack() {
                this.stepActive -= 1
                if(this.stepActive == 0) {
                    this.isSubmitBasic = false
                }else if(this.stepActive == 1) {
                    this.isSubmitMember = false
                }
            },
            submitNext() {
                if(this.stepActive == 0) {
                    if(!!this.circleId) {
                        this.stepActive += 1
                    } else {
                        this.loading = true
                        this.isSubmitBasic = true
                    }
                }else if(this.stepActive == 1) {
                    this.loading = true
                    this.isSubmitMember = true
                }
            },
            submitData() {
                this.loading = true
                this.isSubmitRing = true
            }
        }
    }
</script>

<style scoped lang="scss">
    #create {
        font-size: 16px;

        .header {
            font-size: 14px;
            padding: 0 13px;
        }

        .btn-group {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;

            button {
                width: 100%;
                border: 0;
                border-radius: 0;
            }
        }

        .step-2 {
            width: 100%;
            height: auto;
        }

        /deep/ .van-steps {
            background-color: transparent;
        }

        /deep/ .van-step--horizontal .van-step__circle-container {
            background-color: #f5f5f5;
        }

        /deep/ .van-step__circle {
            background-color: #458FCE;
        }

        /deep/ .van-step--finish .van-step__line {
            background-color: #458FCE;
        }

        /deep/ .van-step__title {
            font-size: 14px;
        }

        /deep/ .van-step--horizontal .van-step__icon {
            font-size: 14px;
        }
    }
</style>
