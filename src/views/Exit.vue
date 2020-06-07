<template>
  <h1>正在执行退出系统...</h1>
</template>

<script>
export default {
    mounted(){
        // 清除登录标识
        sessionStorage.clear()
        window.location.href='./'
    }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
</style>