<template>
  <div class="container">
    <form @submit="enviarActualizacion">
        <div class="row">
            <label for="inputTitle" class="typo-input">Producto</label>
            <input
                type="text"
                id="inputTitle"
                class="form-control"
                v-model="form.title"
                required
            >
            <label for="inputDescription" class="typo-input">Descripcion</label>
            <input
                type="text"
                id="inputDescription"
                class="form-control"
                v-model="form.description"
                required
            >
            <label for="inputPrice" class="typo-input">Precio</label>
            <input
                type="number"
                id="inputPrice"
                class="form-control"
                v-model="form.price"
                required
            > 
            <label for="inputStock" class="typo-input">Stock</label>
            <input
                type="number"
                id="inputStock"
                class="form-control"
                v-model="form.stock"
                required
            >
            <label for="inputURL" class="typo-input">Image URL</label>
            <input
                type="text"
                id="inputURL"
                class="form-control"
                v-model="form.url"
                required
            >
            <label for="inputColor" class="typo-input">Color</label>
            <select v-model="form.colorSeleccionado">
                    <option value="" selected></option>
                    <option class="typo-input-questions" v-for="color in listaOpciones" :value="color.opcion" :key="color.opcion" >{{ color.opcion}}</option>
            </select>        
            <div class="submit">
             <input
                type="submit"
                class="btn-submit"
                value="message()">
            </div>  
        </div>
    </form>
</div>
</template>

<script>

import api from '../services/api-services'

export default {
    props:{
        id:{
            type: String,
        },
    },
    data: () => ({
    form: {
        title: '',
        description:'',
        price: '',
        stock: '',
        url:'',
        colorSeleccionado: '',
    },
    listaOpciones: [
                {
                    id: 1,
                    opcion: 'celeste'
                },
                {
                    id: 2,
                    opcion: 'naranja'
                },
                {
                    id: 3,
                    opcion: 'rojo'
                },
    ]
    }),
    computed:{
        message:{
            get(){
                return this.id == '' ? 'Agregar Producto' : 'Actualizar Producto'
            }
        }

    },
    methods:{
        async enviarActualizacion(){
            if( this.id == '')
                await api.guardarNuevoProducto(this.form)
            else
                await api.actualizarProductos(this.id, this.form)
        this.$router.push('/Admin');     
        }
    }
}
</script>

<style scoped>
.container{
    margin-top: 1rem;
    padding: 3rem;
    background: black;
}
.typo-input{
    font-family: 'Press Start 2P', cursive;
    color: yellow;
    font-size: 25px;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
}
.form-control, .typo-input-questions, option, select{
    font-family: 'Press Start 2P', cursive;
    color: black;
    font-size: 25px;
}
.btn-submit{
    margin: 0 2rem;
    background: rgb(103, 214, 103);
    font-family: 'Press Start 2P', cursive;
    height: 3.5rem;
    box-shadow: 1px 1px 2px;
    border-radius: 10px;  
}
.submit{
    margin-top: 2rem;
}

</style>