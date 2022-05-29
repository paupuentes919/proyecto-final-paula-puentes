<template>
   <div>
      <!-- <MenuProductos tituloCentral="Lista"/> -->
      <table class="table-orders table">
        <thead class="table-header">
          <tr>
            <th scope="col" colspan="3">Producto</th>
            <th scope="col" colspan="20">Descripcion</th>
            <th scope="col" colspan="1">Imagen</th>
            <th scope="col" colspan="1">Precio</th>
            <th scope="col" colspan="1">Stock</th>
            <th scope="col" colspan="1">Color</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="product in listaProductos" :key="product.id">
            <td scope="col" colspan="3">{{product.title}}</td>
            <td scope="col" colspan="20">{{product.description}}</td>
            <!-- <td scope="col" colspan="1">{{product.image}}</td> -->
            <td scope="col" colspan="1">
              <img 
                :src="product.image"
                class="image-product">
            </td>
            <td scope="col" colspan="1">$ {{product.price}}</td>
            <td scope="col" colspan="1">{{product.stock}}</td>
            <td scope="col" colspan="1">{{product.color}}</td>
            <td>
              <router-link
              :to="{
                name: 'UpdateView',
                params:{
                  id: product.id,
                  product
                }}"
                class="btn-actualizar">Actualizar
              </router-link>
            </td>
            <td>
              <button class="btn-eliminar" @click="eliminarProducto(product.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>

//import MenuProductos from '../components/MenuProductos.vue';
import api from '../services/api-services'

export default {
    components: {
       // MenuProductos,
    },
    props: {
        user: {
            type: Object
        },
    },
    data: () => ({
        listaProductos: []
    }),
    mounted(){
      this.traerProductos();
    },
    methods:{
      async traerProductos(){
        this.listaProductos = await api.traerProductos();
      },
      async eliminarProducto(id){
        await api.eliminarProductos(id);
        this.listaProductos = this.listaProductos.filter(product => product.id != id)
      }
    }
}
</script>

<style>
.table-orders{
    display: block;
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
    font-size: 18px;
}
.image-product{
  width: 8rem;
}
.btn-actualizar{
  font-family: 'Press Start 2P', cursive;
  color: black;
  font-size: 18px;
  background: green;
  padding: 1rem;
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid black;
}
.btn-eliminar{
  font-family: 'Press Start 2P', cursive;
  color: black;
  font-size: 18px;
  background: red;
  padding: 1rem;
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid black;
}
tr, td{
  text-align: center;
}
</style>