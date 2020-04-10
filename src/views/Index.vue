<template>
</template>
<script>
  import {Storage, jumpHtml} from './../api/common'
  import api from './../api/basic'
  const overTime = new Storage()

  export default {
    name: "Index",
    mounted() {
        const code = this.$route.query.code
        const pageUrl = this.$route.query.state || ""
        const redirectUrl = this.$config.baseUrl
        const nowUrl = overTime.get('now_url') || ""

        let href = window.location.href
        if (href.includes(".html?code") && !!!code) {                  //url包括 com/?code 证明为从微信跳转回来的
            const url = href.substring(0, href.length - 2)         //vue自动在末尾加了 #/ 符号，截取去掉
            const jingPosit = url.indexOf(".html?code") + 5       //获取域名结束的位置
            const urlLeft = url.substring(0, jingPosit)            //url左侧部分
            const urlRight = url.substring(jingPosit, url.length)  //url右侧部分
            window.location.href = urlLeft + "#/" + urlRight        //拼接跳转
        } else {
            if(!!!code){
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.$config.appId + '&redirect_uri=' + encodeURIComponent(redirectUrl) + '&scope=snsapi_base&response_type=code&state=' + pageUrl + '#wechat_redirect'
            } else {
                api.wxLogin(code).then(res => {
                    const { data } = res
                    if(data.success) {
                        // this.$store.commit('newMsisdn', data.data.msisdn)
                        overTime.set('circleUserPhone', data.data.msisdn, 40000000)
                        overTime.set('hasOpenBiz', data.data.hasOpenBiz, 40000000)
                        overTime.set('hasJoinedNoCircle', data.data.hasJoinedNoCircle, 40000000)
                        overTime.set('saName', data.data.saName, 40000000)
                        if(data.data.currentRing){
                            overTime.set('currentRing', data.data.currentRing, 40000000)
                        }
                        overTime.set('role', data.data.role, 40000000)

                        window.location.href = redirectUrl + (jumpHtml(data.data.role, nowUrl) || "/home")
                    } else {
                        /*if(nowUrl == "/mine") {
                            this.$router.replace({
                                name: 'login',
                                params: {
                                    where: 'mine'
                                }
                            })
                        } else {*/
                        this.$router.replace('/login')
                        // }
                    }
                })
            }
        }
    }
  }
</script>