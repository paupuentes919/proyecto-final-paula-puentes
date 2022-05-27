<template>
  <div>
    <MenuProductos tituloCentral="Sign-Up"/>
    <div class="contenido">
        <div class="row">
            <label for="inputUsername" class="typo-input">Usuario
                <span v-if="usernameOk">✅</span>
                </label>
                    <input
                        type="text"
                        id="inputUsername"
                        class="form-control"
                        v-model="newUser.username"
                        @keyup="validarUsername"
                        required
                    >
            <label for="inputPassword" class="typo-input">Contraseña
                <span v-if="passwordOk">✅</span>
                </label>
                    <input
                        type="text"
                        id="inputPassword"
                        class="form-control"
                        v-model="newUser.password"
                        @keyup="validarPassword"
                        required
                    >
            <label for="inputEmail" class="typo-input">Email
                <span v-if="emailOk">✅</span>
                </label>
                    <input
                        type="text"
                        id="inputEmail"
                        class="form-control"
                        v-model="newUser.email"
                        @keyup="validarEmail"
                        required
                    >  
            <button class="btn-modalLogin" @click="crearUsuario">Registrarse</button> 
        </div>
    </div>
  </div>
</template>


<script>

import MenuProductos from '../components/MenuProductos.vue'
import api from '../services/api-services'

export default {
    components:{
        MenuProductos
    },
    data: () => ({
        //users: [],
        //nuevoUser: [],
        newUser:{
          username:'',
          password:'',
          email: '',
          isAdmin: false
        },
        usernameOk: false,
        passwordOk: false,
        emailOk: false
    }),
    async created(){
        this.users = await api.traerUsuarios();
        console.log("users", this.users)
    },
    mounted(){
        //this.crearUsuario();
    },
    methods:{
         validarUsername(){
              this.users.forEach( element => {
                if (this.newUser.username.length < 3 || element.username == this.newUser.username) {
                    this.usernameOk = false;//No permitimos nombres de menos de 3 caracteres o nombres repetidos
                     console.log("username", this.usernameOk);
                }else {
                    this.usernameOk = true;
                     console.log("username", this.usernameOk);
                }
            })
        },
        validarPassword(){
                if (this.newUser.password.length < 3) {
                    this.passwordOK = false;//No permitimos passwords de menos de 3 caracteres 
                }else {
                    this.passwordOK = true;
                }
        },
        validarEmail(){
             let regexEmail =/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/ 
              this.users.forEach( element => {
                if (element.email == this.newUser.email) {
                    this.emailOk = false;//No permitimos emails repetidos
                }else if (regexEmail.test(this.newUser.email)){
                    this.emailOk = true;
                }
            })
        },
        async crearUsuario(){
            await api.crearUsuario(this.newUser);
            this.$router.push({name:"UserView"}); //como hago para ir a la vista de user ya logueado???
        }
    }

}
</script>

<style scoped>
.contenido{
    background: white;
    
}

</style>