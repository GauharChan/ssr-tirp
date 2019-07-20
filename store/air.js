export const state = () => {
  return{
    price: 0
  }
}

export const mutations = {
  setPrice(state,value) {
    state.price = value;
  }
}
