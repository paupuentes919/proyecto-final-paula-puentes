import Vue from 'vue'
import Vuex from 'vuex'
import userLogged from "./modules/userLogged";
import api from '../services/api-services'

Vue.use(Vuex)
export default new Vuex.Store({
    strict: true,
    state:{
        products: []

    },
    getters:{
        products: state => state.products,
    },
    mutations:{
        SET_PRODUCTS: (state, productsApi) => {
            state.products = productsApi
        }
    },
    actions:{
        traerProductos: ({ commit }) => {
            api.traerProductos()
                .then(productsApi => {
                  commit('SET_PRODUCTS', productsApi)
                })
                .catch(err => console.log(err))
          }
    },
    modules:{
        userLogged

    }
})