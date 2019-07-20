export const state = () => ({
  userInfo: {
    token: '',
    user: {}
  },
  phoneCode: ''
})

export const mutations = {
  // 设置保存用户数据
  setUserInfo(state, value) {
    state.userInfo = value
  },
  // 清除token，用户退出
  loginOut(state, value) {
    state.userInfo.token = value
  },
  setCode(state,value){
    state.phoneCode = value
  }
}

export const actions = {
  // 登录
  login(store, data) {
    return this.$axios({
        method: "post",
        url: "/accounts/login",
        data
      })
      .then(res => {
        const data = res.data
        store.commit('setUserInfo', data)
        return data
      })

  },
  // 注册
  register(store, data) {
    return this.$axios({
        method: 'post',
        url: 'accounts/register',
        data
      })
      .then((res) => {
        // 成功
        // resolved
        store.commit('setUserInfo', res.data)
      })
  },
  // 手机验证码
  code(store, value) {
    return this.$axios({
        url: 'captchas',
        method: "post",
        data: {
          tel: value
        }
      })
      .then((res) => {
        store.commit('setCode',res.data.code)
      })
  }
}
