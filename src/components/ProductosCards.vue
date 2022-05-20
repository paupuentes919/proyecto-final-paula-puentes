<template>
<div class="contenedor-cards">
    <div class="card" style="width: 32rem;">
    <img :class="fantasmitas(product.color)" :src="product.image" alt="product.title">
    <div class="card-body">
        <h3 class="card-title typo-title">{{product.title}}</h3>
        <p class="card-text typo-text">{{product.description}}</p> 
        <h6 class="typo-text-bold">Precio Unitario: $ {{product.price}}</h6>
        <p class="typo-text">Disponibles: {{product.stock}}</p>
        <p class="typo-text">Cantidad: <input type="number" min="1" :max="product.stock" name="cantidad" @input="cantidadSeleccionada"></p>
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
      cantidad: null,
      count: 1
    }),
    methods: {
        agregarAlCarrito() {
            if (this.cantidad <= this.product.stock && this.cantidad > 0) {  //le mando del hijo al padre la informacion de que se apreto el boton de "agregar al carrito", mandandole el id del producto seleccionado 
                this.$emit("agregar-al-carrito", {
                    productId: this.product.id, 
                    cantidadId: this.cantidad
                }); 
            }
        },
        cantidadSeleccionada(event){
            return this.cantidad = event.target.value;
        },
        fantasmitas(color){
            if ( color == 'celeste')
                return 'card-img-top-lightblue'
            if ( color == 'naranja')
                return 'card-img-top-orange'
            if (color == 'rojo')
                return 'card-img-top-red'
        }
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
    border-width: 0.4em;
    background: black;
}
.card-body{
    background: white;
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
.card-img-top-lightblue{
    width: 20rem;
    margin: 0 20%;
    background: rgb(97, 190, 221);
}
.card-img-top-orange{
    width: 20rem;
    margin: 0 20%;
    background: orange;
}
.card-img-top-red{
    width: 20rem;
    margin: 0 20%;
    background: red;
}

</style>