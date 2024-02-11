<script>
import axios from 'axios';
import theColorApi from '../api/theColorApi';

/* llamada a la api para obtener la paleta de color */
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
  <div class="container-img">
    <img v-if="!colorPalette" class="main-img" src="../assets/img/horno-main.png" alt="Horno de colores" title="Horno de colores">
    <div>
      <button @click="fetchColorPalette">Obtener paleta de colores</button>
      <div v-if="colorPalette">
        <div v-for="color in colorPalette.colors" :key="color.hex.value">
          Color: {{ color.hex.value }}
          <div :style="`background-color: ${color.hex.value}`"> Color </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main-img{
  width: 90%;
  margin: 0 2rem;
  padding: 0 2rem;
}
</style>