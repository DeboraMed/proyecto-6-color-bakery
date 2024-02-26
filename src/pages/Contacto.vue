<script>
import BorderFooter from "../shared/BorderFooter.vue";

export default {
  components: {BorderFooter},
  data() {
    return {
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
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      return re.test(email);
    },
    submitForm() {
      this.validateForm('nombre','email','titulo','mensaje');

      if (!Object.values(this.errors).some(error => error !== '')) {
        console.log('Formulario enviado:', this.nombre, this.email, this.titulo, this.mensaje);
      }
    },
  }
}
</script>

<template>
  <main class="main__content">
    <section class="content__section">
      <img class="content__section__img" src="../assets/img/img-horno.png" alt="Horno de colores" title="Horno de colores">
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
              @change="submitForm('nombre')">
          <p class="p__error">{{ errors.nombre }}</p>
        </fieldset>
        <fieldset>
          <label for="email"></label>
          <input
              id="email"
              placeholder="email@email.com"
              v-model="email"
              type="text"
              @change="submitForm('email')">
          <p class="p__error">{{ errors.email }}</p>
        </fieldset>
        <fieldset>
          <label for="title"></label>
          <input
              id="title"
              placeholder="Titulo"
              v-model="titulo"
              type="text"
              @change="submitForm('titulo')">
          <p class="p__error">{{ errors.titulo }}</p>
        </fieldset>
        <fieldset>
          <label for="message"></label>
          <textarea
              id="message"
              placeholder="Escriba aqui su mensaje"
              v-model="mensaje"
              rows="6"
              @change="submitForm('mensaje')"></textarea>
          <p class="p__error">{{ errors.mensaje }}</p>
        </fieldset>
        <button class="button" type="submit">Enviar</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.main__content{
  display: inline-flex;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 6rem 0 6rem;
}
.content__section{
  display: block;
  width: 50%;
}
.content__section__img{
  width: 50%;
  margin: auto;
}
input {
  width: 25%;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}
textarea {
  width: 50%;
  border: 0;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}
</style>