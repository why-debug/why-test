<template>
    <div id="nob">
        <img src="../../assets/images/undraw_access_denied.png">
        <p>您目前无权访问</p>
    </div>
</template>

<script>
    export default {
        name: "WithoutPermission"
    }
</script>

<style scoped lang="scss">
    #nob {
        text-align: center;
        padding-top: 166px;

        img {
            width: 106px;
            height: 130px;
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
