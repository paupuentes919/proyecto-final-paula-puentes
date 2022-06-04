export default {
    namespaced: true,
    state: {
        userLogged: null,
        lsUserKey: "UsuarioGuardado"// FIXME: Esta key se podría llevar al .env
    },
    getters: {
        userAdmin(state){
            if (state.userLogged != null){
                if (state.userLogged.isAdmin){
                    return true;
                }
            }
            return false;

            //TODO: Todo lo de arriba se podría resumir a esto (si lo entendes borrá lo de arriba 
            //y descomentá la siguiente línea):
            //return state.userLogged?.isAdmin;
        }
    },
    mutations: {
        setUserLogged(state, payload) {
            state.userLogged = payload;//La mutation actualiza la variable "user"
        }
    },
    actions: {
        SetUserLoggedFromLogin(context, user) {
            //Guardamos en el local storage...
            localStorage.setItem(context.state.lsUserKey, JSON.stringify(user));
            //...y además lo guardamos en nuestro estore, llamando a la mutation
            context.commit("setUserLogged", user);
        },
        SetUserLoggedFromLocalStorage(context){
            let userFromLocalStorage = JSON.parse(localStorage.getItem(context.state.lsUserKey));
            context.commit("setUserLogged", userFromLocalStorage);
        }
    },
}
