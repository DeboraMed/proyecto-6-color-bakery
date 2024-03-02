<script>
import {useUserStore} from '../stores/UserStore.js';
import BorderFooter from "../shared/BorderFooter.vue";
import Alert from "../shared/Alert.vue";

export default {
  components: {Alert, BorderFooter},
  /**
   * Función de composición
   * @returns {{userStore: _StoreWithState<"user", {userData: [], token: string}, {}, {logout(): void, isLogged(): boolean, fetchUser(): Promise<void>, login(*, *): void, register(*, *, *): void}> & UnwrapRef<{userData: [], token: string}> & _StoreWithGetters<{}> & {logout(): void, isLogged(): boolean, fetchUser(): Promise<void>, login(*, *): void, register(*, *, *): void} & PiniaCustomProperties<"user", {userData: [], token: string}, {}, {logout(): void, isLogged(): boolean, fetchUser(): Promise<void>, login(*, *): void, register(*, *, *): void}> & PiniaCustomStateProperties<{userData: [], token: string}>}}
   */
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    }
  },
  /**
   * Define las propiedades reactivas del componente
   * @returns {{password: string, email: string, errors: {password: string, email: string}}}
   */
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    /**
     * Valida el campo especificado (`field`) y actualiza el objeto `errors`.
     * @param field
     */
    validateForm(field) {
      if (!this.password || this.password.length < 3) {
        this.errors.password = 'Introduce un contraseña con al menos 3 caracteres.';
      }
      if (!this.email || !this.validateEmail(this.email)) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      } else {
        this.errors[field] = '';
      }
    },
    /**
     * Valida el formato del correo electrónico usando una expresión regular.
     * @param email
     * @returns {boolean}
     */
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      return re.test(email);
    },
    /**
     * Método asíncrono que se ejecuta al enviar el formulario:
     * @returns {Promise<void>}
     */
    async submitForm() {
      this.validateForm('email');
      this.validateForm('password');

      // aqui llamar el UserStore
      this.userStore.login(this.email, this.password)
    },
  }
}
</script>

<template>
  <main class="main__content">
    <section class="content__article">
      <form class="form" @submit.prevent="submitForm">
        <h2>Logueate_</h2>
        <div>
          <p> Logueate en la web.</p>
        </div>
        <fieldset>
          <label for="email"></label>
          <input
              id="email"
              placeholder="email@email.com"
              v-model="email"
              type="text"
              @change="validateForm('email')">
          <p class="p__error">{{ errors.email }}</p>
        </fieldset>
        <fieldset>
          <label for="contraseña"></label>
          <input
              id="password"
              placeholder="Contraseña"
              v-model="password"
              type="password"
              @change="validateForm('password')">
          <p class="p__error">{{ errors.password }}</p>
        </fieldset>
        <button class="button" type="submit">Enviar</button>
      </form>
      <alert></alert>
    </section>
    <section class="content__section">
      <img class="content__section__img" src="../assets/img/img-colores.png" alt="Ruedas de colores"
           title="Ruedas de colores">
    </section>
  </main>
</template>

<style scoped>
.main__content {
  margin: 4rem auto;
  display: inline-flex;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 6rem 0 6rem;
}

.content__section {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.content__section__img {
  width: 50%;
  margin: auto;
}

.content__article {
  text-align: center;
}

input {
  width: 50%;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}
</style>