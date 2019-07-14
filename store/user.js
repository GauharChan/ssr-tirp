export const state = () => ({
  userInfo: {
    token:'',
    user:{}
  }
})

export const mutations = {
  setUserInfo(state, value) {
    state.userInfo = value
  }
}

export const actions = {
  setuser({
    commit
  }, value) {
    commit('setUserInfo', value)
  },
  login(store, data) {
    this.$axios({
        method: "post",
        url: "/accounts/login",
        data
      })
      .then(res => {
        store.commit('setUserInfo', res.data)
        // $store.dispatch('setuser',res.data)
        // console.log(this.state.user.userInfo);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
