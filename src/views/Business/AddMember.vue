<template>
    <div id="add">
        <div class="header">
            <div>成员信息</div>
            <div @click="submitData">完成</div>
        </div>
        <add-member-item :member-item="msisdnList" :submit-data.sync="isSubmitMember" :is-error.sync="isMsisdnList" @refreshClick="memberSubmit"/>
    </div>
</template>

<script>
    import AddMemberItem from "./../components/AddMemberItem"
    import api from "@/api/basic"

    export default {
        name: "AddMember",
        components: {
            AddMemberItem
        },
        data() {
            return {
                circleId: "",
                isSubmitMember: false,
                isMsisdnList: false,
                msisdnList: "",
                sa: ""
            }
        },
        mounted() {
            this.$toast.loading({
                mask: true,
                message: '请稍候...',
                duration: 0
            })
            this.circleId = this.$route.query.id
            if(!!this.circleId) {
                api.circleInfo({circleId: this.circleId, msisdn: this.msisdn}).then(res => {
                    const { data } = res
                    this.sa = data.data.sa
                }).finally(_ => {
                    this.$toast.clear()
                })
            } else {
                this.$toast.clear()
            }
        },
        methods: {
            memberSubmit(form) {
                this.$toast.loading({
                    mask: true,
                    message: '请稍候...',
                    duration: 0
                })
                const {msisdns} = form
                const saName = this.sa || ""

                if(!!saName && saName.indexOf("广东") > -1) {
                    api.shareCircle({msisdns, circleId: this.circleId}).then(res => {
                        const { data } = res
                        if(data.code === this.$common.SUCCESS) {
                            this.$notify({
                                message: "添加成功",
                                duration: 2000,
                                background: '#07c160',
                                onClose: _ => {
                                    this.$router.go(-1)
                                }
                            })
                        } else {
                            this.$notify({
                                type: 'danger',
                                message: "添加成员返回错误",
                                duration: 2000
                            })
                        }
                    }).finally(_ => {
                        this.$toast.clear()
                    })
                } else {
                    api.addCircleMember({msisdns, circleId: this.circleId}).then(res => {
                        const {data} = res
                        if (data.code === this.$common.SUCCESS) {
                            if (msisdns.length === data.data.successList.length) {
                                this.$notify({
                                    message: "添加成功",
                                    duration: 2000,
                                    background: '#07c160',
                                    onClose: _ => {
                                        this.$router.go(-1)
                                    }
                                })
                            } else {
                                let msisdnList = []
                                msisdns.forEach(item => {
                                    data.data.failedList.forEach(it => {
                                        if (item === it.msisdn) {
                                            msisdnList.push(item + "#" + it.info)
                                        }
                                    })
                                })
                                this.msisdnList = msisdnList.join("\n")
                                this.isMsisdnList = true

                                this.$notify({
                                    type: 'danger',
                                    message: "添加成员返回错误",
                                    duration: 2000
                                })
                            }
                        } else {
                            this.$notify({
                                type: 'danger',
                                message: data.msg,
                                duration: 2000
                            })
                        }
                    }).finally(_ => {
                        this.$toast.clear()
                    })
                }
            },
            submitData() {
                this.isSubmitMember = true
            }
        }
    }
</script>

<style scoped lang="scss" src="./../../styles/add-header.scss"/>
