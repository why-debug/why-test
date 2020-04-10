<template>
    <div id="box">
        <div class="flex-row">
            <span>{{item.msisdn + (item.isManager ? "(管理员)" : "")}}</span>
            <div class="tag">
                <van-tag color="#ff880045" text-color="#FF8800" size="medium" v-if="item.shareJoin">邀请加入</van-tag>
            </div>
            <span :class="statusColor(item.freezeStatus)">{{formatStatus(item.freezeStatus)}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MemberListItem",
        props: ["itemData"],
        data() {
            return {

            }
        },
        methods: {
            statusColor(val) {
                if(val == "1") {
                    return "color-red"
                } else {
                    return "color-green"
                }
            },
            formatStatus(val) {
                if(val == "1") {
                    return "未开通"
                } else {
                    return "已开通"
                }
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
    }
}
</style>