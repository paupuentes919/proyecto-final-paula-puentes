<template>
  <div>
    <MenuProductos tituloCentral="Sign-Up"/>
    <div class="container">
        <div class="row">
            <div class="col col-12">
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
                    <span v-if="validar.username" class="warning">{{validar.username}}</span>
                    <br>
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
                    <span v-if="validar.password" class="warning">{{validar.password}}</span>
                    <br>
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
                    <br>
                    <span v-if="validar.email" class="warning">{{validar.email}}</span> 
                    <br>
                <button class="btn-modalLogin" @click="crearUsuario">Registrarse</button> 
                <br>
                <span v-if="validar.datos" class="warning">{{validar.datos}}</span> 
            </div>
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
        validar:{
            username: '',
            password: '',
            email: '',
            datos: ''
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
             this.validar.datos ='';
             this.validar.username ='';
             let userName = this.users.find(user => user.username === this.newUser.username);
             if(this.newUser.username == '')
                this.usernameOk = false;
             else if (this.newUser.username.length < 3 && !userName){
                this.usernameOk = false;
                this.validar.username = 'Por favor, elegir un username mayor a 3 caracteres';
             }   
             else if(userName){
                this.validar.username = 'Ya existe un usuario con ese nombre';
                this.usernameOk = false;
             }
             else if(!userName)
                this.usernameOk = true;
        },
        validarPassword(){
            this.validar.datos ='';
            this.validar.password ='';
            if(this.newUser.password == '')
                this.passwordOk = false;
            else if (this.newUser.password.length < 3){
                this.passwordOk = false;
                this.validar.password = 'Por favor, elegir una contraseña mayor a 3 caracteres';
            }
            else{
                this.passwordOk = true;
            }
        },
        validarEmail(){
             this.validar.datos ='';
             let regexEmail =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ ;
             this.validar.email ='';
             let userEmail = this.users.find(user => user.email === this.newUser.email);
             if(this.newUser.email == '')
                this.newUser.email = false;
             else if (userEmail){
                this.emailOk = false;
                this.validar.email = 'Ya existe un usuario con ese email';
             }
             else if (!regexEmail.test(this.newUser.email)){
                 this.emailOk = false;
                this.validar.email = 'Formato email invalido';
             }
             else if (regexEmail.test(this.newUser.email) && !userEmail)  
                this.emailOk = true;
        },
        async crearUsuario(){
            if (this.usernameOk && this.passwordOk && this.emailOk){
                await api.crearUsuario(this.newUser);
                this.$router.push({name:"UserView"}); //como hago para ir a la vista de user ya logueado???
            }
            else{
                this.validar.datos='Por favor, revisar los datos';
            }       
        },
    }

}
</script>

<style scoped>
.container{
    box-shadow: 100px 100px 200px;
}
.col-12{
    padding: 2rem;
    background: black;
    border: 40px double rgb(25, 131, 218);
}
.typo-input{
    color: yellow;
    font-family: 'Press Start 2P', cursive;
    margin: 1.5rem 0;
}
.btn-modalLogin{
    background: rgb(103, 214, 103);
    font-family: 'Press Start 2P', cursive;
    height: 3.5rem;
    box-shadow: 1px 1px 2px white;
    border-radius: 10px;
    margin: 1.5rem 0;
}
.form-control{
    font-family: 'Press Start 2P', cursive;
}
.warning{
    color: red;
    font-family: 'Press Start 2P', cursive;
    font-size: smaller;
}

</style>