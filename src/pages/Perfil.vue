<script setup>

import {computed, onMounted} from "vue";
import {useUserStore} from '../stores/UserStore.js';

const userStore = useUserStore();

/**
 * llamar a fetchUser en el hook `onMounted` para obtener la información del usuario cuando se monta el componente
 */
onMounted(async () => {
  await userStore.fetchUser();
});
const userData = computed(() => {
  return userStore.userData;
});
</script>

<template>
  <main class="main__content">
    <section class="content__section">
      <img class="content__section__img" src="../assets/img/img-bolleria.png" alt="Horno de colores"
           title="Horno de colores">
    </section>

    <article class="content__section">
      <h2>Bienvenid@ <span class="h2__color__sec">{{ userData.name }}_</span></h2>
      Hola, {{ userData.name }} Bienvenido a ColorBakery<br>
      Tu email: {{ userData.email }}<br>
      <button class="button" @click="userStore.logout()">Cerrar sesión</button>
    </article>

  </main>
</template>


<style scoped>
.main__content {
  margin: 4rem auto;
  display: inline-flex;
  width: 100%;
  padding: 0 6rem 0 6rem;
}

.content__section {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.content__section__img {
  width: 60%;
  margin: auto;
}

img {
  min-width: 300px
}

@media only screen and (max-width: 48rem /*768px*/
) {
  .main__content {
    flex-direction: column;
    padding: 0 2rem 0 2rem;
  }

  .content__section {
    width: 100%;
  }

  .content__section__img {
    width: 80%;
  }

}

@media screen and (max-width: 75rem /*1200px*/
) {

  .content__section__img {
    width: 70%;
  }
}
</style>