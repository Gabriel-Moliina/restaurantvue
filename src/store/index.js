import { createStore } from 'vuex'

export default createStore({
  state: {
    restaurant:{
      name: 'Selecione um restaurante'
    }
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    storeNameRestaurant(state, name){
      state.restaurant.name = name
    }
  }
})
