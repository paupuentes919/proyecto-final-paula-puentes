<template>
  <div>
      <MenuProductos tituloCentral="Menu"/>
      <ProductosCards
        v-for="product in productos" 
            :key="product.id"
            @agregar-al-carrito="actualizarCarrito"
        /> 
        {{products}}
  </div>
</template>

<script>

import MenuProductos from '../components/MenuProductos.vue'
//import ProductosCards from '@/components/ProductosCards.vue'



export default {
    components:{
        MenuProductos,
        //ProductosCards
    },
    props: {
        productos: {
            type: Array,
            required: true
        },
    },
    computed:{
        products() {
            console.log("VER PRODUCTOS HomeView",this.$store.getters.products);
                return this.$store.getters.products
            }
    },
    created() {
        this.$store.dispatch('traerProductos')
    },
    // mounted(){
    //     this.completarArrayProductos();
    // },
    methods: {
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