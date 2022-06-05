export default {
    data(){
        return{
            userLogged: null,
            lsUserKey: "UsuarioGuardado",// Esta key se debería llevar al .env
        }
    },
    created(){
        let userLoggedFromStorage = this.GetUserLoggedFromStorage();
        if(userLoggedFromStorage != null){
            this.userLogged = userLoggedFromStorage;
        }
    },
    methods: {
        SaveUserLogged(user){
            this.userLogged = user;
            console.log("A ver a ver que pasooooooooo", this.userLogged);
            localStorage.setItem(this.lsUserKey, JSON.stringify(user));
        },
        GetUserLoggedFromStorage(){
            return JSON.parse(localStorage.getItem(this.lsUserKey));
        }
    },
    computed:{
        getUserLogged(){
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", this.userLogged);
            return this.userLogged;
        }
    }
}