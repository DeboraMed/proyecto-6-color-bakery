<script>
/**
 * Este componente es el encargado de mostrar la interfaz principal de la aplicación
 * que permite al usuario introducir un color o una imagen y obtener una paleta de
 * colores relacionada.
 */
  import axios from 'axios';
  import ResultadoColor from "./ResultadoColor.vue";
  import ResultadoImagen from "./ResultadoImagen.vue";
  import HomeSection from "./HomeSection.vue";
import BorderFooter from "../shared/BorderFooter.vue";
export default {
  /**
   * components: Registra los componentes hijos que se utilizan en este componente,
   * que son ResultadoColor, ResultadoImagen y HomeSection.
   */
  components: {BorderFooter, ResultadoColor, ResultadoImagen, HomeSection},
  data() {
    return {
      /**
       *  showColor: indica si se muestra el formulario y el resultado del color.
       */
      showColor: true,
      /**
       * showImage: booleano que indica si se muestra el formulario y el resultado de la imagen
       */
      showImage: false,
      /**
       * form: almacena el valor del button que selecciona el tipo de entrada (color o imagen).
       */
      form: '',
      /**
       * text: almacena el valor del input de texto que muestra el color o la url introducida por el usuario.
       */
      text: '',
      /**
       * selected: almacena el valor del select que elige el esquema de color a generar.
       */
      selected: '',
      /**
       * color: almacena el color introducido por el usuario en formato hexadecimal.
       */
      color: '',
      /**
       * url: almacena la url de la imagen introducida por el usuario.
       */
      url: '',
      /**
       * isValidImage: indica si la url introducida por el usuario carga una imagen válida o no.
       */
      isValidImage: false,
      /**
       * errors: objeto que almacena los mensajes de error de las validaciones de los formularios, que son:
       */
      errors: {
        color: '',
        selected: '',
        url: '',
      },
    }
  },
  methods: {
    /**
     * validateColor(color): Método que recibe un color como parámetro y devuelve un booleano que
     * indica si el color tiene un formato válido (HEX o RGB). Si el color es RGB, lo convierte a
     * HEX y lo almacena en la propiedad color.
     * @param color
     * @returns {default.methods.color|boolean}
     */
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
    /**
     * convertRGBtoHex(r, g, b): método que recibe los valores de rojo, verde y azul de un
     * color RGB como parámetros y devuelve el color equivalente en formato hexadecimal.
     * También almacena el color en la propiedad color.
     * @param r
     * @param g
     * @param b
     * @returns {string}
     */
    convertRGBtoHex(r, g, b) {
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
    /**
     * validateImageURL(url): métodoe que rcibe una url como parámetro y devuelve la promesa
     * que se resuelve si la url carga una imagen válida o se rechaza si no.
     * También actualiza la propiedad isValidImage segun el resultado.
     * @param url
     * @returns {Promise<unknown>}
     */
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
    /**
     * validateFormColor(): Un método que valida el formulario del color y muestra los mensajes
     * de error correspondientes en la propiedad errors si hay algún campo no valido.
     */
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
    /**
     * validateFormImage(): Un método que valida el formulario de la imagen y muestra el
     * mensaje de error en la propiedad errors si hay algún campo no valido.
     */
    validateFormImage() {
      if (!this.isValidImage){
        this.errors.url = 'Indica una URL válida.';
      } else {
        this.errors.url = '';
      }
    },
    /**
     * submitFormColor(): este método se ejecuta al enviar el formulario del color.
     * Llama al método validateFormColor() y si no hay errores, envía el color a través de
     * una 'referencia' al componente ResultadoColor para que genere la paleta de colores.
     * También actualiza las propiedades showColor y showImage para mostrar el resultado del
     * color y ocultar el de la imagen.
     */
    submitFormColor(){
      try {
        this.validateFormColor();

        if (!Object.values(this.errors).some(error => error !== '')) {
          console.log('Formulario enviado:', this.color);
          this.showColor = true;
          this.showImage = false;
          this.$refs.rescolor.fetchColorPalette()
        }
      } catch (error){
        console.error('Ocurrio un error al enviar el formulario de color', error)
      }
    },
    /**
     * submitFormImage(): se ejecuta al enviar el formulario de la imagen.
     * Llama al método validateImageURL() y espera su resultado.
     * Luego llama al método validateFormImage() y si no hay errores, envía la url a través
     * de una referencia al componente ResultadoImagen para que genere la paleta de colores.
     * También actualiza las propiedades showImage y showColor para mostrar el resultado de
     * la imagen y ocultar el del color.
     * @returns {Promise<void>}
     */
    async submitFormImage(){
      try {
        await this.validateImageURL(this.url);
        this.validateFormImage();

        if (!Object.values(this.errors).some(error => error !== '')) {
          console.log('Url enviada:', this.url);
          this.showImage = true;
          this.showColor = false;
          this.$refs.resimagen.getPaletteImageColor();

          //this.url = '';
        }
      } catch (error){
        console.error('Ha ocurrido un error al enviar el formulario de imagen', error)
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
        <resultado-color :color="color" :form="form" :selected="selected" ref="rescolor"/>
      </article>
      <article v-show="showImage">
        <resultado-imagen :url="url" ref="resimagen"/>
      </article>
    </section>
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
/*TODO: normalizar los buttons (un solo tipo) y cambiar la imagen con el dark mode */
button[type="submit"] {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
  display: inline-flex;
  color: #fff;
  cursor: pointer;
  border: 0;
  padding: 0.625rem 0.9375rem;
  margin: 0.625rem;
}
</style>