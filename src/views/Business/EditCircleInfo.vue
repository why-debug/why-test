<template>
    <div id="edit">
        <div class="header">
            <div>基本信息</div>
            <div @click="submitData">完成</div>
        </div>
        <circle-edit-item :item-data="basicObject" :submit-data.sync="isSubmitBasic" @refreshClick="basicSubmit"/>
    </div>
</template>

<script>
    import CircleEditItem from "./../components/CircleEditItem"
    export default {
        name: "EditCircleInfo",
        components: {
            CircleEditItem
        },
        data() {
            return {
                basicObject: {
                    circleName: "",
                    customerName: "",
                    customerTel: "",
                    cmasterName: "",
                    cmasterTel: "",
                },
                isSubmitBasic: false
            }
        },
        mounted() {

        },
        methods: {
            basicSubmit(form) {
                this.basicObject = form
                this.$notify({
                    message: "更新成功",
                    duration: 2000,
                    background: '#07c160',
                    onClose: _ => {
                        this.$router.go(-1)
                    }
                })
            },
            submitData() {
                this.isSubmitBasic = true
            }
        }
    }
</script>

<style scoped lang="scss" src="./../../styles/add-header.scss"/>