<script>
import ColorThief from 'colorthief'

export default {
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      flag: true, // bandera
      palette: [],
      hexPalette: [],
      color: '',
      imageLoaded: false
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
    },
    getPaletteImageColor() {
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
    <section>
      <article v-if="!flag" class="main-img" alt="Horno de colores" title="Horno de colores"></article>
      <article v-if="flag">
      <div class="resultado-imagen">
          <div class="image-container">
            <img src="https://loremflickr.com/420/340" ref="img" alt="image" crossorigin="anonymous" @load="onImageLoad">
            <!--https://loremflickr.com/420/340-->
          </div>
          <div v-for="(color,i) in this.hexPalette"
               :key="i"
               :style="`background-color: #${color}`"
               class="tile">
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
  background-color: rgba(255,255,255,0.4);
}
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