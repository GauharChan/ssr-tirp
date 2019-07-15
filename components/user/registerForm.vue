<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPass">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPass"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 非空,防止用户只输入空格
    let notnull = (rule, value, callback) => {
      if (value.trim().length <= 0) {
        callback(new Error("不能为空哦"));
      } else {
        callback();
      }
    };
    // 手机号，姓名，验证码不能为空
    let validateUsername = notnull;
    let validateNickname = notnull;
    let validateCaptcha = notnull;
    // 检测再次输入密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPass: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名或手机", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入你的名字", trigger: "blur" },
          { validator: validateNickname, trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validateCaptcha, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [
          // 自定义验证函数
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      this.$axios({
        method: "post",
        url: "captchas",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res);
        this.$confirm(`您的验证码：${res.data.code}`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      });
    },

    // 注册
    handleRegSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const { checkPass, ...submitForm } = this.form;
          this.$store.dispatch('user/register',submitForm)  // 调用actions的register方法，返回promise对象
          .then(() => {
            this.$message.success('注册成功')
            this.$router.push('/')
          })
          
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>