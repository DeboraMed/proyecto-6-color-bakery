<script>
import ResultadoColor from "./ResultadoColor.vue";
import HomeSection from "./HomeSection.vue";
import BorderFooter from "../shared/BorderFooter.vue";
import Modal from "../shared/Modal.vue";
import {useProjectStore} from "../stores/ProjectStore.js";
import axios from "axios";
import {useFavoriteStore} from "../stores/FavoriteStore.js";
import Alert from "../shared/Alert.vue";
import {useUserStore} from "../stores/UserStore.js";

export default {
  components: {Alert, Modal, BorderFooter, ResultadoColor, HomeSection},
  /**
   *
   * @returns {{userStore: _StoreWithState<"user", {userData: [], token: string}, {}, {logout(): void, isLogged(): boolean, fetchUser(): Promise<void>, login(*, *): void, register(*, *, *): void}> & UnwrapRef<{userData: [], token: string}> & _StoreWithGetters<{}> & {logout(): void, isLogged(): boolean, fetchUser(): Promise<void>, login(*, *): void, register(*, *, *): void} & PiniaCustomProperties<"user", {userData: [], token: string}, {}, {logout(): void, isLogged(): boolean, fetchUser(): Promise<void>, login(*, *): void, register(*, *, *): void}> & PiniaCustomStateProperties<{userData: [], token: string}>}}
   */
  setup() {
    const userStore = useUserStore();

    return {userStore};
  },
  /**
   * Define las propiedades reactivas del componente
   * @returns {{colourPayload: *[], color: string, showColor: boolean, isLiked: boolean, colourPayloadImage: *[], listProjects: *[], favoriteStore: _StoreWithState<"favorite", {favoriteData: [], token: string}, {}, {getFavorites(): Promise<void>, addFavorites(*): void, deleteFavorites(*): void}> & UnwrapRef<{favoriteData: [], token: string}> & _StoreWithGetters<{}> & {getFavorites(): Promise<void>, addFavorites(*): void, deleteFavorites(*): void} & PiniaCustomProperties<"favorite", {favoriteData: [], token: string}, {}, {getFavorites(): Promise<void>, addFavorites(*): void, deleteFavorites(*): void}> & PiniaCustomStateProperties<{favoriteData: [], token: string}>, isModalOpened: boolean, form: string, selectedProject: string, text: string, selected: string, errors: {color: string, selected: string}}}
   */
  data() {
    const favoriteStore = useFavoriteStore();
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
      isLiked: false,
      favoriteStore,
      errors: {
        color: '',
        selected: '',
      },
    }
  },
  computed: {
    /**
     * Acceso al ProjectStore a través de una computed property
     * @returns {Store<"project", {projectData: []}, {}, {editProject(*, *, *): Promise<void>, getProjects(): Promise<void>, createNewProject(*, *): Promise<void>, deletePalette(*): void, deleteProjects(*): void, addPaletteToProject(*, *): void}>}
     */
    projectStore: () => useProjectStore(),
  },
  methods: {
    /**
     * Llama a `addFavorite` del FavoriteStore
     */
    toggleLike() {
      // boton llama a addFavorite
      this.favoriteRandomColor()
      this.isLiked = !this.isLiked;
    },
    /**
     * Validación del formato de color (HEX o RGB)
     * @param color
     * @returns {default.methods.color|boolean}
     */
    validateColor(color) {
      const regexHex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      const regexRgb = /^([0-1]?\d?\d|2[0-4]\d|25[0-5]),([0-1]?\d?\d|2[0-4]\d|25[0-5]),([0-1]?\d?\d|2[0-4]\d|25[0-5])$/;

      if (!(regexHex.test(color) || regexRgb.test(color))) {
        return false;
      } else if (regexHex.test(color)) {
        return true;
      } else if (regexRgb.test(color)) {
        color = color.split(',')
        let r = Number(color[0])
        let g = Number(color[1])
        let b = Number(color[2])

        return this.convertRGBtoHex(r, g, b)
      }
    },
    /**
     * Convierte valores RGB a HEXadecimal
     * @param r
     * @param g
     * @param b
     * @returns {string}
     */
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
      return this.color
    },
    /**
     * Valida el color y la opción seleccionada
     */
    validateFormColor() {
      if (!this.color || !this.validateColor(this.color)) {
        this.errors.color = 'Introduce un color en formato HEX sin # (FFFFFF) o RGB (123,12,245).';
      } else if (this.selected === '') {
        this.errors.selected = 'Elige tu esquema de color.';
      } else {
        this.errors.color = '';
        this.errors.selected = '';
      }
    },
    /**
     * Valida el formulario llamando a validateFormColor
     */
    submitFormColor() {
      try {
        this.validateFormColor();

        if (!Object.values(this.errors).some(error => error !== '')) {
          this.showColor = true;
          this.showImage = false;
          // llama al metodo para que se actualice
          this.$refs.rescolor.fetchColorPalette()
        }
      } catch (error) {
        console.error('Ocurrio un error al enviar el formulario de color', error)
      }
    },
    /**
     * Cierra el modal estableciendo isModalOpened en false.
     */
    closeModal() {
      this.isModalOpened = false;
    },
    /**
     * Agrega la paleta de colores al proyecto seleccionado a través del projectStore
     * @param selectedProject
     */
    handleSubmission(selectedProject) {
      if (this.isHandlingColor) {
        this.projectStore.addPaletteToProject(selectedProject, this.colourPayload);
      } else {
        this.projectStore.addPaletteToProject(selectedProject, this.colourPayloadImage);
      }
    },
    /**
     * Obtiene los colores de la paleta pasada como parámetro.
     * @param palette
     * @returns {Promise<void>}
     */
    async handleLikedColor(palette) {

      this.colourPayload = palette.colors.map(color => ({hex: color.hex.clean}))

      this.isHandlingColor = true;
      // Abre el modal
      this.isModalOpened = true;

      // flag que define el payload de la llamada a la api
      await this.projectStore.getProjects();

      this.listProjects = this.projectStore.projectData;
    },
    /**
     * Realiza una petición GET a la API para obtener un color aleatorio.
     */
    getRandomColor() {
      axios.get('/api/v1/colors/random')
          .then(data => {
            if (data.statusText === "OK") {

              this.color = data.data;
            }
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
    },
    /**
     * Añade el color actual a los favoritos a través del favoriteStore si el color está definido
     */
    favoriteRandomColor() {
      if (this.color !== undefined) {
        // llama al favoriteStore
        this.favoriteStore.addFavorites(this.color)
      } else {
        console.error('Error en la solicitud:', error);
      }
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

          <p class="color__text" :style="{ background: '#' + this.color }">color generado: #{{ this.color }} </p>
          <button class="button" :style="{ background: '#' + this.color }" @click="getRandomColor()">Generar color
          </button>

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
          <article v-show="userStore.isLogged()">
            <h2> Añade tu <span class="h2__color__sec">nuevo color</span> a favoritos</h2>
            <button v-bind:disabled="!this.color" title="Añadir a favoritos" class="button" :class="{ liked: isLiked }"
                    @click="toggleLike">
              <font-awesome-icon icon="fa-solid fa-heart" class="icon"/>
              Añadir a favoritos
            </button>
            <alert></alert>
          </article>
        </section>
      </article>
    </section>
    <section class="content__section">
      <article v-show="showColor">
        <resultado-color :color="color" :form="form" :selected="selected" ref="rescolor"
                         @palette-liked="handleLikedColor"/>
      </article>
    </section>


    <!-- modal con la eleccion de proyecto para la paleta color-->
    <modal :isOpen="isModalOpened" @modal-close="closeModal" name="first-modal">
      <template #header><h2>Tus proyectos_</h2></template>
      <template #content><p> Selecciona un proyecto de la lista donde guardar tu nueva paleta, o crea un nuevo
        proyecto:</p>
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
            <router-link to="/proyectos" custom v-slot="{ navigate }">
              <button class="button" @click="navigate" role="link">Nuevo proyecto</button>
            </router-link>
          </fieldset>
        </form>
      </template>
      <template>sin el #footer, cargaria el boton del componente modal</template>
    </modal>
  </main>
  <home-section></home-section>
</template>

<style scoped>
.main__section {
  justify-self: center;
  padding: 0 2rem;
  margin: 0 2rem;
}

.main__content {
  display: inline-flex;
  width: 100%;
  padding: 0 6rem 0 6rem;
}

.content__section {
  width: 60%;
  margin: 0 auto;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.content__article {
  margin: 4rem auto;
  width: 80%;
}

.section__article {
  display: inline-flex;
}

.home__select {
  width: 14.8rem;
  height: fit-content;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem 0.625rem;
  margin: 0.625rem 0;
}

.home__select__option {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 4;
}

.home__select__option__projects {
  width: 20rem;
}

.icon {
  padding-right: 0.3rem;
}

h2 {
  color: var(--font-color-h2-pri);
}

form {
  text-align: left;
}

input {
  width: 50%;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;

}

.color__text {
  text-shadow: #a4a4a4 1px 1px;
}
@media only screen and (max-width: 48rem /*768px*/
) {
  .main__section{
    margin: 0;
    padding: 0;
  }
  .main__content {
    flex-direction: column;
    padding: 0 2rem 0 2rem;
  }

  .content__section {
    width: 100%;
  }
  .content__article{
    margin: 0;
    width: 100%;
  }

  input,
  textarea {
    width: 100%;
  }

  form {
    padding: 0;
    margin: 0;
  }
}

@media screen and (max-width: 75rem /*1200px*/
) {
  input {
    width: 50%;
  }

  input,
  textarea {
    width: 100%;
  }
  .main__content{
    padding: 0 2rem 0 2rem;
  }

}
</style>