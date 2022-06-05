<template>
    <div>
        <MenuProductos tituloCentral="Mis Pedidos"/>
        <div class="saludar-usuario">Hola {{userLogged.username}} !!</div>
        <table class="table-orders table">
            <div class="content-table" v-for="(purchase, index) in compraUsuario" :key="index">
                <br>
                <thead class="table-header">
                    <tr>
                        <th scope="col" colspan="3">Producto</th>
                        <th scope="col" colspan="1">Cantidad</th>
                        <th scope="col" colspan="1">Precio</th>
                        <th scope="col" colspan="1">Subtotal</th>
                    </tr>
                </thead>
                <tbody class="table-body">   
                        <tr v-for="(productUser, i) in compraUsuario" :key="i">
                            <td scope="col" colspan="3">{{purchase[productUser.id - 1].title}}</td>
                            <td scope="col" colspan="1">{{purchase[productUser.id - 1].quantity}}</td>
                            <td scope="col" colspan="1">{{purchase[productUser.id - 1].price}}</td>
                            <td scope="col" colspan="1">{{purchase[productUser.id - 1].total}}</td>
                        </tr> 
                        <br>
                </tbody>
            <div scope="col" colspan="2" class="total-price">Total $ {{purchase.precioTotalAcc}}</div>
            </div>
        </table>
    </div>
</template>

<script>
import MenuProductos from '../components/MenuProductos.vue';
import api from '../services/api-services'
import { mapGetters } from "vuex";


export default {
    components: {
        MenuProductos,
    },
    props: {
        product: {
            type: Object
        }
    },
    data: () => ({
        compraUsuario: []
    }),
    computed:{
         ...mapGetters("userLogged", ["userLogged"])
    },
    mounted(){
        this.traerOrdenesCompras();
        this.verifyUser();
    },
    methods: {
        async traerOrdenesCompras(){
            this.compraUsuario = await api.traerOrdenesCompras(this.userLogged.id);
            console.log("Compra Usuariooosssssssssssss", this.compraUsuario);
            console.log("userLoggeado ID", this.userLogged.id);
            this.compraUsuario.forEach (element => {
                console.log("Mira bien jshdhddhc", element);
            })
        },
        verifyUser(){
        if(this.userLogged == null || this.userLogged.isAdmin == true)
          return this.$router.push('/'); 
      }
    }
};
</script>

<style scoped>
.table-orders{
    display: block;
    justify-content: center;
    background: black;
    padding: 1rem;
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
    font-size: 18px;
}
tr, td, th{
  text-align: center;
  padding: 1.5rem;
}
.content-table{
    display: inline;
    justify-content: center;
}
.total-price{
    font-family: 'Press Start 2P', cursive;
    color: rgb(21, 165, 248);
    font-weight: bold;
    font-size: 22px;
    padding-left: 50rem;
}
.saludar-usuario{
    background: black;
    font-family: 'Press Start 2P', cursive;
    font-size: 25px;
    -webkit-text-stroke: 1px black;
    color: yellow;
    padding-top: 1rem;
}
</style>