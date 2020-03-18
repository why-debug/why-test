<template>
  <div class="talk">
    <div>
      <p>
        <img  style="border-radius: 50px" src="../assets/logo.png" alt width="80px"/>
      </p>
      <p>
        职业顾问：
        <span style="color:#62ab00">张小妹</span>
      </p>
      <p>专业服务诚信做人诚心做事</p>
      <Button type="success" style="margin-top:20px">我要聊天</Button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.talk {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  background: #f5f5f9;
  div {
    width: 80%;
    height: 50%;
    text-align: center;
    background: #fff;
    padding: 20px 0;
    p{
        line-height: 20px;
        img{
            background: #7ac2fc;
            margin-bottom: 20px;
        }
    }
  }
}
</style>