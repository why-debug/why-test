<template>
    <div id="box">
        <van-field v-model="members" placeholder="请输入成员号码" required type="textarea" rows="14"
                   :border="false" :error="!!rules.members.value"
                   @keyup.13="vali"/>
        <p>* 注意：<br/>
            1 . 若要添加多个号码，号码之间使用“换行符（回车）”分隔， 单次最多支持100个用户。<br/>
            2. 大批量号码导入，建议在电脑端导入。<br/>
            3. 当输入框号码后面出现“#错误消息”，比如“#号码不正确”时， 代表该行的号码格式错误或者非移动号码，需要修改。
        </p>
    </div>
</template>

<script>
    import { validateMobilePhone } from "@/api/common"

    export default {
        name: "AddMemberItem",
        props: ["memberItem", "submitData", "isError", "isTrim"],
        data() {
            return {
                members: "",
                membersList: [],
                rules: {
                    members: {
                        message: "请输入成员号码",
                        value: ""
                    }
                }
            }
        },
        methods: {
            vali() {
                let result = {
                    success: true,
                    msg: ""
                }

                const valiMobile = this.valiPhone()
                if(!!!this.members && !!!this.isTrim) {
                    this.rules.members.value = this.rules.members.message
                    result = {
                        success: false,
                        msg: this.rules.members.message
                    }
                } else if (!!valiMobile) {
                    this.rules.members.value = this.rules.members.message
                    result = {
                        success: false,
                        msg: valiMobile
                    }
                } else {
                    this.rules.members.value = ""
                }

                return result
            },
            valiPhone() {
                const _msisdnListTemp = this.members.split("\n")
                let _msisdnError = [], _msisdnList = [], _isSuccessBool = ""

                for(var i = 0; i < _msisdnListTemp.length; i++){
                    if(!!!_msisdnListTemp[i]) {
                        _msisdnError.push(_msisdnListTemp[i])
                        _msisdnList.push(_msisdnListTemp[i])
                        continue
                    }
                    const valiError = validateMobilePhone(_msisdnListTemp[i])
                    if(!!!valiError) {
                        _msisdnError.push(_msisdnListTemp[i])
                        _msisdnList.push(_msisdnListTemp[i])
                    } else {
                        const _index = _msisdnListTemp[i].indexOf("#")
                        _msisdnError.push(_msisdnListTemp[i].substring(0, _index > -1 ? _index : _msisdnListTemp[i].length)+"#"+valiError)
                        _isSuccessBool = valiError
                    }
                }

                if(!!_isSuccessBool){
                    this.members = _msisdnError.join("\n")
                    return _isSuccessBool
                }

                this.membersList = _msisdnList

                return _isSuccessBool
            }
        },
        watch: {
            memberItem(newVal) {
                if (newVal) {
                    this.members = this.memberItem
                } else {
                    this.members = ""
                }
            },
            submitData(newVal) {
                if (newVal) {
                    const vali = this.vali()
                    if(vali.success) {
                        this.$emit("update:isError", false)
                        this.$emit("refreshClick", {msisdns: this.membersList})
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: vali.msg,
                            duration: 2000
                        })
                        this.$emit("errorClick")
                    }
                    this.$emit("update:submitData", false)
                }
            },
            isError(newVal) {
                if (newVal) {
                    this.rules.members.value = this.rules.members.message
                    this.members = this.memberItem
                }
            }
        }
    }
</script>

<style scoped lang="scss">
#box {
    width: 100%;
    height: auto;
    padding: 0 13px;

    p {
        font-size: 12px;
        color: #A4A4A4;
        line-height: 22px;
    }
}
</style>