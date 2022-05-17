<template>
<div class="contenedor-cards">
    <div class="card" style="width: 32rem;">
    <img class="card-img-top" :src="product.image" alt="product.title">
    <div class="card-body">
        <h3 class="card-title typo-title">{{product.title}}</h3>
        <p class="card-text typo-text">{{product.description}}</p> 
        <h6 class="typo-text-bold">Precio Unitario: $ {{product.price}}</h6>
        <p class="typo-text">Disponibles: {{product.stock}}</p>
        <p class="typo-text">Cantidad: <input type="number" min="0" value="0" name="cantidad" @input="cantidadSeleccionada"></p>
        <button class="btn btn-primary typo-text" @click="agregarAlCarrito">Agregar al Carrito</button>
    </div>
    </div>  
</div>
</template>

<script>
export default {
    name: 'ProductosCards',
    props:{
        product:{
            type: Object,
            required: true   
        },
    },
    data: () => ({
      cantidad: null
    }),
    methods: {
        agregarAlCarrito() {
            this.$emit("agregar-al-carrito", this.product.id, this.cantidad); //le mando del hijo al padre la informacion de que se apreto el boton de "agregar al carrito", mandandole el id del producto seleccionado 
        },
        cantidadSeleccionada(event){
            return this.cantidad = event.target.value;
        },
    },
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap');
.contenedor-cards{
    display: inline-flex;
    padding: 2em;
}
.card{
    border-color: yellow;
    border-width: 0.3em;
}
.typo-title{
    font-family: 'Koulen', cursive;
    font-size: 50px;
    color: black;
     -webkit-text-stroke: 1px black;
}
.typo-text{
    font-family: 'Space Grotesk', sans-serif;
}
.typo-text-bold{
     font-family: 'Space Grotesk', sans-serif;
     font-weight: bold;
}
</style>