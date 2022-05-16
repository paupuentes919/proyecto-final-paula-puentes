<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <NavBar nombreNegocio="Pac-Foodie Company"/>
    <MenuProductos tituloCentral="Menu"/>
    <ProductosCards v-for="product in products"
      :key="product.id" 
      :product="product"/>

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
  } 
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
