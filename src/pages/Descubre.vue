<script>
import axios from "axios";
import {useFavoriteStore} from "../stores/FavoriteStore.js";
import {useAlertStore} from "../stores/AlertStore.js";
import Alert from "../shared/Alert.vue";

export default {
  components: {Alert},
data(){
  const favoriteStore = useFavoriteStore();
  const alertStore = useAlertStore();
    return{
      color: '',
      isLiked: false,
      favoriteStore
    }
  },
  methods:{
    toggleLike() {
      // boton llama a addFavorite
      this.favoriteRandomColor()
      this.isLiked = !this.isLiked;
    },
    getRandomColor() {
      axios.get('/api/v1/colors/random') // mirar url peticion
        .then(data => {
          if(data.statusText === "OK"){
            console.log('Solicitud procesada correctamente',data);

            this.color = data.data; //revisar estructura payload
            console.log(this.color)
          }
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    },
    favoriteRandomColor() {
      if(this.color !== undefined){
        // llama al favoriteStore
        this.favoriteStore.addFavorites(this.color)
      }else{

      }
    }
  },
}
</script>

<template>
  <section class="container__center">
    <h2>Descubre</h2>
    <div>
      color generado: #{{this.color}} <br>
      <button class="button" @click="getRandomColor()" >Generar color</button>
      <button class="like__button" :class="{ liked: isLiked }" @click="toggleLike"><font-awesome-icon icon="fa-solid fa-heart" class="icon"/></button>
    <alert></alert>
    </div>
  </section>
</template>

<style scoped>
.like__button {
  font-size: 2em;
  color: gray;
  transition: color 0.5s ease-in-out;
  border: none;
  background: none;
}

.like__button:hover,
.like__button.liked {
  color: red;
}
</style>