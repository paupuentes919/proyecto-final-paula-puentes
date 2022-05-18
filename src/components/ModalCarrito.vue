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
                    <div class="tabla-contenido" v-for="product in cart" :key="product.id">
                        <img class="pacman" alt="pacman" src="../assets/pacman2.png">
                        <div class="info-comida">
                            <div>Hamburguesa: {{product.title}}</div>   
                            <div>Cantidad: {{product.quantity}}</div>
                            <div>Precio: $ {{product.total}}</div>
                        </div>
                    </div>
                    <div class="game-over">
                        <div class="space">GAME OVER</div> 
                        <div class="space">Precio Total: $ {{sumarPrecioTotal}}</div>
                        <button class="space">Comprar</button> 
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
            
        },
        sumaTotalProductos(){
            console.log(this.cart);
        }

    },
     computed:{
         sumarPrecioTotal(){
             return this.cart.reduce((acc, product) => acc + product.total, 0)
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
.tabla-contenido{
    display: flex;
    margin-left: 1rem;
}
.info-comida{
    margin-left: 8rem;
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