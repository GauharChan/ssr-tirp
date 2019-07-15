export const state = () => ({
  userInfo: {
    token:'',
    user:{}
  }
})

export const mutations = {
  // 设置保存用户数据
  setUserInfo(state, value) {
    state.userInfo = value
  },
  // 清除token，用户退出
  loginOut(state,value){
    state.userInfo.token = value 
  }
}

export const actions = {
  
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
  }
}
