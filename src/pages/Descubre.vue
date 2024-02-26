<script>
import axios from "axios";

export default {
data(){
    return{
      color: '',
    }
  },
  methods:{
    getRandomColor() {
      axios.get('/api/v1/colors/random') // mirar url peticion
        .then(data => {
          if(data.statusText === "OK"){
            console.log('Solicitud procesada correctamente',data);

            this.color ='#' + data.data; //revisar estructura payload
            console.log(this.color)
          }
        })
        .catch(error => {
          console.error('Error en la solicitud:', error);
        });
    }
  },
}
</script>

<template>
  <section class="container__center">
      <h2>Descubre</h2>
      <div>
        color generado: {{this.color}} <br>
        <button class="button" @click="getRandomColor()" >Generar color</button>
      </div>
  </section>
</template>

<style scoped>

</style>