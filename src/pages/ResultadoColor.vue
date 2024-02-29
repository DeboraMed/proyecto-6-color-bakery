<script>
import axios from 'axios';
import theColorApi from '../api/theColorApi.js';
import BorderFooter from "../shared/BorderFooter.vue";
import {useUserStore} from "../stores/UserStore.js";

export default {
  components: {BorderFooter},
  props:{
    color: {
      type: String,
      required: true,
    },
    selected: {
      type: String,
      required:true,
    },
    form: {
      type: String,
      required:true,
    },
  },
  data() {
    return {
      colorPalette: null,
    };
  },
  computed: {
    userStore: () => useUserStore(),
  },
  methods: {
    fetchColorPalette() {
      axios
      theColorApi.get('scheme?hex=' + this.color + '&mode='+ this.selected)
          .then(response => {
            this.colorPalette = response.data;
            console.log(this.colorPalette)
          })
          .catch(error => {
            console.error(error);
          });
    },
    // evento personalizado para manejar el like
    likeButtonClicked() {
      this.$emit('palette-liked', this.colorPalette);
    },
  },
};
</script>

<template>
  <section class="main__content__color">
    <section>
      <figure  v-if="!colorPalette" class="main__img" title="Horno de colores"></figure>
      <article>
        <ul v-if="colorPalette" class="main__article">

            <button v-show="userStore.isLogged()" class="like__button" @click="likeButtonClicked" v-if="this.color" ><font-awesome-icon icon="fa-solid fa-heart" /></button>

        <li class="main__article__li" v-for="(color, index) in colorPalette.colors" :key="color.hex.value"
             :style="{
                backgroundColor: color.hex.value,
                width: 47 + index + '%',
                height: 14 + index + '%',
             }">
          {{ color.hex.value }}
        </li>
      </ul>
<!-- Pendiente de añadir imagen  <img src="">-->
    </article>
  </section>
  </section>
</template>

<style scoped>
.like__button{
  position: absolute;
  padding: 1rem;
  top: 0;
}
.main__content__color{
  padding-top: 1rem;
  position: relative;
  margin: auto;
  color: black;
  font-size: 1rem;
  text-shadow: #a4a4a4 1px 1px ;
}
.main__img{
  padding-top: 4rem;
  padding-bottom: 4rem;
  width: auto;
  height: 30rem;

  background-image: url("../assets/img/horno-main.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  animation: fadein 2s ease 0s 1 normal forwards;
}
.main__article{
  padding-top: 4rem;
  padding-bottom: 4rem;
  width: 100%;
  height: 35rem;

  background-image: url("../assets/img/img-bandeja-bakery.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  animation: fadein 2s ease 0s 1 normal forwards;
}

.main__article__li {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
  padding: 1.42rem;
  margin: 0 auto;
}

/*animacion de imagen*/
@keyframes fadein {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>