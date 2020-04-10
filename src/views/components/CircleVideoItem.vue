<template>
    <div id="box">
        <van-field v-model="form.ringName" label-width="0" required clearable label="" placeholder="请输入彩铃名称"
                   :error="ringNameError" @blur="vali('ringName')"/>
        <van-cell class="van-cell--required diy-cell">
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
        <van-cell>
            <div class="select-box" :class="index==form.currentIndex?'active':''" v-for="(item,index) in option" :key="index"
                 :data-index="index" v-if="(!isSetType && index != 2) || isSetType"
                 @click="choose($event)">{{item.name}}
            </div>
        </van-cell>
        <van-field v-model="form.ringContent" placeholder="请输入视频中的描述（音频文字内容）" required type="textarea"
                   rows="6" :border="false" style="margin-top: 10px"
                   :error="ringContentError" @blur="vali('ringContent')"/>
    </div>
</template>

<script>
    export default {
        name: "CircleVideoItem",
        props: ["submitData", "isSetType"],
        data() {
            return {
                ringNameError: false,
                ringContentError: false,
                form: {
                    ringName: "",
                    currentIndex: 0,
                    fileList: [],
                    ringContent: ""
                },
                option: [{
                    id: "0",
                    name: "作为唯一播放"
                }, {
                    id: "1",
                    name: "加入当前播放列表"
                }, {
                    id: "2",
                    name: "不设置"
                }]
            }
        },
        methods: {
            choose(e) {
                let index = e.target.dataset.index;
                this.form.currentIndex = index;
            },
            vali(key) {
                let result = true

                if(!!key) {
                    if(!!!this.form.ringName && key == "ringName") {
                        this.ringNameError = true
                        result = false
                    } else if(key == "ringName") {
                        this.ringNameError = false
                    }

                    if(!!!this.form.ringContent && key == "ringContent") {
                        this.ringContentError = true
                        result = false
                    } else if(key == "ringContent") {
                        this.ringContentError = false
                    }
                } else {
                    if(!!!this.form.ringName) {
                        this.ringNameError = true
                        result = false
                    } else {
                        this.ringNameError = false
                    }

                    if(!!!this.form.ringContent) {
                        this.ringContentError = true
                        result = false
                    } else {
                        this.ringContentError = false
                    }
                }

                return result
            },
            uploadVideo() {

            }
        },
        watch: {
            submitData(newVal) {
                if (newVal) {
                    if(this.vali()) {
                        if(this.form.fileList.length === 0) {
                            this.$notify({
                                type: 'warning',
                                message: "请上传视频文件",
                                duration: 2000
                            })
                            this.$emit("errorClick")
                        } else {
                            this.$emit("refreshClick", this.form)
                        }
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: "请输入必填内容",
                            duration: 2000
                        })
                        this.$emit("errorClick")
                    }
                    this.$emit("update:submitData", false)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
#box {
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

    .select-box {
        margin-top: 10px;
    }
}
</style>