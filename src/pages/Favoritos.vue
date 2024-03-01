<script setup>
import {computed, onMounted} from "vue";
import {useFavoriteStore} from '../stores/FavoriteStore.js';
import Alert from "../shared/Alert.vue";

const favoriteStore = useFavoriteStore();

// llamar a fetchUser en el hook `onMounted` para obtener la información del usuario cuando se monta el componente
onMounted(async () => {
  await favoriteStore.getFavorites();
  console.log(favoriteStore.favoriteData)
});
// llama a la api con el token del usuario logueado
const favoriteData = computed(() => {
  return favoriteStore.favoriteData;
});
</script>

<template>
  <section class="container__center">
    <alert></alert>
    <h2>Favoritos</h2>
    <!--itera favoritos-->
    <article class="card container_project" v-if="favoriteData && favoriteData.favorites" v-for="favorite in favoriteData.favorites" :key="favorite.id">
      <button @click="favoriteStore.deleteFavorites(favorite.id)"><font-awesome-icon icon="fa-solid fa-xmark" class="icon"/></button>
      <h3>{{ favorite.name }}</h3>
      <p>Creado en: {{ new Date(favorite.created_at).toISOString().replace('T', ' - ').substring(0, 18)  }}</p>
      <ul>
        <li class="main__article__li"
            :style="{
              backgroundColor: '#'+favorite.color.hex,
              width: 47  + '%',
              height: 14  + '%',
           }">
        {{ favorite.color.name }} <br> #{{ favorite.color.hex }}
        </li>
      </ul>
    </article>
  </section>
</template>

<style scoped>
/* reset de estilos del botón */
button {
  background: none;
  border: 0;
  color: inherit;
  cursor: default;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-user-select: none; /* for button */
  -webkit-appearance: button; /* for input */
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>