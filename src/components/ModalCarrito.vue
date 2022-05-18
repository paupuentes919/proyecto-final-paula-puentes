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
                        <button class="modal__close boton info-comida" @click="restarProducto(product.id, product.quantity, product.total, product.stock)">-</button>
                        <button class="modal__close boton-mas info-comida" @click="sumarProducto(product.id)">+</button>
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
        },
        restarProducto(productID){
            this.cart.find((productCart) => {
                if (productCart.id === productID && productCart.quantity != 0){
                    productCart.quantity--;
                    productCart.stock++;
                    productCart.total = productCart.total - productCart.price;
                } 
                if (productCart.id === productID && productCart.quantity == 0){
                    //this.cart.splice(productID, 1);   no me anda. O sea lo que quiero hacer es hacer update del this.cart sumando o restando cantidades y si es cero que directamente me lo saque del carrito, ergo no me lo muestre
                }
            })          
            // let index = this.cart.indexOf(productID);
            // console.log("index", index); //me retorna -1, como si el elemento no existiese 
            // if (this.cart[index].quantity != 0){
            //     console.log("hola", this.cart[index].quantity);
            // }    Como hago para hacer update al carrito ==> this.cart ?????
        },
        sumarProducto(productID){
            this.cart.find((productCart) => {
                if (productCart.id === productID && productCart.quantity < productCart.stock){
                    productCart.quantity++;
                    productCart.stock--;
                    productCart.total = productCart.total + productCart.price;
                } 
                })   
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
.boton-mas{
    display: flex;
    justify-content: right;
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