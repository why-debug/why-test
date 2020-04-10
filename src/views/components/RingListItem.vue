<template>
    <div id="box" @click="showVideo">
        <div class="flex-row">
            <div class="left-box">{{item.name}}</div>
            <div class="right-box">{{currentRingName ? (currentRingName == item.name ? "当前播放" : switchRingStatus(item.status)) : switchRingStatus(item.status)}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RingListItem",
        props: ["itemData", "currentRingName"],
        data() {
            return {

            }
        },
        methods: {
            showVideo() {
                this.$router.push({
                    name: 'videoShow',
                    params: {
                        videoSrc: "/rings/" + this.item().previewPath
                    }
                })
            },
            switchRingStatus(value) {
                const LIST_STATUS = {'-2': '违规违纪或者侵犯版权', '-1': '分发失败', '0': '未分发', '1': '分发中', '2': '分发成功', '5': '转码中'};
                return LIST_STATUS[value] || value
            }
        },
        computed: {
            item() {
                return this.itemData || {}
            }
        }
    }
</script>

<style scoped lang="scss">
    #box {
        position: relative;
        padding: 5px 0;

        .flex-row {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .tag {
                flex: 0 0 auto;
                width: 70px;
            }

            > span {
                &:first-child {
                    flex: 0 0 auto;
                    padding-right: 10px;
                }

                &:last-child {
                    flex: 1 1 auto;
                    text-align: right;
                    margin-right: 20px;
                }
            }

            .color-red {
                color: #FF0000
            }

            .color-green {
                color: #31C27C
            }

            .right-box {
                margin-right: 20px;
            }
        }
    }
</style>