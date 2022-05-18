<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar nombreNegocio="Pac-Foodie Company" :cart="cart"/>
    <MenuProductos tituloCentral="Menu"/>
    <ProductosCards v-for="product in products"
      :key="product.id" 
      :product="product"
      @agregar-al-carrito="actualizarCarrito"/>

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
import MenuProductos from './components/MenuProductos.vue'
import ProductosCards from './components/ProductosCards.vue'
import axios from 'axios'


export default {
    name: 'App',
    components: {
      NavBar,
      MenuProductos,
      ProductosCards
  },
  data: () => ({
      products: [],
      cart: []
    }),
  mounted(){
    this.traerProductos();
    
  },
  methods:{
    async traerProductos(){
      try {
        const resultado = await axios.get('./data/products.json')
        // Guardar la data en el array products declarado más arriba:
        this.products = await resultado.data
        console.log(this.products);
      } catch (error) {console.log(error)}
    },
    actualizarCarrito(productId,cantidadId,stockId) {
      console.log("Product", stockId);
        //let i = this.products.indexOf(productId);
        // console.log("ver id", productId); // llego ok el ID
        // console.log("ver cantidad", cantidad); // llego ok la cantidad
        const productInCart = this.cart.find(product => product.id === productId)
        if (productInCart) {
          // Si el producto ya esta en el carrito solamente cambio la cantidad y el precio total para ese producto:
          productInCart.quantity = productInCart.quantity + parseInt(cantidadId);
          productInCart.total = productInCart.total + parseInt(cantidadId) * productInCart.price;
          productInCart.stock = productInCart.stock - parseInt(cantidadId);
          console.log("cart 2", this.cart);
          // console.log("si el producto esta carrito - cantidad", productInCart.quantity);
          // console.log("si el producto esta carrito - precio total", productInCart.total);
              
        } else {
          // Si el producto no esta en el carrito, lo agrego.  
          // Para no mutar propiedades del array de productos original
          // busco el producto y lo guardo en un nuevo objeto:
          const findProduct = this.products.find(product => product.id === productId);
          const newProduct = { ...findProduct };
          console.log("newProduct", newProduct);
          // console.log("cart", this.cart);
        
          this.cart.push({
            ...newProduct,
           quantity: parseInt(cantidadId), 
           total: newProduct.price * parseInt(cantidadId),
           stock: stockId - parseInt(cantidadId)
          })
          
          // console.log("nuevo - cantidad", this.newProduct.quantity);
          // console.log("nuevo - precio total", this.newProduct.total);
          console.log("cart 2", this.cart);
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
