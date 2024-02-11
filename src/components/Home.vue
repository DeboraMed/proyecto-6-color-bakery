<script>
  import axios from 'axios';
  import ResultadoColor from "./ResultadoColor.vue";

export default {
  components: {ResultadoColor},
  data() {
    return {
      text: '',
      selected: '',
      color: '',
      errors: {
        color: '',
        selected: '',
      },
    }
  },
  methods: {
    validateForm(field) {
      if (field === 'color' && (!this.color || !this.validateColor(this.color))) {
        this.errors.color = 'Introduce un color en formato HEX sin # (FFFFFF) o RGB (123,12,245).';
      }else if (field === 'selected' && (this.selected === '')){
        this.errors.selected = 'Elige tu esquema de color';
      } else {
        this.errors[field] = '';
      }
    },
    /* se valida el formato de entrada y se convierte a Hexadecimal */
    validateColor(color){
      const regexHex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      const regexRgb = /^([0-1]?\d?\d|2[0-4]\d|25[0-5]),([0-1]?\d?\d|2[0-4]\d|25[0-5]),([0-1]?\d?\d|2[0-4]\d|25[0-5])$/;

      if (!(regexHex.test(color) || regexRgb.test(color))) {
        return false;
      } else if (regexHex.test(color)) {
        return true;
      } else if (regexRgb.test(color)){
        color = color.split(',')
        let r = Number(color[0])
        let g = Number(color[1])
        let b = Number(color[2])

        return this.ConvertRGBtoHex(r,g,b)
      }
    },
    ConvertRGBtoHex(r, g, b) {
      let red = r.toString(16);
      let green = g.toString(16);
      let blue = b.toString(16);

      if (red.length == 1)
        red = "0" + red;
      if (green.length == 1)
        green = "0" + green;
      if (blue.length == 1)
        blue = "0" + blue;

      this.color = red + green + blue;
      console.log(this.color)
      return this.color
    },

    submitForm(){
      this.validateForm('color','selected');

      if (!Object.values(this.errors).some(error => error !== '')) {
        console.log('Formulario enviado:', this.color);
      }
    },
  }
}
</script>

<template>
  <main class="main-content">
    <article class="content-article">
      <section class="main">
        <h2>Hornea tu paleta de <span class="main-color">color</span> favorita_</h2>
        <p>Introduce un color en formato RGB o HEX y elige el estilo de tu paleta de color.</p>
        <form @submit.prevent="submitForm">
          <article>
            <label for="color"></label>
            <input
                id="color"
                placeholder="#ffffff"
                v-model="color"
                type="text"
                @change="validateForm('color')"
                >
            <p class="p-error">{{ errors.color }}</p>
          </article>
          <article class="article-content">

            <!--Dropdown menu-->
            <select class="home-select"
                v-model="selected"
                id="esquema"
                @change="validateForm('selected')"
                >
              <option disabled value="">Selecciona un modo</option>
              <option value="monochrome">Monocromo</option>
              <option value="monochrome-dark">Monocromo oscuro</option>
              <option value="monochrome-light">Monocromo claro</option>
              <option value="analogic">Analogico</option>
              <option value="complement">Complementario</option>
              <option value="analogic-complement">Analogico-Complementario</option>
              <option value="triad">Tríada</option>
              <option value="quad">Cuarteto</option>
            </select>
            <p class="p-error">{{ errors.selected }}</p>
            <button class="button" type="submit">Hornear</button>
          <!--<span> Seleccionado: {{ selected }}</span>-->
          </article>
        </form>
      </section>
      <section class="main">
        <h2>O elige una <span class="main-color">imagen_</span></h2>
        <p>Elige una imagen jpg o png.</p>
        <form @submit.prevent="submitForm">
          <article class="article-content">
          <!--input tipo file-->
            <input
                id="imagen"
                placeholder="#ffffff"
                type="file"
                accept="image/jpg"
                @change="uploadImage"
            >
            <button class="button" type="submit">Subir</button>
            <p class="p-error">{{ errors.imagen }}</p>
          </article>
        </form>
      </section>
    </article>
    <section class="content-section">
      <resultado-color :color="color" :selected="selected"></resultado-color>
    </section>
  </main>

</template>

<style scoped>
.main{
  justify-self: center;
  padding: 0 2rem;
  margin: 0 2rem;
}
.main-color{
  color:#c2431e;
}
.main-content{
  display: inline-flex;
  width: 100%;
  padding: 0 6rem 0 6rem;
}
.content-section{
  align-content:center;
  width: 40%;
}
section option{
  border: 1px #797474;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}
.content-section img{
  margin: auto;
}
.content-article{
  margin: auto;
  width: 60%;
}
.article-content{
  display:inline-flex;
}
.main-img{
  width: 100%;
  margin: 0 2rem;
  padding: 0 2rem;
}
h2{
  color: #4E3D90;
}
form{
  text-align: left;
}
.home-select{
  width:11.5rem;
  height:fit-content;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem 0.625rem;
  margin: 0.625rem 0;
}
.home-select option{
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}
input {
  width: 50%;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;

}

button[type="submit"] {

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
  display: inline-flex;
  background-color: #c2431e;
  color: #fff;
  cursor: pointer;
  border: 0;
  padding: 0.625rem 0.9375rem;
  margin: 0.625rem;
}
</style>