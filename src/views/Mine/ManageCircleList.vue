<template>
    <div id="mList">
        <div class="top-container">
            <circle-info :item-data="infos">
                <div class="top-box">
                    <img class="share" src="@/assets/images/edit-icon.png" @click="onLinkCode">
                    <img src="../../assets/images/detail-icon.png">
                    <div class="cicle-name">{{infos.circleName || ""}}</div>
                </div>
            </circle-info>
        </div>
        <van-tabs v-model="activeTab" color="#458FCE" title-active-color="#458FCE" class="content" line-width="76px" @change="onActiveTab">
            <van-tab title="成员列表">
                <div class="btn-container">
                    <van-button plain color="#458FCE" round size="small" @click="onRemindOpenBiz">　一键下发短信　</van-button>
                    <van-button plain color="#458FCE" round size="small" @click="addMemberSubmit">　添加成员　</van-button>
                </div>
                <van-list
                        v-model="memberLoading"
                        :finished="memberFinished"
                        finished-text="已经全部加载完成"
                        @load="onMemberLoad"
                >
                    <van-swipe-cell class="list-box" v-for="(item,index) in membersList" :key="index" :ref="setRef(index, 'member')">
                        <van-cell>
                            <template slot="title">
                                <member-list-item :item-data="item"/>
                            </template>
                            <van-icon slot="right-icon" name="ellipsis"
                                      :style="{'line-height': '34px', 'visibility': (item.status == '1' && !item.isManager ? 'inherit' : 'hidden')}"
                                      @click="openRef(index, 'member')"/>
                        </van-cell>
                        <template slot="right">
                            <van-button type="info" text="下发短信" @click="onOpenSMS(item)" v-if="item.status == '1'"/>
                            <van-button type="danger" text="删除" @click="onRemoveMember(item)" v-if="!item.isManager"/>
                        </template>
                    </van-swipe-cell>
                </van-list>
            </van-tab>
            <van-tab title="视频彩铃列表">
                <div class="btn-container">
                    <van-button plain color="#458FCE" round size="small" @click="addRingSubmit">　添加铃音　</van-button>
                </div>
                <div class="v-loading" v-if="ringLoading">
                    <van-loading size="14px">加载中...</van-loading>
                </div>
                <!--<div class="list-container" v-else>-->
                <div v-else>
                    <van-swipe-cell class="list-box" v-for="(item,index) in ringsList" :key="index" :style="{'color':item.color}" :ref="setRef(index, 'ring')">
                        <van-cell>
                            <template slot="title">
                                <ring-list-item :current-ring-name="infos.latestRingName" :item-data="item"/>
                            </template>
                            <van-icon slot="right-icon" name="ellipsis"
                                      :style="{'line-height': '34px', 'visibility': (infos.latestRingName != item.name && item.status == '2' ? 'inherit' : 'hidden')}"
                                      @click="openRef(index, 'ring')"/>
                        </van-cell>
                        <template slot="right">
                            <van-button type="info" text="设置" @click="onSetRing(item)" v-if="infos.latestRingName != item.name && item.status == '2'"/>
                        </template>
                    </van-swipe-cell>


                    <!--<div class="list-box" v-for="(item,index) in ringsList" :key="index" :style="{'color':item.color}"  @click="showVideo(item)">
                        <div class="left-box">{{item.name}}</div>
                        <div class="right-box">{{infos.latestRingName ? (infos.latestRingName == item.name ? "当前播放" : switchRingStatus(item.status)) : switchRingStatus(item.status)}}</div>
                    </div>-->
                    <div style="text-align: center;color: #ccc;height: 100px;line-height: 100px" v-if="noDatas">暂无铃音</div>
                </div>
            </van-tab>
            <van-tab title disabled></van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import CircleInfo from "../components/CircleInfo"
    import MemberListItem from "../components/MemberListItem"
    import RingListItem from "../components/RingListItem"
    import api from "@/api/basic"
    import {Storage} from '@/api/common'
    const overTime = new Storage()

    export default {
        name: "manage-circle-list",
        components: {RingListItem, MemberListItem, CircleInfo},
        data() {
            return {
                circleId: "",
                msisdn: "",
                memberLoading: false,
                memberFinished: false,
                memberPage: 1,
                memberTotal: 0,
                memberTimer: null,
                ringLoading: false,
                infos: {},
                activeTab:0,
                ringsList:[],
                noDatas:false,
                membersList:[],
                isInit: false
            }
        },
        mounted() {
            if(!this.isInit) {
                this.isInit = true
                this.init()
            }
        },
        methods: {
            setRef(i, name) {
                return name+i
            },
            openRef(i, name) {
                this.$refs[name+i][0].open("right")
            },
            switchRingStatus(value) {
                const LIST_STATUS = {'-2': '违规违纪或者侵犯版权', '-1': '分发失败', '0': '未分发', '1': '分发中', '2': '分发成功', '5': '转码中'};
                return LIST_STATUS[value] || value
            },
            showVideo(item) {
                this.$router.push({
                    name: 'videoShow',
                    params: {
                        videoSrc: "/rings/" + item.previewPath
                    }
                })
            },
            init() {
                this.circleId = this.$route.query.id
                if(!!!this.circleId) {
                    this.msisdn = overTime.get("circleUserPhone")
                }
                this.circleDetail()
            },
            onActiveTab() {
                this.noDatas = false
                if(this.activeTab == 0) {
                    this.memberLoading = false
                    this.memberFinished = false
                    this.memberPage = 1
                    this.memberTotal = 0
                    this.membersList = []
                    this.memberTimer = null
                    this.onMemberLoad()
                } else {
                    this.ringLoading = true
                    this.ringsList = []
                    this.ringList(_ => {
                        this.ringLoading = false
                    })
                }
            },
            onLinkCode() {
                this.$router.push({name: "exhibition", query: {id: this.circleId}})
            },
            onOpenSMS(item) {
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否为成员下发短信？'
                }).then(_ => {
                    this.$toast.loading({
                        mask: true,
                        message: '请稍候...',
                        duration: 0
                    })
                    api.circleRemindOpenBiz({circleId: this.circleId, memberIds: [item.memberId]}).then(res => {
                        const { data } = res
                        if(data.code === this.$common.SUCCESS) {
                            this.$notify({
                                message: "下发短信成功",
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
                })
            },
            onSetRing(item) {
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否设置此铃音？'
                }).then(_ => {
                    this.$toast.loading({
                        mask: true,
                        message: '设置中...',
                        duration: 0
                    })
                    api.settingRing({circleRingId: item.circleRingId, circleId: this.circleId}).then(res => {
                        const { data } = res
                        if(data.code === this.$common.SUCCESS) {
                            this.$notify({
                                message: "设置成功",
                                duration: 2000,
                                color: '#ffffff',
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
                })
            },
            onRemoveMember(item) {
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否删除此成员？'
                }).then(_ => {
                    this.$toast.loading({
                        mask: true,
                        message: '请稍候...',
                        duration: 0
                    })
                    api.removeCircleMember([item.memberId]).then(res => {
                        const { data } = res
                        if(data.code === this.$common.SUCCESS) {
                            if(data.data.failedList.length > 0){
                                this.$notify({
                                    type: 'danger',
                                    message: data.data.failedList[0].info,
                                    duration: 2000
                                })
                            } else {
                                this.$notify({
                                    message: "删除成功",
                                    duration: 2000,
                                    background: '#07c160'
                                })
                                this.onActiveTab()
                            }
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
                })
            },
            circleDetail() {
                api.circleInfo({circleId: this.circleId, msisdn: this.msisdn}).then(res => {
                    const { data } = res
                    this.infos = data.data
                    this.circleId = data.data.circleId
                })
            },
            onMemberLoad() {
                if(!!!this.memberTimer) {
                    this.memberTimer = setTimeout(_ => {
                        this.memberList(_ => {
                            this.memberLoading = false
                            this.memberTimer = null

                            if (this.membersList.length >= this.memberTotal) {
                                this.memberFinished = true
                            }
                        })
                    }, 1000)
                }
            },
            addMemberSubmit() {
                this.$router.push({name: "addMember", query: {id: this.circleId}})
            },
            addRingSubmit() {
                this.$router.push({name: "addRingVideo", query: {msisdn: this.infos.circleManagerNum}})
            },
            onRemindOpenBiz() {
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否一键下发短信？'
                }).then(_ => {
                    this.$toast.loading({
                        mask: true,
                        message: '请稍候...',
                        duration: 0
                    })
                    api.circleRemindOpenBiz({circleId: this.circleId, allFlag: "1"}).then(res => {
                        const { data } = res
                        if(data.code === this.$common.SUCCESS) {
                            this.$notify({
                                message: "下发短信成功",
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
                })
            },
            memberList(fn) {
                api.circleMemberList({page: this.memberPage, circleId: this.circleId}).then(res => {
                    const { data } = res
                    this.memberPage += 1
                    this.memberTotal = data.count
                    this.membersList = this.membersList.concat(data.data)
                }).finally(_ => {
                    fn && fn()
                })
            },
            ringList(fn) {
                api.ringList({msisdn: this.infos.circleManagerNum}).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS) {
                        this.ringsList = data.data.rings
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })
                    }
                }).finally(_ => {
                    fn && fn()
                })
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if(!vm.isInit) {
                    vm.isInit = true
                    vm.init()
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    #mList{
        .top-container {
            width: 100%;
            height: auto;
            background-color: #fff;
            padding: 0 20px;

            .top-box {
                position: relative;
                text-align: center;
                padding: 26px 0 30px;
                font-size: 15px;
                color: #333333;
                line-height: 30px;
                border-bottom: 1px solid #EBEBEB;

                .share {
                    position: absolute;
                    right: 0;
                    top: 13px;
                    padding: 13px;
                    width: 40px;
                    height: 40px;
                }

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
        }
        .content{
            margin-top: 10px;
            .btn-container{
                background-color: #fff;
                border-bottom: 1px solid #EBEBEB;
                padding: 10px 20px;
                button{
                    margin-right: 10px;
                }
            }
            .list-container {
                width: 100%;
                height: auto;
                background-color: #fff;
                padding: 0 20px;
                font-size: 15px;
                text-align: center;

                .list-box {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    line-height: 50px;
                    border-bottom: 1px solid #EBEBEB;
                    color: #333333;

                    &:last-child {
                        border-bottom: 0;
                    }
                }
            }
        }
    }
    .list-box {
        /deep/ .van-button{
            height: 100%;
            border: 0;
            border-radius: 0;
        }
    }
    .v-loading {
        line-height: 50px;
        text-align: center;
    }
</style>
