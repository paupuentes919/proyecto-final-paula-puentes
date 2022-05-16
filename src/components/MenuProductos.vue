<template>
  <div class="contenedor-menu-padding">
      <div class="contenedor-menu">
        <h1 class="typo-menu">{{tituloCentral}}</h1>
        <img src="../assets/fantasmitas.png" class="img-fantasmitas" />
      </div>
  </div>
</template>

<script>
export default {
  name: 'MenuProductos',
  props: {
    tituloCentral:{
        type: String,
        required: true
    }
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
.typo-menu{
    font-family: 'VT323', monospace;
    font-size: 100px;
    color: yellow;
     -webkit-text-stroke: 1px black;
}
.img-fantasmitas{
   height: 8em;
   margin-top: -45px;  
}
.contenedor-menu-padding{
    padding: 1em 45em;
}
.contenedor-menu{
    background: rgba(255, 255, 255, 0.8);
    background-size: 0 10px;
}
</style>