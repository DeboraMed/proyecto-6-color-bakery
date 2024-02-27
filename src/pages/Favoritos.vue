<script setup>
import {computed, onMounted} from "vue";
import {useFavoriteStore} from '../stores/FavoriteStore';
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
    <h2>Favoritos</h2>
    <!--itera favoritos-->
    <div v-if="favoriteData && favoriteData.favorites" v-for="favorite in favoriteData.favorites" :key="favorite.id">
      <h3>{{ favorite.name }}</h3>
      <p>Creado en: {{ favorite.created_at }}</p>
      <ul>
        <li class="main__article__li"
            :style="{
              backgroundColor: '#'+favorite.color.hex,
              width: 47  + '%',
              height: 14  + '%',
           }">
        {{ favorite.color.name }}
        </li>
      </ul>
      <alert></alert>
    </div>
  </section>
</template>

<style scoped>

</style>