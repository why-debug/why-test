<template>
    <div id="box">
        <van-cell-group class="block-div" :border="false">
            <van-field v-model="form.circleName" required clearable label="圈子名称" placeholder="请输入圈子名称"
                       size="large" :label-width="laberWidth" :input-align="inputAlign" :error="!!rule.circleName.value"
                       error-message-align="right"
                       @blur="vali('circleName')"/>
            <van-field v-model="form.clientManagerName" required clearable label="客户经理姓名" placeholder="请输入客户经理姓名"
                       size="large" :label-width="laberWidth" :input-align="inputAlign" :error="!!rule.clientManagerName.value"
                       error-message-align="right"
                       @blur="vali('clientManagerName')"/>
            <van-field v-model="form.clientManagerNum" required clearable label="客户经理电话" placeholder="请输入客户经理电话"
                       size="large" :label-width="laberWidth" :input-align="inputAlign" :error="!!rule.clientManagerNum.value"
                       error-message-align="right"
                       @blur="vali('clientManagerNum')"/>
        </van-cell-group>
        <van-cell-group class="block-div" :border="false">
            <van-field v-model="form.circleManagerName" required clearable label="圈子主姓名" placeholder="请输入圈子主姓名"
                       size="large" :label-width="laberWidth" :input-align="inputAlign" :error="!!rule.circleManagerName.value"
                       error-message-align="right"
                       @blur="vali('circleManagerName')"/>
            <van-field v-model="form.msisdn" required clearable label="圈子主电话" placeholder="请输入圈子主电话"
                       size="large" :label-width="laberWidth" :input-align="inputAlign" :error="!!rule.msisdn.value"
                       error-message-align="right"
                       @blur="vali('msisdn')"/>
        </van-cell-group>
        <van-cell-group class="block-div" :border="false">
            <van-field-select-picker
                    label="开通资费"
                    placeholder="选择资费"
                    size="large" :label-width="laberWidth" :input-align="inputAlign"
                    required :error="!!rule.price.value"
                    error-message-align="right"
                    :columns="priceList"
                    @eventIndex="onEventIndex"/>
        </van-cell-group>
    </div>
</template>

<script>
    import VanFieldSelectPicker from "./VanFieldSelectPicker";
    export default {
        name: "CircleEditItem",
        components: {VanFieldSelectPicker},
        props: ["itemData", "submitData", "priceTypeList"],
        computed: {
            priceList() {
                let priceList = []
                this.priceTypeList.forEach(item => {
                    priceList.push(`${item.price}元/${item.unit}`)
                })
                return priceList
            }
        },
        data() {
            return {
                laberWidth: "120px",
                inputAlign: "right",
                form: {
                    circleName: "",
                    clientManagerName: "",
                    clientManagerNum: "",
                    circleManagerName: "",
                    msisdn: "",
                    price: ""
                },
                rule: {
                    circleName: {
                        message: "请输入圈子名称",
                        value: ""
                    },
                    clientManagerName: {
                        message: "请输入客户经理姓名",
                        value: ""
                    },
                    clientManagerNum: {
                        message: "请输入客户经理电话",
                        value: ""
                    },
                    circleManagerName: {
                        message: "请输入圈子主姓名",
                        value: ""
                    },
                    msisdn: {
                        message: "请输入圈子主电话",
                        value: ""
                    },
                    price: {
                        message: "请选择资费",
                        value: ""
                    }
                }
            }
        },
        methods: {
            onEventIndex(index) {
                this.form.price = this.priceTypeList[index].price
            },
            vali(key) {
                let isResult = true
                if(key) {
                    if(!!!this.form[key]) {
                        this.rule[key].value = this.rule[key].message
                        isResult = false
                    } else {
                        this.rule[key].value = ""
                    }
                } else {
                    Object.keys(this.form).forEach(key => {
                        if(!!!this.form[key]) {
                            this.rule[key].value = this.rule[key].message
                            isResult = false
                        }

                        if(isResult && (key == "msisdn" || key == "clientManagerNum")) {
                            if(this.form[key].length != 11) {
                                this.rule[key].value = "请输入11位正确的手机号码"
                                isResult = false
                            }
                        }
                    })
                }
                return isResult
            }
        },
        watch: {
            itemData(newVal) {
                if (newVal && newVal.circleName) {
                    Object.keys(this.form).forEach(key => {
                        this.form[key] = newVal[key]
                    })
                } else {
                    Object.keys(this.form).forEach(key => {
                        this.form[key] = ""
                    })
                }
            },
            submitData(newVal) {
                if (newVal) {
                    if(this.vali()) {
                        this.$emit("refreshClick", this.form)
                    } else {
                        this.$notify({
                            type: 'warning',
                            message: "请输入必填或正确数据",
                            duration: 2000
                        })
                        this.$emit("errorClick")
                    }
                    this.$emit("update:submitData", false)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
#box {
    /deep/ .van-cell--large {
        padding: 18px 16px;
    }

    .block-div {
        margin-top: 10px;

        &:first-child {
            margin-top: 0;
        }
    }
}
</style>