<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <div class="logo">
        <div class="login-logo">
          <!-- <img src="../../assets/images/logo.gif" alt=""> -->
          <p>广告管理平台</p>
        </div>
      </div>
      <Card icon="log-in">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
      <div class="xcm-login-footer">
          <span>xxxxxxxxx有限公司</span><br>
          <span>2017-2018 &copy; www.xxxxxxxxxx.cn All Rights Reserved 宁ICP备xxxxx号</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ivu-card {
  background:#fcfcfc;
}
.login-logo {
  width:100%;
  margin:-60px auto 20px;
  text-align:center;
  img{
    width:90px;
    height:90px;
    vertical-align: middle;
  }
  p {
    display: inline-block;
    color:#f4f4f4;
    font-size:28px;
    vertical-align: middle;
    font-weight:600;
  }
}
.xcm-login-footer {
  margin:30px 0 0;
  color:#ccc;
  font-size:14px;
  text-align:center;
}
</style>
<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: 'home'
          })
        })
      })
    }
  }
}
</script>

<style>

</style>
