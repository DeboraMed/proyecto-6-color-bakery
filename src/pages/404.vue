<script>

</script>

<template>
  <section class="main__content">
    <article class="container__center">
      <h2 class="notfound__text"> 404 </h2>
    </article>
    <article class="container__center">
      <p class="notfound__p"> Oppss! Ha ocurrido un error. <br>
        La página que buscas no existe :(
        </p>
      <router-link to="/" custom v-slot="{ navigate }">
        <button class="button" @click="navigate" role="link">Inicio</button>
      </router-link>
    </article>
  </section>
</template>

<style>
.container__center{
  display: inline-flex;
  flex-direction: column;
}
:scope {
  .main__content {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  }

}

.notfound__text {
  margin: 0;
  padding: 0;
  font-size: 20rem;
  animation: fadein 2s ease 0s 1 normal forwards;
}

.notfound__p {
  margin-top:-18rem ;
}

@media only screen and (max-width: 48rem /*768px*/
) {
  .main__content {
    padding: 0 2rem 0 2rem;
  }

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
