import axios from "axios"
import qs from 'querystring'
import store from '../store'
// import Vue from 'vue'
store.state.Gztdtj = 100;

import {
    Storage
} from './common'
const overTime = new Storage()

export const service = axios.create({
    baseURL: "/qd", // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 120000 // request timeout
})
const serviceSms = axios.create({
    baseURL: "/qd", // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 120000 // request timeout
})

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            const {
                data
            } = response
            if (data.code == "000001") { //未登录
                overTime.remove("circleUserPhone")
                overTime.remove("hasOpenBiz")
                overTime.remove("hasJoinedNoCircle")
                overTime.remove('currentRing')
                overTime.remove('loginShow')
            }
        }
        return response
    }
)

export default {
    data() {
        return {
            videoProgress: 0
        }
    },
    //发送验证码
    sendCode(params) {
        return service.get('/sa/circleSendSmsVcode', {
            params
        }).then()
    },
    //登录
    login(params) {
        return service.get('/sa/circleH5Login', {
            params
        }).then()
    },
    //铃音列表
    ringList(params) {
        return service.get('/circle/ringList', {
            params
        }).then()
    },
    //删除铃音
    removeRing(circleRingId) {
        return service.get('/circle/delRing', {
            params: {
                circleRingId
            }
        }).then()
    },
    //设置铃音
    settingRing({
        msisdn = "",
        circleRingId = "",
        circleId = ""
    }) {
        return service.get("/circle/setRing", {
            params: {
                msisdn,
                circleRingId,
                circleId
            }
        })
    },
    //创建圈子
    addCircle(params) {
        return service.get('/circle/addCircle', {
            params
        }).then()
    },
    //案例列表
    sampleRings(params) {
        return service.get('/sa/sampleRings', {
            params
        }).then()
    },
    //开通业务
    openBiz(params) {
        return service.get('/circle/openBiz', {
            params
        }).then()
    },
    //上传铃音
    uploadRing(data) {
        let self = this
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                let complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                store.commit('newvideoPro', progressEvent.loaded)
                store.commit('newvideoSpeed', complete)
                store.commit('newvideoTotal', progressEvent.total)
            }
        }
        let formData = new FormData()
        for (let item in data) {
            formData.append(item, data[item])
        }
        return service.post('/circle/uploadRing', formData, config).then()
    },
    memberRingList(data) {
        return service.post('/member/ringList', qs.stringify(data)).then()
    },
    //新登录
    login2(params) {
        return service.get('/sa/circleH5Login2', {
            params
        }).then()
    },
    //微信登录
    wxLogin(code = "") {
        return service.get('/sa/wxLogin', {
            params: {
                code
            }
        }).then()
    },
    // 获取圈子列表
    circleList({
        page = 1,
        limit = 10,
        msisdn = "",
        circleName = "",
    }) {
        return service.get("/circle/circleList", {
            params: {
                msisdn,
                circleName,
                page,
                limit,
            }
        }).then()
    },
    // 获取圈子信息
    circleInfo({
        circleId = "",
        msisdn = ""
    }) {
        return service.get("/circle/circleInfo", {
            params: {
                circleId,
                msisdn
            }
        }).then()
    },
    // 删除圈子
    removeCircle(params) {
        return service.get("/circle/delCircle", {
            params
        }).then()
    },
    // 添加成员
    addCircleMember({
        circleId = "",
        msisdns = []
    }) {
        return service.post("/circle/addMember", {
            circleId,
            msisdns
        }).then()
    },
    shareCircle({
        circleId = "",
        msisdns = []
    }) {
        return service.post("/circle/shareCircle", {
            circleId,
            msisdns
        }).then()
    },
    // 成员列表
    circleMemberList({
        page = 1,
        limit = 10,
        circleId = "",
        msisdn = ""
    }) {
        return service.get("/circle/memberList", {
            params: {
                page,
                limit,
                circleId,
                msisdn
            }
        }).then()
    },
    // 删除成员
    removeCircleMember(memberList) {
        return service.post("/circle/delMember", memberList).then()
    },
    circleRemindOpenBiz({
        circleId = "",
        memberIds = [],
        allFlag = ""
    }) {
        return service.post("/circle/remindOpenBiz", {
            circleId,
            memberIds,
            allFlag
        }).then()
    },
    // 分享加入
    circleShareJoin({
        circleId = "",
        msisdn = "",
        smsVcode = ""
    }) {
        return service.post("/circle/shareJoin", qs.stringify({
            circleId,
            msisdn,
            smsVcode
        })).then()
    },
    syncRingList({
        page = 1,
        limit = 10
    }) {
        return service.get("/circle/getSyncRing", {
            params: {
                page,
                limit
            }
        }).then()
    },
    syncSettingRing(ringId, circleId) {
        return service.get("/circle/setSyncRing", {
            params: {
                ringId,
                circleId
            }
        }).then()
    },
    //退出圈子
    exitCircle({
        msisdn,
        smsVcode
    }) {
        return service.post("/circle/exitCircle", qs.stringify({
            msisdn,
            smsVcode
        })).then()
    },
    //获取资费
    getCirclePrice({
        msisdn = "",
        type,
        sa = ""
    }) {
        return service.post("/circle/getRatesList", qs.stringify({
            msisdn,
            type,
            sa
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then()
    },

    getOrderInfo(seq) {
        return serviceSms.get(`/circle/order/orderInfo?seq=${seq}`)
    },
    sendOrderSms(seq) {
        return serviceSms.get(`/circle/order/sendSmsVcode?seq=${seq}`)
    },
    sendTFOpenBiz({
        seq,
        smsVcode
    }) {
        return serviceSms.get(`/circle/order/tfOpenBiz?seq=${seq}&smsVcode=${smsVcode}`)
    }
}