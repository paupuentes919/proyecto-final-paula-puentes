<template>
  <div class="container">
    <form @submit.prevent="enviarActualizacion">
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
                v-model="form.image"
                required
            >
            <label for="inputColor" class="typo-input">Color</label>
            <select v-model="form.color">
                    <option value="" selected></option>
                    <option class="typo-input-questions" v-for="color in listaOpciones" :value="color.opcion" :key="color.opcion" >{{ color.opcion}}</option>
            </select>        
            <div class="submit">
             <button
                type="submit"
                class="btn-submit"
            >{{message}}
            </button>
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
        product: {
            type: Object
        }
    },
    data: () => ({
    form: {
        title: '',
        description:'',
        price: '',
        stock: '',
        image:'',
        color: '',
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
                console.log("PRODUUCT",this.product);
                return this.id == '' ? 'Agregar Producto' : 'Actualizar Producto'
            }
        }
    },
    methods:{
        async enviarActualizacion(){

            const formulario = {
                title: this.form.title,
                description: this.form.description,
                price: parseFloat(this.form.price),  //agrego ParseFloat porque sino llegan los numeros como strings
                stock: parseFloat(this.form.stock),  //agrego ParseFloat porque sino llegan los numeros como strings
                image: this.form.image,
                color: this.form.color
            }

            if( this.id == ''){
                await api.guardarNuevoProducto(formulario)
                console.log("form", formulario)
            }
                
            else{
                await api.actualizarProductos(this.id, formulario)
                console.log("form", formulario)
            }
                
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