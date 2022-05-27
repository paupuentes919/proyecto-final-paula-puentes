<template>
  <vue-final-modal
    name="LoginModal"
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    v-on="$listeners"
  >  
    <div class="modal">
        <div class="contenido">
            <button class="modal__close boton" @click="close">X</button>
            <img src="../assets/pacman-fantasmitas.jpg" class="modal-image">

            <div class="row">
                <label for="inputUsername" class="typo-input">Usuario
                    <span v-if="usernameOk">✅</span> 
                </label>
                    <input
                        type="text"
                        id="inputUsername"
                        class="form-control"
                        v-model="user.username"
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
                        v-model="user.password"
                        @keyup="validarPassword"
                        required
                    >
            <span class="failLoginRed" v-if="failLogin">Usuario o contraseña inválido</span>
            </div>
           
            <button class="btn-modalLogin" @click="validarDatos">Iniciar Sesion</button>
            <h4 class="register">No estas registrado? Registrate aqui:</h4>
            <button class="btn-modalLogin" @click="registrarse">Registrarse</button> 
            <div class="row">
                <span class="failLoginRed" v-if="registerDone">Ya estas registrado</span>  
            </div>  
        </div>
    </div>

  </vue-final-modal>
</template>

<script>



import { $vfm, VueFinalModal} from 'vue-final-modal'
import api from '../services/api-services'

export default {
    components:{
        VueFinalModal
    },
    data: () => ({
      users: [],
      userLogin: null,
      user:{
          username:'',
          password:'',
      },
      usernameOk: false,
      passwordOk: false,
      failLogin: false,
      registerDone: false

    }),
    async created(){
        this.users = await api.traerUsuarios();
        console.log("users", this.users)
    },
    mounted(){
    },
    methods:{
        validarUsername(){
            if (this.user.username.length < 3) {
                this.usernameOk = false;//No permitimos nombres de menos de 3 caracteres
            }else {
                this.usernameOk = true;
            }
        },
        validarPassword(){
            if (this.user.password.length < 3) {
                this.passwordOk = false;//No permitimos passwords de menos de 3 caracteres
            }else {
                this.passwordOk = true;
            }
        },
        validarDatos(){
            let datosValidos = false;
            this.users.forEach( element => {
                if( element.username == this.user.username && element.password == this.user.password){
                    datosValidos = true;
                    //Acá guardamos el usuario logueado en el storage, para luego recuperarlo en alguna otra vista.
                    localStorage.setItem("userLogin", JSON.stringify(element));
                    if (element.isAdmin)
                        this.$router.push({name:"AdminView"})
                    else
                        this.$router.push({name:"UserView"})
                    this.close();
                }    
            })

            if (datosValidos == false){
                this.failLogin = true; 
            }
        },
        registrarse(){
             this.users.forEach( element => {
                  if( element.username == this.user.username && element.password == this.user.password){
                      this.registerDone = true;
                  }
                  else if (this.registerDone == false){
                      this.$router.push({name:"SignUpView"})
                      this.close();
                  }      
             })     
        },
        close(){
            $vfm.hide('LoginModal'); 
        },
    }
    
}
</script>

<style scoped>

.modal{
    display: flex;
    justify-content: center;
    top: 7rem;
    
}
.contenido{
    background: black;
    border: 5px solid rgb(17, 110, 231);
    width: 50%;
    height: 85%;
    overflow: scroll;
    top: 0;
    right: 20%;
    z-index: 3;
}
.boton{
    display: flex;
    justify-content: right;
    background: red;
    color: white;
    font-size: 30px;
    font-family: 'Press Start 2P', cursive;
    border: 3px solid black;
    width: 3rem;
    height: 3rem;
}
.typo-input{
    color: yellow;
    font-family: 'Press Start 2P', cursive;
    margin-bottom: 1rem;
}
.modal .form-control{
    margin-bottom: 1.5rem;
    /* margin-left: 15rem; */
    width: 60%;
    display: flex;
    justify-content: center;
}
.modal-image{ 
    width: 30rem;
    margin-bottom: 2rem;
}
.row{
    justify-content: center;
}
.btn-modalLogin{
    background: rgb(103, 214, 103);
    font-family: 'Press Start 2P', cursive;
    height: 3.5rem;
    box-shadow: 1px 1px 2px white;
    border-radius: 10px;
    margin: 2.5rem 0;
}
.register{
    color: yellow;
    font-family: 'Press Start 2P', cursive;
    font-size: medium;
    margin-bottom: 0;
    margin-top: 2rem;
}
.failLoginRed{
    color: red;
    font-family: 'Press Start 2P', cursive;
    font-size: smaller;
}

</style>