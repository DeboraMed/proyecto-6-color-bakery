<script>
  import ResultadoColor from "./ResultadoColor.vue";
  import ResultadoImagen from "./ResultadoImagen.vue";
  import HomeSection from "./HomeSection.vue";
  import BorderFooter from "../shared/BorderFooter.vue";
  import Modal from "../shared/Modal.vue";
  import { ref } from "vue";

  /* para que el Modal sea reactivo */
  const isModalOpened = ref(false);

export default {
  components: {Modal, BorderFooter, ResultadoColor, ResultadoImagen, HomeSection},
  data() {
    return {
      isModalOpened: isModalOpened,
      showColor: true,
      showImage: false,
      form: '',
      text: '',
      selected: '',
      color: '',
      url: '',
      isValidImage: false,
      errors: {
        color: '',
        selected: '',
        url: '',
      },
    }
  },
  methods: {
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

        return this.convertRGBtoHex(r,g,b)
      }
    },
    convertRGBtoHex(r, g, b) {
      let red = r.toString(16);
      let green = g.toString(16);
      let blue = b.toString(16);

      if (red.length === 1)
        red = "0" + red;
      if (green.length === 1)
        green = "0" + green;
      if (blue.length === 1)
        blue = "0" + blue;

      this.color = red + green + blue;
      console.log(this.color)
      return this.color
    },
    validateImageURL(url) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
          this.isValidImage = true;
          resolve();
        }
        img.onerror = () => {
          this.isValidImage = false;
          resolve();
        }
        img.src = url;
      });
    },
    validateFormColor() {
      if (!this.color || !this.validateColor(this.color)) {
        this.errors.color = 'Introduce un color en formato HEX sin # (FFFFFF) o RGB (123,12,245).';
      } else if (this.selected === ''){
        this.errors.selected = 'Elige tu esquema de color.';
      } else {
        this.errors.color = '';
        this.errors.selected = '';
      }
    },
    validateFormImage() {
      if (!this.isValidImage){
        this.errors.url = 'Indica una URL válida.';
      } else {
        this.errors.url = '';
      }
    },
    submitFormColor() {
      try {
        this.validateFormColor();

        if (!Object.values(this.errors).some(error => error !== '')) {
          console.log('Formulario enviado:', this.color);
          this.showColor = true;
          this.showImage = false;
          // llama al metodo para que se actualice
          this.$refs.rescolor.fetchColorPalette()
        }
      } catch (error) {
        console.error('Ocurrio un error al enviar el formulario de color', error)
      }
    },
    async submitFormImage(){
      try {
        await this.validateImageURL(this.url);
        this.validateFormImage();

        if (!Object.values(this.errors).some(error => error !== '')) {
          console.log('Url enviada:', this.url);
          this.showImage = true;
          this.showColor = false;
          this.$refs.resimagen.getPaletteImageColor();
        }
      } catch (error){
        console.error('Ha ocurrido un error al enviar el formulario de imagen', error)
      }
    },
    // metodos del modal
    openModal() {
      this.isModalOpened = true;
    },
    closeModal() {
      this.isModalOpened = false;
    },
    submitHandler() {
      // manejo del modal
    },
    handleLikedPalette(palette) {
      // Haz algo con la paleta de colores
      console.log(palette)
      // Abre el modal
      this.isModalOpened = true;
    },
  }
}
</script>

<template>
  <main class="main__content">
    <section>
    <article class="content__article">
      <section class="main__section">
        <h2>Hornea tu paleta de <span class="h2__color__sec">color</span> favorita_</h2>
        <p>Introduce un color en formato RGB o HEX y elige el estilo de tu paleta de color.</p>
        <form @submit.prevent="submitFormColor">
          <fieldset>
            <label for="color" style="font-weight: bolder"></label>

            <!-- Input del color -->
            <input
                id="color"
                placeholder="F28585"
                v-model="color"
                type="text"
                @change="submitFormColor('color')"
                >
            <p class="p__error">{{ errors.color }}</p>
          </fieldset>
          <fieldset class="section__article">

            <!--Dropdown menu-->
            <select class="home__select"
                v-model="selected"
                id="selected"
                @change="submitFormColor('selected')"
                >
              <option class="home__select__option" disabled value="">Selecciona un modo</option>
              <option class="home__select__option" value="monochrome">Monocromo</option>
              <option class="home__select__option" value="monochrome-dark">Monocromo oscuro</option>
              <option class="home__select__option" value="monochrome-light">Monocromo claro</option>
              <option class="home__select__option" value="analogic">Analogico</option>
              <option class="home__select__option" value="complement">Complementario</option>
              <option class="home__select__option" value="analogic-complement">Analogico-Complementario</option>
              <option class="home__select__option" value="triad">Tríada</option>
              <option class="home__select__option" value="quad">Cuarteto</option>
            </select>
            <button class="button" type="submit">Hornear color</button>
          </fieldset>
          <p class="p__error">{{ errors.selected }}</p>
        </form>
      </section>
      <section class="main__section">
        <h2>O elige una <span class="h2__color__sec">imagen_</span></h2>
        <p>Introduce la URL de la imagen jpg o png.</p>
        <form @submit.prevent="submitFormImage">
          <article>

          <!--Input tipo URL-->
            <input
                id="url"
                placeholder="http://midireccion.com/mi-imagen.jpg"
                v-model="url"
                type="url"
                @submit="submitFormImage('url')"
            >
            <button class="button" type="submit">Hornear imagen</button>
            <p class="p__error">{{ errors.url }}</p>
          </article>
        </form>
      </section>
    </article>
    </section>
    <section class="content__section">
      <article v-show="showColor">
        <resultado-color :color="color" :form="form" :selected="selected" ref="rescolor" @palette-liked="handleLikedPalette"/>
      </article>
      <article v-show="showImage">
        <resultado-imagen :url="url" ref="resimagen"/>
      </article>
    </section>

    <!-- modal con la eleccion de proyecto para la paleta color-->
    <modal :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
      <template #header><h2>Tus proyectos_</h2></template>
      <template #content><p> Selecciona un proyecto de la lista donde guardar tu nueva paleta, o crea un nuevo proyecto:</p>
        <form>
          <fieldset class="section__article">

            <!--Dropdown menu de seleccion de proyecto-->
            <select class="home__select"
                    v-model="selected"
                    id="selected"
                    @change="submitFormColor('selected')"
            >
              <option class="home__select__option" disabled value="">Selecciona un proyecto</option>

<!--              <option v-for="proyecto in proyectos" :key="proyecto.id">
                {{ proyecto.nombre }}
              </option>-->

            </select>
            <button class="button" type="submit">Elegir proyecto</button>
            <button class="button" >Nuevo proyecto</button>
          </fieldset>
        </form>
      </template>
      <template >sin el #footer, cargaria el boton del componente modal</template>
    </modal>
  </main>
  <home-section></home-section>
</template>

<style scoped>
.main__section{
  justify-self: center;
  padding: 0 2rem;
  margin: 0 2rem;
}
.main__content{
  display: inline-flex;
  width: 100%;
  padding: 0 6rem 0 6rem;
}
.content__section{
  width: 60%;
  margin: 0 auto;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
.content__article{
  margin: 4rem auto;
  width: 80%;
}
.section__article{
  display:inline-flex;
}
.home__select{
  width:14.8rem;
  height:fit-content;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem 0.625rem;
  margin: 0.625rem 0;
}
.home__select__option{
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 4;
}
h2{
  color: var(--font-color-h2-pri);
}
form{
  text-align: left;
}

input {
  width: 50%;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;

}
</style>