<script setup>

import {computed, onMounted} from "vue";
import {useUserStore} from '../stores/UserStore';

const userStore = useUserStore();

// Asegúrate de llamar a fetchUser en el hook `onMounted` para obtener la información del usuario cuando se monta el componente
onMounted(async () => {
  await userStore.fetchUser();
  console.log(userStore.userData['email'])
});


const userData = computed(() => {
  return userStore.userData;
});
</script>

<template>
<!--  <div>
    <h2>Usuario</h2>
    <p v-if="userData.email">
      Hola, {{ userData.email }}
      console.log(userStore.email)
    </p>
    <button class="button" @click="userStore.userData()">Cerrar sesión</button>
  </div>-->
    <div>
    <h2>Usuario</h2>
      Hola, {{ userData.email }}
  </div>
</template>


<style scoped>

</style>