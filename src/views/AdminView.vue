<template>
   <div class="content">
      <!-- <MenuProductos tituloCentral="Lista"/> -->
      <h3 class="table-header">1UP</h3>
      <img class="play-heart" alt="heart" src="../assets/heartvideogame2.png">
      <router-link
              :to="{
                name: 'UpdateView',
                params:{
                  id: '',
                  product: {}
                }}"
                class="btn-actualizar">Agregar Producto
              </router-link>
      <img class="play-heart2" alt="heart" src="../assets/heartvideogame.png">
      <img class="play-heart2" alt="heart" src="../assets/heartvideogame.png">
      <img class="play-heart2" alt="heart" src="../assets/heartvideogame.png">
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
      },
    }
}
</script>

<style scoped>
.content{
  background: black;
  padding: 2rem;
}
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
a.btn-actualizar{
  font-family: 'Press Start 2P', cursive;
  color: black;
  font-size: 18px;
  background: green;
  padding: 1rem;
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid black;
  margin-top: 20px !important;
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
.play-heart{
  margin-top: -0.3em;
  margin-right: 1em;
  margin-left: 1em;
  width: 10rem;
}
.play-heart2{
  margin-top: -0.3em;
  margin-right: 1em;
  margin-left: 1em;
  width: 2rem;
}
</style>