<template>
<div>
    <nav class="nav-bar">
        <div class="flex-nombre-carrito">
            <h3 class="typo-pacman">{{nombreNegocio}}</h3>
            <h3>Carrito</h3>
        </div>
    </nav>   
</div> 
</template>

<script>

export default {
  name: 'NavBar',
  props: {
    nombreNegocio:{
        type: String,
        required: true
    }
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.nav-bar{
    background-color: orange;
    padding: 1rem 3rem;
}
.flex-nombre-carrito{
    display: flex;
    justify-content: space-between;
    text-align: center;
    z-index: 10px;
    height: 2rem;
}
.typo-pacman{
    font-family: 'Press Start 2P', cursive;
    color: yellow;
    font-size: 30px;
    -webkit-text-stroke: 1px black;
}




</style>