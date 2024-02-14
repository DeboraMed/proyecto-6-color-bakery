<script>
import ColorThief from 'colorthief'

/* uso de la libreria ColorThief con la URL de la imagen dada */
export default {
  props: ['url','form'],
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
    imageLoaded(newValue) {
      if (newValue) {
        this.getPaletteImageColor();
      }
    }
  },
  methods: {
    onImageLoad() {
      this.imageLoaded = true;
      this.imageError = false;
      /*this.getPaletteImageColor();*/
    },
    onImageError() {
      this.imageError = true;
    },
    getPaletteImageColor() {
      this.hexPalette = [];
      let colorThief = new ColorThief();
      this.palette = colorThief.getPalette(this.$refs.img);
      this.color = colorThief.getColor(this.$refs.img);
      console.log(this.palette)

      for (let i = 0; i < this.palette.length; i++) {
        let p = this.palette[i];
        let r = Number(p[0])
        let g = Number(p[1])
        let b = Number(p[2])
        this.hexPalette.push(this.convertRGBtoHex(r, g, b))
      }
      console.log(this.hexPalette)
      console.log(this.url)
      return this.hexPalette;
    },
    convertRGBtoHex(r,g,b){
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
    }
  }
}
</script>

<template>
  <main class="main-content-color">
    <section v-if="!url" class="main-img" title="Horno de colores"></section>
    <section class="section-content-color">
      <article v-if="url" class="polaroid rotarIzq">
        <div class="image-container">
          <!--URL flicker de prueba https://loremflickr.com/320/240?random=1 -->
          <img :src="url" ref="img" alt="image" crossorigin="anonymous" @load="onImageLoad" @error="onImageError">
        </div>
        <div class="color-palette">
          <div v-if="imageError" >
           <img src="../assets/img/magdalenas-quemadas-noimagen.png">
            <p>Los siento...Tu imagen no se pudo cargar.</p>
          </div>
          <div class="color-swatch" v-else v-for="(color,i) in this.hexPalette.slice(0, 5)"
               :key="i"
               :style="`background-color: #${color}`"
          >
            <span class="color">#{{color}}</span>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.color {
  filter: invert(100%);
}
.main-content-color{
  padding-top: 2rem;
  display: flex; /* centrar */
  justify-content: center; /* centrar */
  align-items: center; /* centrar */
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
.section-content-color{
  width: auto;
  height: auto;
}
.polaroid {
  display: flex; /* centrar */
  flex-direction: column;
  justify-content: center; /* centrar */
  align-items: center; /* centrar */
  width: auto;
  height: auto;
  min-width: 300px;
  min-height: 300px;
  padding:10px 10px 50px 10px;
  border-radius: 10px;
  background-color:white;
  overflow: hidden;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.rotarIzq {
  transform:rotate(5deg);
  -ms-transform:rotate(5deg); /*!* IE9 *!*/
  -webkit-transform:rotate(5deg); /*!* Safari y Chrome *!*/
  -moz-transform:rotate(5deg);
}

.image-container {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  max-width: 480px;
  max-height: 500px;
  position: relative;
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image-error{
  padding: 1rem;
  text-align: center;
}
.color-palette {
  display: flex;
}
.color-swatch {
  width: 6rem;
  height: 5rem;
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