<script>
import ColorThief from 'colorthief'

export default {
  name: 'ResultadoImagen',
  data() {
    return {
      palette: [],
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
    }
  }
}
</script>

<template>
  <main class="main-content-imgcolor">
    <section class="container-imgcolor">
      <article>
        <div class="resultado-imagen">
          <div class="image-container">
            <img src="https://loremflickr.com/420/340" ref="img" alt="image" crossorigin="anonymous" @load="onImageLoad">
          </div>
          <div class="tile"
               v-for="(p,i) in palette"
               :key="i"
               :style="`background-color: rgb(${p[0]},${p[1]},${p[2]})`">
            <span class="color">rgb({{p[0]}}, {{p[1]}}, {{p[2]}})</span>
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
</style>