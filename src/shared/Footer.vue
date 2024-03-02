<script setup>
import {useUserStore} from "../stores/UserStore.js";
import authGuard from "../router/guard.js";

const userStore = useUserStore();
</script>

<template>
  <footer>

    <!-- Footer main -->
    <section class="ft__main">
      <article class="ft__main__item">
        <img class="ft__title" src="../assets/img/color-bakery-texto-footer.svg" alt="ColorBakery">
        <ul>
          <li>
            <router-link v-show="!userStore.isLogged()" class="footer__a" to="/login" :before-enter="authGuard">
              Logueate
            </router-link>
          </li>
          <li>
            <router-link v-show="!userStore.isLogged()" class="footer__a" to="/registro" :before-enter="authGuard">
              Registrate
            </router-link>
          </li>
          <li>
            <router-link v-show="userStore.isLogged()" class="footer__a" to="/perfil" :before-enter="authGuard">Perfil
            </router-link>
          </li>
          <li>
            <router-link v-show="userStore.isLogged()" class="footer__a" to="/favoritos" :before-enter="authGuard">
              Favoritos
            </router-link>
          </li>
          <li>
            <router-link v-show="userStore.isLogged()" class="footer__a" to="/proyectos" :before-enter="authGuard">
              Proyectos
            </router-link>
          </li>
        </ul>
      </article>
      <article class="ft__main__item">
        <h2 class="ft__title">Sobre nosotros</h2>
        <ul>
          <li>
            <router-link class="footer__a" to="/">Inicio</router-link>
          </li>
          <li>
            <router-link class="footer__a" to="/descubre">Descubre</router-link>
          </li>
          <li>
            <router-link class="footer__a" to="/contacto">Contacto</router-link>
          </li>
        </ul>
      </article>
      <article class="ft__main__item">
        <h2 class="ft__title">Comentanos</h2>
        <p class="footer__p">¿Tienes alguna pregunta, comentario o sugerencia? <br>¡Nos encantaría saber de ti! Utiliza
          nuestro formulario de contacto.</p>
        <form>
          <router-link to="/contacto">
            <button class="button__sec"> Contacto</button>
          </router-link>
        </form>
      </article>
    </section>

    <!-- Footer legal -->
    <section class="ft__legal">
      <ul class="ft__legal__list">
        <li>
          <router-link class="footer__a" to="#">Terminos y condiciones</router-link>
        </li>
        <li>
          <router-link class="footer__a" to="#">Politica de privacidad</router-link>
        </li>
        <li>&copy; 2024 Copyright Proyecto Vue/Laravel.</li>
      </ul>
    </section>
  </footer>
</template>

<style scoped>
/*footer general*/
footer {
  flex-shrink: 0;
  bottom: 0;
  width: 100%;
  color: #bbb;
  line-height: 1.5;
}

.footer__a {
  text-decoration: none;
  color: var(--a-color-ft);
}

.footer__a:hover {
  color: var(--a-color-hover);
}

.footer__p {
  color: #bbb;
}

.ft__title {
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 1.375rem;
  padding-bottom: 0.625rem;
}

.ft__main {
  padding: 0.25rem 4.875rem;
  display: flex;
  flex-wrap: wrap;
  bottom: 0;
  background-color: var(--ft-bg-color-medium);
  text-decoration: none;
}

.ft__main__item {
  padding: 1.25rem;
  min-width: 12.5rem /*200px*/;
}

/*contacto footer*/
form {
  display: flex;
  flex-wrap: wrap;
}

/*legal footer*/

.ft__legal {
  padding: 0.05rem 1.5rem;
  background-color: var(--ft-bg-color-dark);
}

.ft__legal__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.ft__legal__list li {
  margin: 0.125rem 0.625rem;
  white-space: nowrap;
}

/* one before the last child */
.ft__legal__list li:nth-last-child(2) {
  flex: 1; /* same as flex-grow: 1; */
}

/*footer medias*/
@media only screen and (max-width: 29.8125rem /*477px*/
) {
  .ft__main {
    justify-content: space-around;
    padding: 0.25rem 0.25rem;
  }
}

@media only screen and (min-width: 29.8125rem /*477px*/
) {
  .ft__main {
    justify-content: space-around;
    padding: 0.25rem 0.25rem;
  }
}

@media only screen and (min-width: 77.5rem /*1240px*/
) {
  .ft__main {
    justify-content: space-evenly;
    padding: 0.25rem 0.25rem;
  }
}

</style>