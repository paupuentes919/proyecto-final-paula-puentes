<template>
  <div>
      <MenuProductos tituloCentral="Menu"/>
      <ProductosCards
        v-for="product in $store.getters.products" 
            :key="product.id"
            @agregar-al-carrito="actualizarCarrito"
        /> 
        {{products}}
  </div>
</template>

<script>

import MenuProductos from '../components/MenuProductos.vue'
import ProductosCards from '@/components/ProductosCards.vue'
import { mapActions, mapGetters } from "vuex";




export default {
    components:{
        MenuProductos,
        ProductosCards
    },
    props: {
        productos: {
            type: Array,
            required: true
        },
    },
    computed:{
        ...mapGetters(['products'])
        
        // products() {
        //     console.log("VER PRODUCTOS HomeView",this.$store.getters.products);
        //         return this.$store.getters.products
        //     }
    },
    created() {
        //this.$store.dispatch('traerProductos')
        this.traerProductos();
    },
    // mounted(){
    //     this.completarArrayProductos();
    // },
    methods: {
        ...mapActions(["traerProductos"]),
        actualizarCarrito({ productId, cantidadId }) {
            this.$emit('agregar-al-carrito', {productId, cantidadId});
        }, 
        // completarArrayProductos(){
        //     this.productos.forEach( element => { 
        //         element.title = products().title;
        //     }) 
        // }
    }
}
</script>

<style>

</style>