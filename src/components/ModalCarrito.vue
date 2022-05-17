<template>
  <vue-final-modal
    name="ModalCarrito"
    v-slot="{ close }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    v-on="$listeners"
  >
 
    
    <div class="modal">
        <div class="contenido">
            <button class="modal__close boton" @click="close">X</button>
            <span class="modal__title text-title">Tu Carrito de Compras</span>
             <img class="pacman" alt="pacman" src="../assets/pacman2.png">
            <div class="modal__content text-carrito">
                <div v-for="product in cart" :key="product.id">
                    <div>{{product.title}}</div>   
                    <div>{{product.quantity}}</div>
                    <div>{{product.total}}</div>
                </div>
            </div>
        </div>
    </div>

  </vue-final-modal>
</template>

<script>

import { $vfm, VueFinalModal} from 'vue-final-modal'

export default {
    components:{
        VueFinalModal
    },
    props:{
        cart: {
            type: Array
        }
    },
    methods:{
        close(){
            $vfm.hide('ModalCarrito');
            console.log("hola");
        }

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
    height: 80%;
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
.text-title{
    color: yellow;
    font-family: 'Press Start 2P', cursive;
    font-size: xx-large;
}
.pacman{
    width: 5rem;
    margin-left: 4rem;
    margin-bottom: 1.5rem; 
}
.text-carrito{
    color: white;
    font-family: 'Press Start 2P', cursive;
}

</style>