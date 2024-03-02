<script>
import {useUserStore} from '../stores/UserStore.js';
import BorderFooter from "../shared/BorderFooter.vue";
import Alert from "../shared/Alert.vue";
import {useAlertStore} from "../stores/AlertStore.js";

export default {
  components: {Alert, BorderFooter}, setup() {
    const userStore = useUserStore();
    return {
      userStore,
    }
  },
  /**
   * Define las propiedades reactivas del componente
   * @returns {{password: string, re_password: string, nombre: string, email: string, errors: {password: string, re_password: string, nombre: string, email: string}}}
   */
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      re_password: '',
      errors: {
        nombre: '',
        email: '',
        password: '',
        re_password: ''
      },
    }
  },
  methods: {
    /**
     * Valida un campo específico del formulario de registro:
     * @param field
     */
    validateForm(field) {
      if (field === 'nombre' && (!this.nombre || typeof this.nombre !== 'string' || this.nombre.length < 3)) {
        this.errors.nombre = 'Introduce un nombre con al menos 3 caracteres.';
      } else if (field === 'email' && (!this.email || !this.validateEmail(this.email))) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      } else if (field === 'password' && (!this.password || this.password.length < 2)) {
        this.errors.password = 'Introduce un contraseña con al menos 3 caracteres.';
      } else if (!this.re_password || this.re_password !== this.password) {
        this.errors.re_password = 'Introduce la misma contraseña.';
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
     * Valida todos los campos del formulario llamando a validateForm para cada campo relevante.
     * @returns {Promise<void>}
     */
    async submitForm() {
      this.validateForm('nombre', 'email', 'password', 're_password');

      // aqui llamar el UserStore
      this.userStore.register(this.nombre, this.email, this.password);

    },
  }
}
</script>

<template>
  <main class="main__content">
    <section class="content__section">
      <img class="content__section__img" src="../assets/img/img-bolleria.png" alt="Bollitos de colores"
           title="Bollitos de colores">
    </section>
    <section class="content__article">
      <form class="form" @submit.prevent="submitForm">
        <h2>Formulario de Registro_</h2>
        <fieldset>
          <p> Regístrate en nuestra web.</p>
          <label for="name"></label>
          <input
              id="name"
              placeholder="Nombre"
              v-model="nombre"
              type="text"
              @change="validateForm('nombre')">
          <p class="p__error">{{ errors.nombre }}</p>
        </fieldset>
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
        <fieldset>
          <label for="contraseña"></label>
          <input
              id="re_password"
              placeholder="Repite la contraseña"
              v-model="re_password"
              type="password"
              @change="validateForm('re_password')">
          <p class="p__error">{{ errors.re_password }}</p>
        </fieldset>
        <button class="button" type="submit">Enviar</button>
        <alert></alert>
      </form>
    </section>
  </main>
</template>

<style scoped>
.main__content {
  margin: 4rem auto;
  display: inline-flex;
  /*flex-wrap: nowrap;*/
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
  width: 60%;
  margin: auto;
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
</style>