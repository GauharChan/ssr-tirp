<template>
  <header class="head">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <nuxt-link class="logo" to="/">
        <h1></h1>
      </nuxt-link>
      <!-- 导航栏 -->
      <nav>
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </nav>
      <!-- 用户信息 -->
      <div class="userInfo">
        <!-- 判断token -->
        <nuxt-link v-if="!$store.state.user.userInfo.token" to="/user/login">登录 / 注册</nuxt-link>
        <!-- 登录后 -->
        <el-dropdown v-else>
          <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="" srcset="" class="avatar">
            {{$store.state.user.userInfo.user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleExit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </header>
</template>
<script>
export default {
  methods:{
    // 用户退出
    handleExit(){
      // 调用store的mutations方法修改token
      this.$store.commit('user/loginOut','')
      this.$message.success('退出成功 ')
    }
  }
};
</script>
<style lang='less' scoped>
header {
  box-shadow: 0 1px 3px #ccc;
  .main {
    width: 1000px;
    margin: 0 auto;
    .logo {
      width: 156px;
      h1 {
        background: url(http://157.122.54.189:9093/images/logo.jpg) no-repeat center;
        background-size: contain;
        height: 60px;
        margin: 0;
      }
    }
    nav {
      flex: 1;
      display: flex;
      margin-left: 15px;
      a {
        display: inline-block;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        &:hover {
          color: #409eff;
          border-bottom: 6px solid #409eff;
        }
      }
      .nuxt-link-exact-active{
        background: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
          border-bottom: 6px solid #409eff;
        }
      }
    }
    .userInfo {
      height: 60px;
      line-height: 60px;
      a {
        &:hover {
          text-decoration: underline;
          color: #409eff;
        }
      }
      .el-dropdown-link {
        cursor: pointer;
      }
      .avatar{
          width: 32px;
          height: 32px;
          vertical-align: middle;
          border-radius: 50%;
          border: 2px solid #fff;
          &:hover{
              border: 2px solid #409eff;
          }
      }
    }
  }
}
</style>