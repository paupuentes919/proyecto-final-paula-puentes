<template>
  <div id="app">
    <nav-bar 
      nombreNegocio="Pac-Foodie Company" 
      :cart="cart"
      @actualizar-num="updateNum">
    </nav-bar>


    <!-- <MenuProductos tituloCentral="Menu"/> -->
    <!-- <ProductosCards v-for="product in products"
      :key="product.id" 
      :product="product"
      @agregar-al-carrito="actualizarCarrito"/> -->
    <router-view
      :products = "products"
      :cart = "cart"
      :user="user"
      @agregar-al-carrito="actualizarCarrito"
      
    />

    


  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
//import MenuProductos from './components/MenuProductos.vue'
// import ProductosCards from './components/ProductosCards.vue'
//import ModalCarrito from './components/ModalCarrito.vue'
// import axios from 'axios'
import api from './services/api-services'


export default {
    name: 'App',
    components: {
    NavBar,
    //MenuProductos,
    //ProductosCards,
    //ModalCarrito
},
  data: () => ({
      products: [],
      cart: [],
      user: null
    }),
  mounted(){
    this.traerProductos();
    this.traerCarrito();
    
  },
  methods:{
    async traerProductos(){
      this.products = await api.traerProductos();
    },
    traerCarrito(){
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },
    updateNum() {
      console.log("LLEGOOO A APPPP")
        this.cart = [];
        console.log("carrrrrrito", this.cart);
    },
    // async traerProductos(){
    //   try {
    //     const resultado = await axios.get('./data/products.json')
    //     // Guardar la data en el array products declarado más arriba que esta vacio:
    //     this.products = await resultado.data
    //     console.log(this.products);
    //   } catch (error) {console.log(error)}
    // },
    actualizarCarrito({ productId, cantidadId }) {
      
        //let i = this.products.indexOf(productId);
        console.log("ver id", productId); //no llego ok el ID
        console.log("ver cantidad", cantidadId); // no llego ok la cantidad
        const productInCart = this.cart.find(product => product.id === productId)
        if (productInCart) {
          // Si el producto ya esta en el carrito solamente cambio la cantidad y el precio total para ese producto:
          productInCart.quantity = productInCart.quantity + parseInt(cantidadId);
          productInCart.total = productInCart.total + parseInt(cantidadId) * productInCart.price;
          //productInCart.stock = productInCart.stock - parseInt(cantidadId);
          console.log("cart 2", this.cart);
         
              
        } else {
          // Si el producto no esta en el carrito, lo agrego.  
          // Para no mutar propiedades del array de productos original ==> No conviene modificar la info original del JSON
          // busco el producto y lo guardo en un nuevo objeto:
          const findProduct = this.products.find(product => product.id === productId);
          const newProduct = { ...findProduct };
          console.log("newProduct", newProduct);
          console.log("cart", newProduct);
          console.log("cart id", this.cart);
        
          this.cart.push({
            ...newProduct,
           quantity: parseInt(cantidadId), 
           total: newProduct.price * parseInt(cantidadId),
           //stock: stockId - parseInt(cantidadId)
          })
          
          // console.log("nuevo - cantidad", this.newProduct.quantity);
          // console.log("nuevo - precio total", this.newProduct.total);
       }
    },
 
  } 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
 
}
html{
  background-color: black;
   background-image: url(assets/new-pac-man.png);
   /*background-repeat: no-repeat;*/
   background-size: 115em 55em;
   background-position-y: 60px;
   background-position-x: center;
}
body{
  background-color: transparent !important;
}
</style>
