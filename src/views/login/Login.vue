<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="header_pic_box">
        <img src="~assets/yuan.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-denglu"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-suo"
            type="password"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLogin } from 'network/login'
import { vaildName, vaildPassword } from 'common/validator'

export default {
  data() {
    return {
      // 表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 表单的验证规则对象
      loginFormRules: {
        username: vaildName,
        password: vaildPassword,
      },
    }
  },
  methods: {
    // 重置按钮
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 登录按钮
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data } = await getLogin(this.loginForm)
        if (data.meta.status !== 200) return this.$message.error('登录失败!')
        this.$message.success('登录成功!')
        // 将token保存到sessionStroage
        window.sessionStorage.setItem('token', data.data.token)
        // 跳转到主页
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background: url(~assets/beijing.jpg) no-repeat center -100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  .header_pic_box {
    height: 130px;
    width: 130px;
    border-radius: 50%;
    box-shadow: 0 0 3.5px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
