export const state = () => ({
  userInfo: {
    token: '',
    user: {}
  },
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
}

export const actions = {
  // 登录
  login(store, data) {
    this.$axios({
        method: "post",
        url: "/accounts/login",
        data
      })
      .then(res => {
        store.commit('setUserInfo', res.data)
      })
      .catch(err => {
        console.log(err);
      });
  },

  // 注册
  register(store, data) {
    this.$axios({
      url: "/accounts/register",
      method: "post",
      data
    }).then(res => {
      // 调用登录的方法
      store.commit('setUserInfo', res.data)
    });
  }
}
