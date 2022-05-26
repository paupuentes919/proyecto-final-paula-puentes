<template>
  <div>
    <ProductosCards v-for="product in products"
      :key="product.id" 
      :product="product"
      @agregar-al-carrito="actualizarCarrito"/>
      
  </div>
</template>

<script>

import ProductosCards from './components/ProductosCards.vue'

export default {
  components: {
    ProductosCards
}
}
</script>

<style>

</style>