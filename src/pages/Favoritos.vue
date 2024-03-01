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
    <article>
      <alert></alert>
      <h2>Tus <span class="h2__color__sec">colores</span> Favoritos_</h2>
      <p> Aqui podrás visualizar tos colores favoritos y si quieres añadir mas puedes pulsar en descubre.</p>
    </article>
  <section class="container__center">
    <!--card con los favoritos-->
    <article v-if="favoriteData && favoriteData.favorites"
             v-for="favorite in favoriteData.favorites" :key="favorite.id">
      <ul class="cards">
        <li>
          <button @click="favoriteStore.deleteFavorites(favorite.id)">
            <font-awesome-icon icon="fa-solid fa-xmark" class="icon"/>
          </button>
          <div class="card"
               :style="{
                backgroundColor: '#'+favorite.color.hex,
             }">
            <div class="card__image" alt="" />
            <div class="card__overlay">
              <div class="card__header">
                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                <div class="card__header-text">
                  <h3 class="card__title">{{ favorite.color.name }}</h3>
                  <span class="card__status">Creado en: {{ new Date(favorite.created_at).toISOString().replace('T', ' - ').substring(0, 18) }}</span>
                </div>
              </div>
              <p class="card__description">#{{ favorite.color.hex }}</p>
            </div>
          </div>
        </li>
      </ul>
    </article>
  </section>
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
/*estilos de la card*/
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0;
  list-style-type: none;
  width: calc(25% - 1rem); /* 25% para 4 elementos en una fila */
  margin: 1.5rem; /* Espacio entre elementos */
}
.card {
  position: relative;
  display: block;
  height: 100%;
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
}

.card__image {
  width: 14rem;
  height: 14rem;
}

.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: calc(var(--curve) * 1px);
  background-color: var(--surface-color);
  transform: translateY(100%);
  transition: .2s ease-in-out;
}

.card:hover .card__overlay {
  transform: translateY(0);
}

.card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;
  background-color: var(--surface-color);
  transform: translateY(-100%);
  transition: .2s ease-in-out;
}

.card__arc {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
}

.card__arc path {
  fill: var(--surface-color);
  d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}

.card:hover .card__header {
  transform: translateY(0);
}

.card__thumb {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.card__title {
  font-size: 1em;
  margin: 0 0 .3em;
  color: #6A515E;
}

.card__tagline {
  display: block;
  margin: 1em 0;
  font-size: .8em;
  color: #D7BDCA;
}

.card__status {
  font-size: .8em;
  color: #b4acd9;
}

.card__description {
  padding: 0 2em 2em;
  margin: 0;
  color: #4c3b9a;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>