<template>
    <div id="box">
        <slot/>
        <div class="center-box">
            <div class="info-box">
                <span class="left-box">创建时间</span>
                <span class="right-box">{{infos.ctime | formatTime}}</span>
            </div>
            <div class="info-box">
                <span class="left-box">圈子主</span>
                <span class="right-box">{{infos.circleManagerName}}</span>
            </div>
            <div class="info-box">
                <span class="left-box">资费</span>
                <span class="right-box">{{infos.price}}元/{{unit}}/人</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CircleInfo",
        props: ["itemData"],
        computed: {
            infos() {
                return this.itemData || {}
            },
            unit() {
                if(this.infos.price == "120") {
                    return "年"
                } else if(this.infos.price == "60") {
                    return "半年"
                } else {
                    return "月"
                }
            }
        }
    }
</script>

<style scoped lang="scss">
#box {
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
</style>