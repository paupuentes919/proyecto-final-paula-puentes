export default {
  namespaced: true,

    state: {
        userLogged: JSON.parse(localStorage.getItem('userLogged')) || null
    },
    
    getters: {
        userLogged: state => state.userLogged,
    },

    mutations: {
        SET_USER: (state, userLogged) => {
          if (userLogged) {
            // Ojo: no guardar el password en localStorage
            delete userLogged.password;
            state.userLogged = userLogged;
            localStorage.setItem('userLogged', JSON.stringify(userLogged));
          } else {
            state.userLogged = null;
            localStorage.removeItem('userLogged');
            window.location.reload(); // Cuando ingreso nuevamente, la contrse;a no me la toma
          }
        }
      },
      
    actions: {
        setUser: ({ commit }, userLogged) => {
          commit('SET_USER', userLogged)
        }
      }
}