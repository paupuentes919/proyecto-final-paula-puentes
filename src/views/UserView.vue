<template>
    <div>
        <MenuProductos tituloCentral="Mis Pedidos"/>
    
        <table class="table-orders table">
            <thead class="table-header">
                <tr>
                    <th scope="col" colspan="3">Producto</th>
                    <th scope="col" colspan="1">Cantidad</th>
                    <th scope="col" colspan="1">Precio</th>
                    <th scope="col" colspan="1">Subtotal</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="productUser in compraUsuario" :key="productUser.total">
                    <td scope="col" colspan="3">{{productUser.title}}</td>
                    <td scope="col" colspan="1">{{productUser.quantity}}</td>
                    <td scope="col" colspan="1">{{productUser.price}}</td>
                    <td scope="col" colspan="1">{{productUser.total}}</td>
                    <td scope="col" colspan="1">{{productUser.precioTotalAcc}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import MenuProductos from '../components/MenuProductos.vue';
import api from '../services/api-services'


export default {
    components: {
        MenuProductos,
    },
    props: {
        user: {
            type: Object
        },
    },
    data: () => ({
        compraUsuario: []
    }),
    mounted(){
        this.traerOrdenesCompras();
    },
    methods: {
        async traerOrdenesCompras(){
            this.compraUsuario = await api.traerOrdenesCompras();
        } 
    }
};
</script>

<style scoped>

.table-orders{
    display: flex;
    justify-content: center;
    background: black;
}
.table-header{
    font-family: 'Press Start 2P', cursive;
    color: yellow;
    font-size: 30px;
    -webkit-text-stroke: 1px black;
}
.table-body{
    font-family: 'Press Start 2P', cursive;
    color: white;
    font-size: 20px;
}
</style>