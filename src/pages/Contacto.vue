<script>
import BorderFooter from "../shared/BorderFooter.vue";

export default {
  components: {BorderFooter},
  /**
   * Define las propiedades reactivas del componente
   * @returns {{titulo: string, mensaje: string, nombre: string, email: string, errors: {titulo: string, mensaje: string, nombre: string, email: string}}}
   */
  data() {
    return {
      mensajeExito: '',
      nombre: '',
      email: '',
      titulo: '',
      mensaje: '',
      errors: {
        nombre: '',
        email: '',
        titulo: '',
        mensaje: ''
      },
    }
  },
  methods: {
    /**
     *  Valida cada campo del formulario
     * @param field
     */
    validateForm(field) {
      if (field === 'nombre' && (!this.nombre || typeof this.nombre !== 'string' || this.nombre.length < 3)) {
        this.errors.nombre = 'Introduce un nombre con al menos 3 caracteres.';
      } else if (field === 'titulo' && (!this.titulo || typeof this.titulo !== 'string' || this.titulo.length < 3)) {
        this.errors.titulo = 'Introduce un título con al menos 3 caracteres.';
      } else if (field === 'mensaje' && (!this.mensaje || this.mensaje.length < 10)) {
        this.errors.mensaje = 'Introduce un mensaje con al menos 10 caracteres.';
      } else if (field === 'email' && (!this.email || !this.validateEmail(this.email))) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      } else {
        this.errors[field] = '';
      }
    },
    /**
     * Valida el email con una Regex
     * @param email
     * @returns {boolean}
     */
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      return re.test(email);
    },
    /**
     * llama al metodo validateForm con cada campo del formulario para que lo valida
     */
    submitForm() {
      this.validateForm('nombre');
      this.validateForm('email');
      this.validateForm('titulo');
      this.validateForm('mensaje');

      // si todos los campos estan validados
      if (!Object.values(this.errors).some(error => error !== '')) {
        this.mensajeExito = 'Mensaje enviado correctamente'
      }
    },
  }
}
</script>

<template>
  <main class="main__content">
    <section class="content__section">
      <img class="content__section__img" src="../assets/img/img-horno.png" alt="Horno de colores"
           title="Horno de colores">
    </section>
    <section class="content__article">
      <form class="form" @submit.prevent="submitForm">
        <h2>Formulario de Contacto_</h2>
        <fieldset>
          <p> Gracias por ponerte en contacto con nosotros.</p>
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
          <label for="title"></label>
          <input
              id="title"
              placeholder="Titulo"
              v-model="titulo"
              type="text"
              @change="validateForm('titulo')">
          <p class="p__error">{{ errors.titulo }}</p>
        </fieldset>
        <fieldset>
          <label for="message"></label>
          <textarea
              id="message"
              placeholder="Escriba aqui su mensaje"
              v-model="mensaje"
              rows="6"
              @change="validateForm('mensaje')"></textarea>
          <p class="p__error">{{ errors.mensaje }}</p>
        </fieldset>
        <button class="button" type="submit">Enviar</button>
        <p>{{ this.mensajeExito }}</p>
      </form>
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

input {
  width: 50%;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}

textarea {
  width: 100%;
  border: 0;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}

@media only screen and (max-width: 48rem /*768px*/
) {
  .main__content {
    flex-direction: column;
    padding: 0 2rem 0 2rem;
  }

  .content__section {
    width: 100%;
  }

  .content__section__img {
    width: 80%;
  }

  input,
  textarea {
    width: 100%;
  }

  .form {
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

  .content__section__img {
    width: 70%;
  }
}
</style>