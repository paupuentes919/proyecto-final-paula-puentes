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
import MenuProductos from '../components/MenuProductos.vue';
import ProductosCards from "../components/ProductosCards.vue";
//import api from '../services/api-services'


export default {
    components: {
        MenuProductos,
        ProductosCards,
    },
    props: {
        user: {
            type: Object
        },
        products: {
            type: Array
        },
    },
    methods: {
        actualizarCarrito({ productId, cantidadId }){
            this.$emit('agregar-al-carrito', productId, cantidadId);
        } 
    }
};
</script>

<style>
</style>