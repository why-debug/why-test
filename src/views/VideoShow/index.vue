<template>
    <div id="video">
        <div class="video-container">
            <video :src="$config.fileUrl+videoSrc" controls autoplay ref="videoRef" x5-playsinline="true" playsinline="true"
                   webkit-playsinline="true" loop></video>
            <div class="center-box">
                <div class="tel-name">咪咕圈子彩铃</div>
                <div>正在呼叫...</div>
                <div class="keybord">
                    <div class="k-item">
                        <img src="../../assets/images/pic_yuyin.png">
                        <span>静音</span>
                    </div>
                    <div class="k-item">
                        <img src="../../assets/images/pic_jianpan.png">
                        <span>拨号键盘</span>
                    </div>
                    <div class="k-item">
                        <img src="../../assets/images/pic_mianti.png">
                        <span>免提</span>
                    </div>
                </div>
                <img class="on-hook" src="../../assets/images/pic_guaduan.png" @click="$router.back(-1)">
            </div>
        </div>
    </div>
</template>

<script>
    import {Storage} from '../../api/common';
    const overTime = new Storage();
    export default {
        name: "VideoShow",
        data() {
            return {
                videoSrc: "",
                userPhone: overTime.get("circleUserPhone")||'13888888888'
            }
        },
        mounted() {
            this.videoSrc = this.$route.params.videoSrc;
        }
    }
</script>

<style scoped lang="scss">
    #video {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #1F1F1F;

        .video-container {
            width: 100%;
            height: 558px;
            margin: 0 auto;
            background-color: #1F1F1F;

            video {
                width: 100%;
                height: 284px;
                object-fit: fill;
            }

            .center-box {
                color: #FEFEFE;
                text-align: center;
                font-size: 13px;

                .tel-name {
                    font-size: 19px;
                    margin: 15px 0 3px;
                }

                .keybord {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .k-item {
                        width: 106px;
                        margin-top: 15px;

                        img {
                            width: 60px;
                            height: 60px;
                        }

                        span {
                            display: block;
                            margin-top: 10px;
                        }
                    }
                }

                .on-hook {
                    width: 60px;
                    height: 60px;
                    margin-top: 22px;
                }
            }
        }
    }
</style>
