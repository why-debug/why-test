<template>
    <div id="exhibition">
        <div class="top-container">
            <div class="top-box">
                <img src="@/assets/images/detail-icon.png">
                <div class="cicle-name">{{infos.circleName || ""}}</div>
            </div>
        </div>

        <div class="code">
            <canvas id="canvas" style="width: 200px;height: 200px;" v-if="!!!codeImg"></canvas>
            <img :src="codeImg" style="width: 200px;height: 200px;" v-else>
        </div>

        <div class="bottom">扫描二维码，加入圈子</div>
    </div>
</template>

<script>
    import api from "@/api/basic"
    import config from "@/utils/config"
    import QRCode from "qrcode"

    export default {
        name: "Exhibition",
        data() {
            return {
                circleId: "",
                infos: {},
                codeImg: ""
            }
        },
        mounted() {
            this.circleId = this.$route.query.id
            this.circleInfo()
            this.qrcodeView()
            localStorage.setItem('said',this.circleId)
            // console.log(this.circleId,this.infos,this.codeImg);
            
        },
        methods: {
            circleInfo() {
                api.circleInfo({circleId: this.circleId}).then(res => {
                    const { data } = res
                    this.infos = data.data
                })
            },
            qrcodeView() {
                const that = this
                const canvas = document.getElementById("canvas")
                QRCode.toCanvas(canvas, config.baseUrl+"/share?id="+this.circleId, function (error) {
                    if (error) console.error(error)
                    console.log('QRCode success!')

                    const img = convertCanvasToImage(canvas)
                    that.codeImg = img.src
                    //从 canvas 提取图片 image
                    function convertCanvasToImage(canvas) {
                        //新建Image对象
                        var image = new Image();
                        // canvas.toDataURL 返回的是一串Base64编码的URL
                        image.src = canvas.toDataURL("image/png");
                        return image;
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
#exhibition {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    flex-flow: column wrap;

    .code {
        position: relative;
        padding: 20px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .top-container {
        width: 100%;
        height: auto;
        background-color: #fff;
        padding: 0 20px;

        .top-box {
            position: relative;
            text-align: center;
            padding: 36px 0 30px;
            font-size: 15px;
            color: #333333;
            line-height: 30px;
            border-bottom: 1px solid #EBEBEB;

            .share {
                position: absolute;
                right: 0;
                top: 13px;
                padding: 13px;
                width: 40px;
                height: 40px;
            }

            .cicle-name {
                font-size: 18px;
                font-weight: 600;
            }

            img {
                width: 46px;
                height: 46px;
            }

            .text-one {
                font-size: 18px;
                font-weight: bold;
                color: #333333;
            }

            .click-open {
                width: 90px;
                margin: 0 auto;
                text-align: center;
                color: #458FCE;
            }
        }
    }

    .bottom {
        font-size: 14px;
        color: #333333
    }
}
</style>