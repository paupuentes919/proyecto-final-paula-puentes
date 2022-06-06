import api from '../../services/api-services'

export default {
    namespaced: true,
  
      state: {
          cart: [],
          cantidad: null,
    
      },
      
      getters: {
        cart: state => state.cart,
        cantidad: state => state.cantidad,
          
      },
  
      mutations: {
        SET_CART: (state, carrito) => {
            state.cart = carrito;
            localStorage.setItem('cart', JSON.stringify(carrito));
        },
        ADD_TO_CART: (state, { product, cantidad}) => {

            const productInCart = state.cart.find(prod => prod.id == product.id)
            
            if (productInCart) {
                productInCart.quantity = cantidad;
                productInCart.total = productInCart.price * cantidad;
            } else {
              state.cart.push({
                ...product,
                quantity: cantidad,
                total: product.price * cantidad
              })
            }
          },
          
        },
      actions: {
        traerCarrito: ({ commit }) => {
            api.traerCarrito()
                .then(carrito => {
                  commit('SET_CART', carrito)
                })
                .catch(err => console.log(err))
          },
          actualizarCarrito: ({ commit }, product, cantidad) => {
            commit('ADD_TO_CART', {product, cantidad})
          }  
        }
  }