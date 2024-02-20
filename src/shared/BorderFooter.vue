<script setup>

</script>

<template>
  <!-- borde naranja del footer-->
  <section class="border__ft__init">
    <div class="border__ft__init__img">
      <img class="border__ft__init__background" src="../assets/img/color-bakery-texto.svg">
    </div>
  </section>
</template>

<style scoped>
/*estilos del borde del footer*/
.border__ft__init {
  border-bottom-width: 4rem;
  border-bottom-style: solid;
  border-bottom-color: #FCBD7A;
}
.border__ft__init__img{
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  background-color: #FFEFC9;
}
.border__ft__init__background{
  margin-right: 1rem;
  margin-bottom: -1.1rem;
  width: 25%;
  bottom: -4rem;
  right: 0;
}
</style>