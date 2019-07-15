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
  register(store,data){
    return this.$axios({
      method:'post',
      url:'accounts/register',
      data
    })
    .then((res) => {
      // 成功
      // resolved
      store.commit('setUserInfo',res.data)  
    })
  }
}
