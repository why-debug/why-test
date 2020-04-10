<template>
    <div id="box">
        <div class="flex-row" @click="circleDetail">
            <img src="../../assets/images/detail-icon.png">
            <div class="info">
                <div class="company-name">{{itemData.circleName}}</div>
                <div class="company-time">
                    <span>{{createTime}}</span>
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CircleListItem",
        props: ["circleItem"],
        computed: {
            createTime() {
                if(!!!this.circleItem) return ""

                const time = this.circleItem.ctime

                return !!time ? time.substring(0, 10) : time
            },
            itemData() {
                return this.circleItem || {}
            }
        },
        methods: {
            circleDetail() {
                this.$router.push({name: "manageList", query: {id: this.circleItem.circleId}});
            }
        }
    }
</script>

<style scoped lang="scss">
#box{
    .flex-row {
        position: relative;
        img {
            width: 40px;
            height: 40px;
        }

        .info {
            flex: 1 1 auto;
            width: 140px;
            padding-left: 14px;

            .company-name{
                width: 100%;
                min-height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 16px;
                color: #333333;
                font-weight: 600;
                padding-right: 10px;
            }

            .company-time{
                font-size: 12px;
                color: #A4A4A4;
            }
        }
    }
}
</style>