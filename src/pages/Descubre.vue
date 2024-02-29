<script>
import ResultadoColor from "./ResultadoColor.vue";
import HomeSection from "./HomeSection.vue";
import BorderFooter from "../shared/BorderFooter.vue";
import Modal from "../shared/Modal.vue";
import {useProjectStore} from "../stores/ProjectStore.js";
import axios from "axios";


/* para que el Modal sea reactivo */
export default {
  components: {Modal, BorderFooter, ResultadoColor, HomeSection},
  data() {
    return {
      listProjects: [],
      colourPayload: [],
      colourPayloadImage: [],
      isModalOpened: false,
      showColor: true,
      form: '',
      text: '',
      selected: '',
      selectedProject: '',
      color: '',
      errors: {
        color: '',
        selected: '',
      },
    }
  },
  computed: {
    projectStore: () => useProjectStore(),
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
    closeModal() {
      this.isModalOpened = false;
    },
    submitHandler() {
      // manejo del modal
    },
    handleSubmission(selectedProject) {
      if (this.isHandlingColor) {
        this.projectStore.addPaletteToProject(selectedProject, this.colourPayload);
      } else {
        this.projectStore.addPaletteToProject(selectedProject, this.colourPayloadImage);
      }
    },
    async handleLikedColor(palette) {

      console.log(palette.colors)
      /*let colourAPI = palette.colors;*/

      this.colourPayload = palette.colors.map(color => ({ hex: color.hex.clean }))

      console.log(this.colourPayload);
      this.isHandlingColor = true;
      // Abre el modal
      this.isModalOpened = true;

      console.log(this.isModalOpened)
      // flag que define el payload de la llamada a la api
      await this.projectStore.getProjects();

      this.listProjects = this.projectStore.projectData;
      console.log(this.listProjects.projects)
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
  }
}
</script>

<template>
  <main class="main__content">
    <section>
      <article class="content__article">
        <section class="main__section">
          <h2>Descubre nuevos <span class="h2__color__sec">colores_</span></h2>
          <p>Descubre un nuevo color y genera paletas con el.</p>

          <p class="color__text" :style="{ background: '#' + this.color }">color generado: #{{this.color}} </p>
          <button class="button" :style="{ background: '#' + this.color }" @click="getRandomColor()" >Generar color</button>

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
      </article>
    </section>
    <section class="content__section">
      <article v-show="showColor">
        <resultado-color :color="color" :form="form" :selected="selected" ref="rescolor" @palette-liked="handleLikedColor"/>
      </article>
    </section>

    <!-- modal con la eleccion de proyecto para la paleta color-->
    <modal :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
      <template #header><h2>Tus proyectos_</h2></template>
      <template #content><p> Selecciona un proyecto de la lista donde guardar tu nueva paleta, o crea un nuevo proyecto:</p>
        <!-- select con los proyectos del usuario -->
        <form @submit.prevent="selectedProject && handleSubmission(selectedProject)">
          <fieldset class="section__article">

            <!--Dropdown menu de seleccion de proyecto-->
            <select class="home__select"
                    v-model="selectedProject"
                    id="selectedProject"
                    @change="submitFormColor('selectedProject')"
            >
              <option class="home__select__option__projects" disabled value="">Selecciona un proyecto</option>
              <option v-for="project in this.listProjects.projects" :key="project.id" :value="project.id">
                {{ project.name }}
              </option>

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
.home__select__option__projects{
  width:20rem;
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
.color__text{
  text-shadow: #a4a4a4 1px 1px;
}
</style>