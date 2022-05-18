<template>
<div>
    <nav class="nav-bar">
        <div class="flex-nombre-carrito">
            <h3 class="typo-pacman">{{nombreNegocio}}</h3>
            <button class="btn-pacman" @click="MostrarModal = true">
                <img class="pacman" alt="pacman" src="../assets/pacman.png">
                 <h3 class="counter">{{cartCounter}}</h3>
            </button>
        </div>
    </nav>  
    <modal-carrito
        v-model="MostrarModal"
        :cart="cart"> 
    </modal-carrito> 
</div> 
</template>

<script>

import ModalCarrito from './ModalCarrito.vue';

export default {
  name: 'NavBar',
  components:{
      ModalCarrito
  },
  props: {
    nombreNegocio:{
        type: String,
        required: true
    },
    cart: {
      type: Array,
    }
  },
  data: () => ({
    MostrarModal: false
  }),
  computed: {
    cartCounter () {
      return this.cart.reduce((acc, product) => acc + product.quantity, 0)
    }
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
    margin-top: -0.3em;
    width: 3em;
    -webkit-text-stroke: 1px black;
}
.btn-pacman{
    background: rgb(192, 192, 212);
    width: 5rem;
    height: 3.5rem;
    margin-top: -1em;
    border-color: rgb(192, 192, 212);
}
.counter{
    margin-top: -1.5em;
    font-family: 'Koulen', cursive;
}




</style>