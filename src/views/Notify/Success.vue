<template>
    <div id="success">
        <van-icon name="checked" size="65px" color="#458FCE"/>
        <div class="title">业务已受理</div>
        <div>开通结果稍后以短信形式通知您</div>
        <div class="bottom-box">
            <van-button type="info" class="btn" plain to="/upload-list" v-if="!!!path">确定</van-button>
            <div>如果有其他问题，请联系圈子管理员或客户经理</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Success",
        data() {
            return {
                path: ""
            }
        },
        methods: {

        },
        mounted() {
            this.path = this.$route.query.path
        }
    }
</script>

<style scoped lang="scss">
    #success {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff !important;
        text-align: center;
        font-size: 15px;
        padding-top: 65px;

        .title {
            font-size: 18px;
            font-weight: bold;
            margin: 24px 0 10px;
        }

        .bottom-box {
            position: absolute;
            bottom: 35px;
            left: 0;
            right: 0;
            font-size: 12px;
            color: #A4A4A4;

            .btn {
                width: 150px;
                height: 35px;
                line-height: 35px;
                border-color: #458FCE;
                color: #458FCE;
                margin-bottom: 90px;
                font-size: 15px;
            }
        }
    }
</style>
