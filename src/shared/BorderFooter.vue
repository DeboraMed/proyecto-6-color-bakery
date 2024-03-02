<script setup>
import {useThemeStore} from '../stores/ThemeStore';

const store = useThemeStore();
</script>

<template>
  <!-- borde naranja del footer-->
  <section class="border__ft__init">
    <div class="border__ft__init__img">
      <img v-if="store.theme === 'dark'" class="border__ft__init__background"
           src="../assets/img/color-bakery-texto-dark.svg" alt="ColorBakery">
      <img v-else class="border__ft__init__background" src="../assets/img/color-bakery-texto-light.svg"
           alt="ColorBakery">
    </div>
  </section>
</template>

<style scoped>
/*estilos del borde del footer*/
.border__ft__init {
  border-bottom-width: 4rem;
  border-bottom-style: solid;
  border-bottom-color: var(--bg-color-dark);
}

.border__ft__init__img {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  background-color: var(--bg-color-medium);
}

.border__ft__init__background {
  margin-right: 1rem;
  margin-bottom: -1.1rem;
  width: 25%;
  bottom: -4rem;
  right: 0;
}
</style>