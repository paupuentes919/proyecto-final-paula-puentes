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
                    <div v-if="cart.length != 0">
                        <div class="tabla-contenido" v-for="product in cart" :key="product.id">
                            <img class="pacman-comida" alt="pacman" :src="product.image">
                            <div class="info-comida">
                                <div>Hamburguesa: {{product.title}}</div>   
                                <div>Cantidad: {{product.quantity}}</div>
                                <div>Precio: $ {{product.total}}</div>
                            </div>
                            <div class="botones">
                            <button class="modal__close boton-menos info-comida" @click="restarProducto(product.id)">-</button>
                            <button class="modal__close boton-mas info-comida" @click="sumarProducto(product.id)">+</button>
                            </div>
                        </div>
                        <div class="game-over">
                            <div class="space">GAME OVER</div> 
                            <div class="space">Precio Total: $ {{sumarPrecioTotal}}</div>
                            <button class="space" @click="guardarOrdenDeCompra(userLogged.id, cart)">Comprar</button> 
                        </div>
                    </div>
                    <div v-else>
                        <h3>Tu carrito esta vacío</h3>
                    </div>
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
    props:{
        cart: {
            type: Array
        },
        user:{
            type: Object
        }
    },
    data: () => ({
      guardarCompraUser: [],
      updateCart: 
            {
                title: '',
                description:'',
                price: '',
                stock: '',
                image:'',
                color: '',
            }
        ,
    
    }),
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
                    console.log("holissssss", this.cart);
                    //this.cart[productID-1].quantity = productCart.quantity--;
                    //productCart.stock++;
                    productCart.total = productCart.total - productCart.price;
                } 
                if (productCart.id === productID && productCart.quantity == 0){
                    //productCart.splice(productID,1);
                    //this.cart.splice(productID,1);
                    //this.cart.splice(productCart.id, 1); 
                    // this.cart.splice(productID, 1);   no me anda. O sea lo que quiero hacer es hacer update del this.cart sumando o restando cantidades y si es cero que directamente me lo saque del carrito, ergo no me lo muestre
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
                          console.log("holissssssaaaa", this.cart);
                    productCart.quantity++;
                    //productCart.stock--;
                    productCart.total = productCart.total + productCart.price;
                } 
                })   
        },
        async guardarOrdenDeCompra(userId, cartUserId){
            cartUserId.forEach(element => {

                element.stock = element.stock - element.quantity;
               
                this.updateCart.title = element.title;
                this.updateCart.description = element.description;
                this.updateCart.price = parseFloat(element.price);
                this.updateCart.stock = parseFloat(element.stock);
                this.updateCart.image = element.image;
                this.updateCart.color = element.color;
                
                api.actualizarProductos(element.id, this.updateCart);
            });
            this.guardarCompraUser = await api.guardarOrdenDeCompra(userId,cartUserId);

            this.$emit("actualizar-num", this.cart);  
            window.location.reload();
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