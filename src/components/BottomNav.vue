<template>
    <van-tabbar v-model="active" active-color="#2577E8" inactive-color='#ccc' :border="false" route>
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
            <img slot="icon" :src="$route.name == 'mine' ? userIcon.active : userIcon.inactive">
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
    import {Storage} from '../api/common';
    const overTime = new Storage();
    export default {
        name: "BottomNav",
        data(){
            return{
                active:0,
                isShow: false,
                isMe: false,
                homeIcon: {
                    active: require('@/assets/images/home-active.png'),
                    inactive: require('@/assets/images/home-default.png')
                },
                userIcon: {
                    active: require('@/assets/images/user-active.png'),
                    inactive: require('@/assets/images/user-default.png')
                }
            }
        },
        mounted() {
            const role = overTime.get("role")
            if(role == "4" || role == "5") {
                this.isShow = true
            } else {
                this.isShow = false
            }

            if(role == "5") {
                this.isMe = false
            } else {
                this.isMe = true
            }
        },
        methods:{
            mine(){
                if(this.isMe) {
                    if (overTime.get("circleUserPhone")) {
                        const role = overTime.get("role")
                        if (role == "1") {
                            this.$router.push("/circle-list")
                        } else if (role == "2") {
                            this.$router.push("/manage-list")
                        } else if (role == "3") {
                            this.$router.push("/circle-detail")
                        } else {
                            if (!overTime.get("hasJoinedNoCircle")) {
                                this.$router.push("/nob")
                            } else {
                                this.$router.push("/upload-list")
                            }
                        }
                    } else {
                        this.$router.push({
                            name: 'login',
                            params: {
                                where: 'mine'
                            }
                        })
                    }
                    /*if (overTime.get("circleUserPhone")) {
                        this.$router.push("/mine")
                    } else {
                        this.$router.push({
                            name: 'login',
                            params: {
                                where: 'mine'
                            }
                        })
                    }*/
                }
            },
            // 上传视频彩铃
            uploadVideoRing() {
                if (overTime.get("circleUserPhone")) {
                    if (!overTime.get("hasJoinedNoCircle")) {
                        this.$router.push("/service-ring")
                    } else {
                        this.$router.push("/upload-list")
                    }
                } else {
                    this.$router.push("/login")
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .center-icon{
        width: 55px;
        height: 55px;
        margin-bottom: 20px;
    }
    .disable {
        color: #d0cccc;
    }
    .tab-btn {
        height: 36px;
        padding: 0 18px 0 15px;
        border-radius: 36px;
        background-color: #2577E8;

        display: flex;
        justify-content: center;
        align-items: center;
        > img {
            height: 18px;
            margin-right: 4px;
        }
        > span {
            color: #ffffff;
            font-size: 14px;
        }
    }
     .van-tabbar-item {
        flex-flow: row;

        img {
            margin-right: 4px;
        }

        span {
            font-size: 14px;
        }
    }
</style>
