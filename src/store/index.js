import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  plugins: [
    createPersistedState({storage: window.sessionStorage}),
  ],
  getters: {
  },
  mutations: {
    addProduct(state, payload) {
      const existingProduct = state.cart.find(o => o.id === payload.id)

      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        payload.qty = 1
        state.cart.push(payload);
      }
    },
    removeItem(state, payload) {
      // state.cart =  state.cart.filter(o => o.id != payload.id)
      //  const index = state.cart.findIndex(item => item.id === payload.id);
      //  if(index > -1){
      //    Vue.delete(this.cart.id, index)
      //  }
       const index = state.cart.findIndex(i => i.id == this.state.cart.id);
      state.cart.splice(index, 1);

    },
    //create mutation update cart
    UPDATECART(state, payload) {
      state.cart = [...payload];
    },
  },
  actions: {
    removeItem({ commit }, cart) {
      commit('removeItem', cart)
    },
    //create action update cart
    updateProductChecked({ commit }, carts) {
      commit('UPDATECART', carts);
    },
  },

})

