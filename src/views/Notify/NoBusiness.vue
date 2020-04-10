<template>
    <div id="nob">
        <img src="../../assets/images/no_banli.png">
        <p>您还没有办理圈子视频彩铃业务</p>
        <van-button round class="btn" to="/service-ring">快去上传吧</van-button>
    </div>
</template>

<script>
    export default {
        name: "NoBusiness"
    }
</script>

<style scoped lang="scss">
    #nob {
        text-align: center;
        padding-top: 166px;

        img {
            width: 165px;
            height: 110px;
        }

        p {
            font-size: 16px;
            color: #333333;
            margin-top: 30px;
            font-weight: 600;
        }

        .btn {
            background: #458FCE;
            color: #fff;
            width: 140px;
            margin-top: 90px;
        }
    }
</style>
