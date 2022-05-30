<template>
<div>
    <nav class="nav-bar">
        <div class="flex-nombre-carrito">
            <h3 class="typo-pacman">{{nombreNegocio}}</h3>
            <div class="login-carrito">
                <router-link class="btn-login btn-views"
                    v-if="user!=null"
                        :to="user.isAdmin ? '/Admin' : '/Productos'"
                        >{{ user.isAdmin ? 'Admin' : 'Mi Cuenta' }}
                </router-link>
                <button id="btn-session" class="btn-login">
                    <div @click="MostrarModalLogin = true" v-if="user==null">
                        <img class="play-triangule" alt="play" src="../assets/playtriangule.png">{{showLogin}}
                    </div>
                    <div @click="showLogout" v-if="user!=null">
                        <img class="play-triangule" alt="play" src="../assets/cross.png">{{showLogin}}
                    </div>
                </button>
                <button class="btn-login" @click="MostrarModalCarrito = true">
                    <div class="carrito-qty">
                        <img class="cart-shop" alt="cart" src="../assets/carrito.png">
                        <h3 class="counter">{{cartCounter}}</h3>
                    </div>
                </button>
            </div>    
        </div>
    </nav> 
    <modal-carrito
        v-model="MostrarModalCarrito"
        :cart="cart"> 
    </modal-carrito> 
    <login-modal
        v-model="MostrarModalLogin"
        @logged-in="login"
    ></login-modal>
</div> 
</template>

<script>

import ModalCarrito from './ModalCarrito.vue';
import LoginModal from './LoginModal.vue';

export default {
  name: 'NavBar',
  components:{
    ModalCarrito,
    LoginModal,
},
  props: {
    nombreNegocio:{
        type: String,
        required: true
    },
    cart: {
      type: Array,
    },
    
  },
  data: () => ({
    MostrarModalCarrito: false,
    MostrarModalLogin: false,
    user: null,
    session: 'Login',
    clickCounter:  0
  }),
  computed: {
    cartCounter () {
      return this.cart.reduce((acc, product) => acc + product.quantity, 0)
    },
      showLogin(){
            if ((this.user!=null || this.userLogged!=null))
                 return 'Logout'
            else
                 return 'Login'
    }
  },
  mounted() {
    this.login();
        console.log("usuario loggeado NavBar",this.userLogged); //Ejemplo de cómo recuperar el usuario, usando la computed del mixin
  },
  methods:{
    login(user){
        console.log("llego???",user);
        this.user = user;
        console.log("this user",this.user);
        this.$emit('logged-in', user);
    },
    showLogout(){
        this.userLogged = null;
        this.user = null;
        console.log("limpieza",this.userLogged);
    },
  

  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.nav-bar{
    background-color: orange;
    padding: 1.5rem 3rem;
}
.flex-nombre-carrito{
    display: flex;
    justify-content: space-between;
    text-align: center;
    z-index: 10px;
    height: 2rem;
}
.typo-pacman{
    font-family: 'Press Start 2P', cursive;
    color: yellow;
    font-size: 30px;
    -webkit-text-stroke: 1px black;
}
.pacman{
    margin-top: -0.1em;
    width: 3em;
    -webkit-text-stroke: 1px black;
}
.play-triangule{
    margin-top: -0.3em;
    margin-right: 0.5em;
    width: 1.7em;
}
.cart-shop{
    margin-right: 0.5em;  
    width: 3em;
}
.btn-pacman{
    background: rgb(103, 214, 103);
    width: 5rem;
    height: 3.5rem;
    border-color: 1px black;
    box-shadow: 1px 1px 2px;
    border-radius: 10px; 
}
.counter{
    margin-top: 0.4em;
    font-family: 'Koulen', cursive;
    font-size: 1.7rem;
}
.btn-login{
    margin: 0 2rem;
    background: rgb(103, 214, 103);
    font-family: 'Press Start 2P', cursive;
    height: 3.5rem;
    box-shadow: 1px 1px 2px;
    border-radius: 10px;  
}
.btn-views{
    text-decoration: none;
    color: black;
    padding: 1.1rem;
    background: rgb(97, 190, 221) !important;
    border-color: 1px black;
}
.btn-cart{
    margin: 0 2rem;
    background: rgb(103, 214, 103);
    height: 3.5rem;
    box-shadow: 1px 1px 2px;
    border-radius: 10px; 
    
}
.login-carrito{
    justify-content: right;
    text-align: -3px;
    margin-top: -12px;
}
.carrito-qty{
    display: -webkit-box;
}





</style>