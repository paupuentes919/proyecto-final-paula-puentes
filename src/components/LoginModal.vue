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
            
            <button @click="validarDatos">Iniciar Sesion</button>
            <h4>No estas registrado? Registrate aqui:</h4>
            <button>Registrarse</button>     
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
      user:{
          username:'',
          password:'',
          email:''
      },
      usernameOk: false,
      passwordOk: false,
      failLogin: false,

    }),
  
    mounted(){
        this.traerUsuarios();
    },
    methods:{
        async traerUsuarios(){
        this.users = await api.traerUsuarios();
        console.log("users", this.users)
    },
    validarUsername(){
        this.users.forEach(element => {
            if (element.username == this.user.username){
                   return this.usernameOk = true;
            }    
        });
    },
     validarPassword(){
        this.users.forEach(element => {
            if (element.password == this.user.password){
                   return this.passwordOk = true;
            }    
        });
    },
    validarDatos(){
        if( this.usernameOk && this.passwordOk){
            this.close();
        }
    },
    close(){
        $vfm.hide('LoginModal'); 
    },
    }
    
}
</script>

<style scoped>
.warning{
    background: red;

}
.hide{
    color: black;
}

.modal{
    display: flex;
    justify-content: center;
    top: 7rem;
    
}
.contenido{
    background: black;
    border: 5px solid rgb(17, 110, 231);
    width: 50%;
    height: 80%;
    overflow: scroll;
    top: 0;
    right: 20%;
    z-index: 3;
}
.botones{
    display: flex;
    justify-content: right;
    margin-left: 2rem;
    

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
.boton-menos{
    background: red;
    color: white;
    font-size: 30px;
    font-family: 'Press Start 2P', cursive;
    border: 3px solid black;
    width: 3rem;
    height: 3rem;
}
.boton-mas{
    background: green;
    color: white;
    font-size: 30px;
    font-family: 'Press Start 2P', cursive;
    border: 3px solid black;
    width: 3rem;
    height: 3rem;
}
.text-title{
    color: yellow;
    font-family: 'Press Start 2P', cursive;
    font-size: xx-large;
}
.pacman{
    width: 5rem;
    /* margin-left: 4rem; */
    margin-bottom: 1.5rem; 
}
.pacman-comida{
    width: 11rem;
    /* margin-left: 4rem; */
    margin-top: -2.5rem;
    margin-bottom: 1.5rem; 
}
.text-carrito{
    color: white;
    font-family: 'Press Start 2P', cursive;
}
.tabla-contenido{
    display: flex;
    justify-content: space-evenly;
    /* margin-left: 1rem; */
}
.info-comida{
    margin: 1.5rem 0;
} 
.game-over{
    margin-top: 3rem;
    margin-right: 8rem;
    margin-left: 8rem;
    padding-top:0.3rem;
    background: grey;
}
.space{
    margin: 0.5rem 0;
}

</style>