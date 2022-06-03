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
                <div v-for="productUser in compraUsuario" :key="productUser.id">
                    
                    <tr v-for="(productUsers, index) in compraUsuario" :key="index">
                        <td scope="col" colspan="3">{{productUser[productUser.id-1].title}}</td>
                        <td scope="col" colspan="1">{{productUser[productUser.id-1].quantity}}</td>
                        <td scope="col" colspan="1">{{productUser[productUser.id-1].price}}</td>
                        <td scope="col" colspan="1">{{productUser[productUser.id-1].total}}</td>
                        <td scope="col" colspan="1">{{productUser.precioTotalAcc}}</td>
                    </tr>
                </div>
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
        product: {
            type: Object
        }
    },
    data: () => ({
        compraUsuario: []
    }),
    mounted(){
        this.traerOrdenesCompras();
    },
    methods: {
        async traerOrdenesCompras(){
            this.compraUsuario = await api.traerOrdenesCompras(this.userLogged.id);
            console.log("Compra Usuariooosssssssssssss", this.compraUsuario);
            console.log("userLoggeado ID", this.userLogged.id);
        } 
    }
};
</script>

<style scoped>

.table-orders{
    justify-content: center;
    background: black;
    padding: 3rem;
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