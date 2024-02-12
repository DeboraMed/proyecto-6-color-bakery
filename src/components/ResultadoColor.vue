<script>
import axios from 'axios';
import theColorApi from '../api/theColorApi';

/* llamada a la api TheColorApi para obtener las paletas de color a partir de un color */
export default {
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
  },
};
</script>

<template>
  <main class="main-content-color">
  <section class="container-img">
    <article v-if="!colorPalette" class="main-img" alt="Horno de colores" title="Horno de colores"></article>
    <section>
      <article v-if="colorPalette" class="content-color">
        <article v-for="(color, index) in colorPalette.colors" :key="color.hex.value"
             :style="{
                backgroundColor: color.hex.value,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '5px',
                padding: '1.42rem',
                width: 35 + index + 'rem',
                margin: '0 auto'
             }">
          {{ color.hex.value }}
        </article>
      </article>
    </section>
  </section>
  </main>
</template>

<style scoped>
.main-content-color{
  /*padding-top: 4rem;*/
  position: relative;
  margin: auto;
  color: black;
  font-size: 1rem;
  text-shadow: #a4a4a4 1px 1px ;
}
.main-img{
  padding-top: 4rem;
  padding-bottom: 4rem;
  width: 100%;
  height: 35rem;


  background-image: url("../assets/img/horno-main.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  animation: fadein 2s ease 0s 1 normal forwards;
}
.content-color{
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