<script setup>

import {computed, onMounted} from "vue";
import {useUserStore} from '../stores/UserStore.js';

const userStore = useUserStore();

// llamar a fetchUser en el hook `onMounted` para obtener la información del usuario cuando se monta el componente
onMounted(async () => {
  await userStore.fetchUser();
  console.log(userStore.userData['email'])
});
// llama a la api con el token del usuario logueado
const userData = computed(() => {
  return userStore.userData;
});
</script>

<template>
  <section class="container__center">
    <h2>Usuario</h2>
      Hola, {{ userData.name }}<br>
      email {{ userData.email }}<br>
    <button class="button" @click="userStore.logout()">Cerrar sesión</button>
  </section>
</template>


<style scoped>

</style>