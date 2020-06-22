<template>
    <div id="login">
        <el-row :gutter="20">
            <h2>系统登陆</h2>
            <el-col :span="7" :offset="8">
                <div class="grid-content bg-purple">
                    <el-form
                        :model="formInline"
                        class="demo-form-inline"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="80px"
                    >
                        <el-form-item label="账户" prop="name">
                            <el-input
                                v-model="formInline.name"
                                @keyup.enter.native="keyupClick"
                                prefix-icon="el-icon-user-solid"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input
                                type="password"
                                prefix-icon="el-icon-lock"
                                v-model="formInline.pwd"
                                show-password
                                ref="mima"
                            ></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="Log('ruleForm')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formInline: {
                name: "",
                pwd: ""
            },
            rules: {
                name: [
                    { required: true, message: "请输入账户", trigger: "blur" },
                    {
                        min: 3,
                        max: 20,
                        message: "长度在 3 到 20 个字符",
                        trigger: "blur"
                    }
                ],
                pwd: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 12,
                        message: "长度在 6 到 12 个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        // 回车键登录
        let that = this;
        document.onkeydown = function(e) {
            e = window.event || e;
            if (
                that.$route.path == "/" &&
                (e.code == "Enter" || e.code == "Num Enter")
            ) {
                //验证在登录界面和按得键是回车键enter
                that.Log("ruleForm"); //登录函数
            }
        };
    },
    methods: {
        Log(formName) {
            var that = this;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // location.href = "#/Index";
                    // let data = new FormData();
                    // data.append("account", that.formInline.name);
                    // data.append("password", that.formInline.pwd);
                    var account = that.formInline.name;
                    var password = that.formInline.pwd;
                    this.axios
                        .post(
                            "users.php?a=login",
                            "account=" + account + "&password=" + password
                        )
                        .then(res => {
                            console.log(res.data);
                            if (res.data.code == 0) {
                                sessionStorage.setItem("token", res.data.token);
                                sessionStorage.setItem("id", res.data.data.id);
                                // sessionStorage.setItem("imgUrl", res.data.data.imgUrl);
                                // sessionStorage.setItem("account", res.data.data.account);
                                sessionStorage.setItem(
                                    "user",
                                    JSON.stringify(res.data.data)
                                );
                                that.$router.push("/Index/home");
                                this.$message({
                                    message: "恭喜你，登录成功！",
                                    type: "success"
                                });
                            } else {
                                this.$message.error(res.data.msg);
                                return false;
                            }
                        });
                } else {
                    return false;
                }
            });
        },
        keyupClick() {
            this.$refs.mima.focus();
        }
    }
};
</script>
<style scoped>
#login h2 {
    margin-top: 150px;
    padding-bottom: 20px;
    text-align: center;
    color: #fff;
    font: 24px/2em 微软雅黑;
}
button {
    width: 100%;
}
#login {
    background: #2d3a4b;
    height: 100%;
}
</style>