<script>
import ColorThief from 'colorthief'
import BorderFooter from "../shared/BorderFooter.vue";
import {useUserStore} from "../stores/UserStore.js";

/* uso de la libreria ColorThief con la URL de la imagen dada */
export default {
  components: {BorderFooter},
  props: ['url', 'form'],
  /**
   *
   * @returns {{color: string, imageLoaded: boolean, palette: *[], hexPalette: *[], imageError: boolean}}
   */
  data() {
    return {
      palette: [],
      hexPalette: [],
      color: '',
      imageLoaded: false,
      imageError: false,
    }
  },
  watch: {
    /**
     *
     * @param newValue
     */
    imageLoaded(newValue) {
      if (newValue) {
        this.getPaletteImageColor();
      }
    }
  },
  computed: {
    /**
     *
     * @returns {Store<"user", {userData: [], token: string}, {}, {logout(): void, isLogged(): boolean, fetchUser(): Promise<void>, login(*, *): void, register(*, *, *): void}>}
     */
    userStore: () => useUserStore(),
  },
  methods: {
    /**
     * Se llama cuando la imagen se carga correctamente:
     */
    onImageLoad() {
      this.imageLoaded = true;
      this.imageError = false;
      this.hexPalette = [];
    },
    /**
     * Se llama cuando ocurre un error al cargar la imagen:
     */
    onImageError() {
      this.imageError = true;
    },
    /**
     * Obtiene la paleta de colores de la imagen
     * @returns {*[]}
     */
    getPaletteImageColor() {
      this.hexPalette = [];
      let colorThief = new ColorThief();
      this.palette = colorThief.getPalette(this.$refs.img);
      this.color = colorThief.getColor(this.$refs.img);

      for (let i = 0; i < this.palette.length; i++) {
        let p = this.palette[i];
        let r = Number(p[0])
        let g = Number(p[1])
        let b = Number(p[2])
        this.hexPalette.push(this.convertRGBtoHex(r, g, b))
      }
      return this.hexPalette;
    },
    /**
     * Convierte valores RGB a formato hexadecimal
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
     * Maneja el evento personalizado likeButtonClicked:
     */
    likeButtonClicked() {
      this.$emit('palette-photo-liked', this.hexPalette);
    },
  }
}
</script>

<template>
  <section>
    <section v-if="!url" class="main__img" title="Horno de colores"></section>
    <article class="content__image">

      <article v-if="url">
        <picture class="image__container">

          <button v-show="userStore.isLogged()" class="like__button" @click="likeButtonClicked" v-if="this.color">
            <font-awesome-icon icon="fa-solid fa-heart"/>
          </button>

          <!--URL flicker de prueba https://loremflickr.com/320/240?random=1 -->
          <img class="image__container__img" :src="url" ref="img" alt="imagen seleccionada" crossorigin="anonymous"
               @load="onImageLoad" @error="onImageError">
        </picture>
        <div class="color__palette">
          <div v-if="imageError">
            <img alt="Tu imagen no se pudo cargar" src="../assets/img/magdalenas-quemadas-noimagen.png">
            <p class="image__error">Tu imagen no ha podido ser procesada<br>Revisa la <a class="image__error__a"
                                                                                         href="https://developer.mozilla.org/es/docs/Web/HTTP/CORS">
              politica CORS</a> del host.</p>
          </div>
          <div class="color__swatch" v-else v-for="(color,i) in this.hexPalette.slice(0, 5)"
               :key="i"
               :style="`background-color: #${color}`"
          >
            <span class="color__text">#{{ color }}</span>
          </div>
        </div>
      </article>
    </article>
  </section>
</template>

<style scoped>
.like__button {
  position: absolute;
  padding: 1rem;
  top: 0;
}

.color__text {
  padding: 1rem;
  align-content: baseline;
  margin: 0 auto;
  filter: invert(100%);
}

.main__img {
  padding-bottom: 4rem;
  width: 100%;
  height: 35rem;

  background-image: url("../assets/img/horno-main.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  animation: fadein 2s ease 0s 1 normal forwards;
}

.content__image {
  margin: 4rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  animation: fadein 2s ease 0s 1 normal forwards;
}

.image__container {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  position: relative;
}

.image__container__img {
  width: 100%;
  height: 100%;
  max-width: 580px;
  max-height: 500px;
  object-fit: cover;
}

.image__error {
  padding: 1rem;
  text-align: center;
}

.image__error__a {
  text-decoration: none;
  color: var(--font-color);
  font-weight: bold;
}

.color__palette {
  display: flex;
}

.color__swatch {
  width: 7.25rem;
  height: 8rem;
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