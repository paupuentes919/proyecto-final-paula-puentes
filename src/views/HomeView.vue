<template>
  <div>
      <MenuProductos tituloCentral="Menu"/>
      <ProductosCards
            v-for="product in products"
            :key="product.id"
            :product="product"
            @agregar-al-carrito="actualizarCarrito"
        /> 
  </div>
</template>

<script>

import MenuProductos from '../components/MenuProductos.vue'
import ProductosCards from '@/components/ProductosCards.vue'
import api from '../services/api-services'

export default {
     components:{
    MenuProductos,
    ProductosCards
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

    
}
}
</script>

<style>

</style>