import { createStore } from 'vuex'

export default createStore({
  state: {
    restaurant: {
      name: 'Selecione um restaurante',
      id: 0
    },
    user: {
      id: 0,
      name: ''
    }
  },
  getters: {
  },
  actions: {
  },
  mutations: {
    setRestaurant(state, { id, name }) {
      state.restaurant.name = name ?? 'Selecione um restaurante'
      state.restaurant.id = id ?? 0
    },
    setUser(state, { id, name }) {
      state.user.id = id
      state.user.name = name
    }
  }
})
