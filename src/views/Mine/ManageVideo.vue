<template>
    <div id="manage" :class="isTab ? 'pb-60' : 'pb-0'">
        <div v-if="isTab">
            <van-tabs @change="onTabChange" sticky swipeable>
                <van-tab title="同步视频" name="1">
                    <div class="tab-box pt-10" v-if="tab == 1">
                        <van-list
                                v-model="loading"
                                :finished="finished"
                                finished-text="已经全部加载完成"
                                @load="onLoad"
                        >
                            <div v-for="(item,index) in videoList" :key="index" class="video-box">
                                <van-checkbox v-model="item.checked" class="radio-box"/>
                                <div class="content" @click="showVideo(item)">
                                    <div class="c-img">
                                        <img src="@/assets/images/video-bg.png">
                                        <div class="c-img-border">
                                            <img src="@/assets/images/video-play.png">
                                        </div>
                                    </div>
                                    <div class="c-info">
                                        <div class="info-title">{{item.name}}</div>
                                        <div class="info-bottom">
                                            <div class="status">未分发</div>
                                            <van-button type="info" size="small" round @click.stop="onSettingSyncRingVideo(item, index)">设置为彩铃</van-button>
                                        </div>
                                    </div>


                                    <!--<div class="line-div">
                                        <div class="left overflow-ellipsis title">{{item.name}}</div>
                                        &lt;!&ndash;<div class="right">{{item.status|listStatus}}</div>&ndash;&gt;
                                    </div>
                                    <div class="line-div">
                                        &lt;!&ndash;<div class="left time">{{item.time}}</div>&ndash;&gt;
                                        &lt;!&ndash;<div class="status">{{item.status|listStatus}}</div>&ndash;&gt;
                                        <div class="status">未分发</div>
                                        <van-button type="info" size="small" round @click="onSettingSyncRingVideo(item, index)">设置为彩铃</van-button>
                                    </div>-->
                                </div>
                            </div>
                        </van-list>
                    </div>
                </van-tab>
                <van-tab title="本地视频" name="2">
                    <div v-if="tab != 1">
                        <header>
                            <span @click="toManage">管理</span>
                        </header>
                        <van-checkbox-group v-model="resultRadio" :max="1">
                            <van-list
                                v-model="loading"
                                :finished="tableFinished"
                                finished-text="已经全部加载完成"
                                @load="onTableLoad">
                                <div v-for="(item,index) in tableList" :key="index" class="video-box"
                                     :style="{transform: showRadio?'translateX(0)':''}">
                                    <van-checkbox :name="index" class="radio-box"/>
                                    <!--<div class="content">
                                        <div class="line-div">
                                            <div class="left overflow-ellipsis title">{{item.name}}</div>
                                            &lt;!&ndash;<div class="right">{{item.status|listStatus}}</div>&ndash;&gt;
                                        </div>
                                        <div class="line-div">
                                            &lt;!&ndash;<div class="left time">{{item.time}}</div>&ndash;&gt;
                                            <div class="status">{{item.status|listStatus}}</div>
                                            <van-button type="info" size="small" round @click="onSettingRingVideo(item)">设置为彩铃</van-button>
                                        </div>
                                    </div>-->
                                    <div class="content" @click="showVideo(item)">
                                        <div class="c-img">
                                            <img src="@/assets/images/video-bg.png">
                                            <div class="c-img-border">
                                                <img src="@/assets/images/video-play.png">
                                            </div>
                                        </div>
                                        <div class="c-info">
                                            <div class="info-title">{{item.name}}</div>
                                            <div class="info-bottom">
                                                <div class="status">{{item.status|listStatus}}</div>
                                                <van-button v-if="item.status == '2'" type="info" size="small" round @click.stop="onSettingRingVideo(item)">设置为彩铃</van-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </van-list>
                        </van-checkbox-group>
                        <footer :style="{transform: showRadio?'translateY(0)':''}">
                            <!--<van-checkbox v-model="allchecked" class="radio-box"
                                          @click="tableList.map(item=>item.checked = !item.checked)">全选
                            </van-checkbox>-->
                            <span></span>
                            <van-button type="danger" size="small" round @click="onRemoveRing">删除</van-button>
                        </footer>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div v-else class="pt-10">
            <van-checkbox-group v-model="resultRadio" :max="1">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="已经全部加载完成"
                  @load="onLoad">
                    <div v-for="(item,index) in videoList" :key="index" class="video-box">
                        <van-checkbox :name="index" class="radio-box"/>
                        <div class="content" @click="showVideo(item)">
                            <div class="c-img">
                                <img src="@/assets/images/video-bg.png">
                                <div class="c-img-border">
                                    <img src="@/assets/images/video-play.png">
                                </div>
                            </div>
                            <div class="c-info">
                                <div class="info-title">{{item.name}}</div>
                                <div class="info-bottom">
                                    <div class="status">{{item.status|listStatus}}</div>
                                    <van-button v-if="item.status == '2'" type="info" size="small" round @click.stop="onSettingSyncGroupRingVideo(item, index)">设置为彩铃</van-button>
                                </div>
                            </div>
                            <!--<div class="line-div">
                                <div class="left overflow-ellipsis title">{{item.name}}</div>
                                &lt;!&ndash;<div class="right">{{item.status|listStatus}}</div>&ndash;&gt;
                            </div>
                            <div class="line-div">
                                &lt;!&ndash;<div class="left time">{{item.time}}</div>&ndash;&gt;
                                &lt;!&ndash;<div class="status">{{item.status|listStatus}}</div>&ndash;&gt;
                                <div class="status">未分发</div>
                                <van-button type="info" size="small" round @click="onSettingSyncGroupRingVideo(item, index)">设置为彩铃</van-button>
                            </div>-->
                        </div>
                    </div>
                </van-list>
            </van-checkbox-group>
        </div>


        <van-popup
                v-model="isPopupShow"
                closeable
                close-icon="close"
                position="bottom"
                :style="{ height: '50%' }"
        >
            <div class="pb-40">
                <van-checkbox-group v-model="resultRadio" :max="1">
                    <van-list v-if="isPopupShow"
                            v-model="circleLoading"
                            :finished="circleFinished"
                            finished-text="已经全部加载完成"
                            @load="onPopupLoad"
                    >
                        <div v-for="(item,index) in circleList" :key="index" class="video-box" style="width: 100%;transform: translateX(0px);">
                            <div class="content-circle">
                                <van-checkbox :name="index" class="radio-box"/>
                                <div class="line-div">
                                    <div class="left overflow-ellipsis title">{{item.circleName}}</div>
                                </div>
                            </div>
                        </div>
                    </van-list>
                </van-checkbox-group>

                <div class="popup-btn">
                    <van-button type="info" size="small" style="width: 100px" @click="onSubmitCircle">确认</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import api from '../../api/basic'
    import {Storage} from '../../api/common'

    const overTime = new Storage()
    export default {
        name: "ManageVideo",
        data() {
            return {
                videoList: [],
                tableList: [],
                circleList: [],
                showRadio: false,
                allchecked: false,
                page: 1,
                circlePage: 1,
                limit: 10,
                total: 0,
                circleTotal: 0,
                tab: 1,
                isTab: false,
                loading: false,
                circleLoading: false,
                finished: false,
                tableFinished: false,
                circleFinished: false,
                timer: null,
                circleTimer: null,
                isPopupShow: false,
                ringId: "",
                ringIndex: -1,
                roleId: "",
                userCircleId: "",
                resultRadio: []
            }
        },
        mounted() {
            this.$toast.loading({
                mask: true,
                message: '加载中...',
                duration: 0
            })

            const _role = overTime.get('role')
            this.roleId = _role
            if(_role != "1") {
                api.circleInfo({msisdn: overTime.get('circleUserPhone')}).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS){
                        this.userCircleId = data.data.circleId
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
                this.isTab = true
            } else {
                this.$toast.clear()
            }
        },
        methods: {
            showVideo(item) {
                this.$router.push({
                    name: 'videoShow',
                    params: {
                        videoSrc: "/rings/" + item.previewPath
                    }
                })
            },
            statusItem(value) {
                if(!!!value) return value

                let item = {'-2': '违规违纪或者侵犯版权', '-1': '分发失败', '0': '未分发', '1': '分发中', '2': '分发成功', '5': '转码中'}
                return item[value.toString()]
            },
            onTabChange(val) {
                this.initialize()
                this.tab = val
            },
            toManage() {
                this.showRadio = !this.showRadio;
            },
            initialize() {
                this.page = 1
                this.total = 0
                this.videoList = []
                this.tableList = []
                this.showRadio = false
                this.loading = false
                this.finished = false
                this.tableFinished = false
                this.timer = null
            },
            getMemberRingList(fn) {
                api.ringList({
                    msisdn: overTime.get("circleUserPhone")
                }).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS){
                        this.tableList = data.data.rings || []
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })
                    }
                }).finally(fn)
            },
            getSyncMemberRingList(fn) {
                api.syncRingList({
                    page: this.page,
                    limit: this.limit
                }).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS){
                        if(this.page === 1) {
                            this.videoList = data.data || []
                        } else {
                            this.videoList = this.videoList.concat(data.data)
                        }
                        this.page += 1
                        this.total = data.count
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })
                    }
                }).finally(fn)
            },
            circleListTable(fn) {
                api.circleList({page: this.circlePage}).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS) {
                        this.circlePage += 1
                        this.circleTotal = data.count
                        this.circleList = this.circleList.concat(data.data)
                    } else {
                        this.$notify({
                            type: 'danger',
                            message: data.msg,
                            duration: 2000
                        })
                    }
                }).finally(fn)
            },
            onSettingRingVideo(row) {
                this.$toast.loading({
                    mask: true,
                    message: '设置中...',
                    duration: 0
                })
                api.settingRing({msisdn: overTime.get('circleUserPhone'), circleRingId: row.circleRingId, circleId: this.userCircleId}).then(res => {
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
            },
            onSettingSyncRingVideo(row, index) {
                this.$toast.loading({
                    mask: true,
                    message: '设置中...',
                    duration: 0
                })
                api.syncSettingRing(row.id, this.userCircleId).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS) {
                        this.videoList.splice(index, 1)
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
            },
            onSettingSyncGroupRingVideo(row, index) {
                this.ringId = row.id
                this.ringIndex = index
                this.isPopupShow = true
            },
            onSubmitCircle() {
                if(this.resultRadio.length === 0) {
                    this.$notify({
                        type: 'danger',
                        message: "请选择数据进行设置铃音",
                        duration: 2000
                    })
                    return false
                }

                this.$toast.loading({
                    mask: true,
                    message: '设置中...',
                    duration: 0
                })
                const index = this.resultRadio[0]
                const item = this.circleList[index]
                api.syncSettingRing(this.ringId, item.circleId).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS) {
                        this.videoList.splice(this.ringIndex, 1)
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
                    this.isPopupShow = false
                    this.$toast.clear()
                })
            },
            onRemoveRing() {
                if(this.resultRadio.length === 0) {
                    this.$notify({
                        type: 'danger',
                        message: "请选择数据进行删除",
                        duration: 2000
                    })
                    return false
                }

                this.$toast.loading({
                    mask: true,
                    message: '删除中...',
                    duration: 0
                })
                const index = this.resultRadio[0]
                const item = this.tableList[index]
                api.removeRing(item.circleRingId).then(res => {
                    const { data } = res
                    if(data.code === this.$common.SUCCESS) {
                        this.tableList.splice(index, 1)
                        this.$notify({
                            message: "删除成功",
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
                    this.showRadio = false
                    this.$toast.clear()
                })
            },
            onLoad() {
                if(!!!this.timer) {
                    this.timer = setTimeout(_ => {
                        this.getSyncMemberRingList(_ => {
                            // 加载状态结束
                            this.loading = false
                            this.timer = null

                            // 数据全部加载完成
                            if (this.videoList.length >= this.total) {
                                this.finished = true
                            }
                        })
                    }, 500)
                }
            },
            onTableLoad() {
                if(!!!this.timer) {
                    this.timer = setTimeout(_ => {
                        this.getMemberRingList(_ => {
                            // 加载状态结束
                            this.loading = false
                            this.timer = null
                            this.tableFinished = true
                        })
                    }, 500)
                }
            },
            onPopupLoad() {
                if(!!!this.circleTimer) {
                    this.circleTimer = setTimeout(_ => {
                        this.circleListTable(_ => {
                            // 加载状态结束
                            this.circleLoading = false
                            this.circleTimer = null

                            if (this.circleList.length >= this.circleTotal) {
                                this.circleFinished = true
                            }
                        })
                    }, 500)
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    #manage {
        overflow-x: hidden;
        height: 100vh;
        padding-bottom: 60px;

        header {
            text-align: right;
            line-height: 45px;
            padding-right: 10px;
            color: #458FCE;

        }

        .video-box {
            width: 400px;
            height: auto;
            display: flex;
            flex-direction: row;
            margin-bottom: 10px;
            transition: all 0.3s;
            transform: translateX(-30px);

            .radio-box {
                padding: 10px;
            }

            .content {
                width: 355px;
                padding: 10px;
                background-color: #fff;
                border-radius: 6px;
                display: flex;

                .c-img {
                    flex: 0 0 auto;
                    position: relative;
                    width: 87px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 12px;

                    > img {
                        width: 100%;
                    }

                    .c-img-border {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin-left: -13px;
                        margin-top: -13px;
                        width: 26px;
                        height: 26px;
                        border-radius: 26px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: rgba(0, 0, 0, .5);

                        > img {
                            height: 12px;
                        }
                    }
                }

                .c-info {
                    position: relative;
                    flex: 1 1 auto;
                    display: flex;
                    flex-flow: column nowrap;
                    padding: 10px 0 5px 0;

                    > .info-title {
                        color: #333333;
                        font-size: 16px;
                    }

                    > .info-bottom {
                        position: absolute;
                        left: 0;
                        bottom: 5px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                }

                .line-div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: 16px;
                    color: #333333;

                    .title {
                        font-weight: bold;
                        font-size: 16px;
                    }

                    .left {
                        /*width: 200px;*/
                        width: 100%;
                        line-height: 30px;
                    }

                    .right {
                        font-size: 15px;
                    }

                    .status {
                        width: 120px;
                        line-height: 30px;
                        font-size: 15px;
                    }

                    .time {
                        font-size: 14px;
                        color: #A4A4A4;
                    }
                }
            }
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 55px;
            background-color: #fff;
            border-top: 1px solid #EBEBEB;
            padding: 0 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
            transform: translateY(55px);
        }
    }

    .content-circle {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0;
        background-color: #fff;
        border-radius: 3px;

        .radio-box {
            flex: 0 0 auto;
            padding: 10px;
        }

        .line-div {
            flex: 1 1 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 16px;
            color: #333333;

            .title {
                font-weight: bold;
                font-size: 16px;
            }

            .left {
                width: 100%;
                line-height: 30px;
            }
        }
    }

    .popup-btn {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
    }

    .tab-box {
        position: relative;
    }

    .pb-0 {
        padding-bottom: 0px
    }

    .pb-40 {
        padding-bottom: 40px
    }

    .pb-60 {
        padding-bottom: 60px
    }

    .pt-10 {
        padding-top: 10px
    }
</style>
