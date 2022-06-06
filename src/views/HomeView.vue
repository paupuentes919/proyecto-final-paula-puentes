<template>
  <div>
      <MenuProductos tituloCentral="Menu"/>
      <ProductosCards
            v-for="product in products"
            :key="product.id"
            :product="product"
            @agregar-al-carrito="actualizarCarrito"
<<<<<<< HEAD
        />
        {{products}}
=======
        /> 
>>>>>>> 5aa678206022461f80427db72bdd28562683ae48
  </div>
</template>

<script>

import MenuProductos from '../components/MenuProductos.vue'
import ProductosCards from '@/components/ProductosCards.vue'

export default {
    components:{
        MenuProductos,
        ProductosCards
    },
    props: {
        products: {
            type: Array,
            required: true
        },
    },
    methods: {
        actualizarCarrito({ productId, cantidadId }) {
            this.$emit('agregar-al-carrito', {productId, cantidadId});
        }
    }
}
</script>

<style>

</style>