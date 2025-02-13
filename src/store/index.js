import { createStore } from 'vuex'

export default createStore({
  state: {
    restaurant:{
      name: 'Selecione um restaurante',
      id: 0
    }
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    setStore(state, {id, name}){
      state.restaurant.name = name ?? 'Selecione um restaurante'
      state.restaurant.id = id ?? 0
    }
  }
})
