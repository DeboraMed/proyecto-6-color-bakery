<script>
export default {
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
        message: ''
      },
    }
  },
  methods: {
    submitForm() {
      this.errors = { nombre: '', email: '', titulo: '', mensaje: '' };
      let isValid = true;

      if (!this.nombre || typeof this.nombre !== 'string' || this.nombre.length < 3) {
        this.errors.nombre = 'Introduce un nombre con al menos 3 caracteres.';
        isValid = false;
      }
      if (!this.titulo || typeof this.titulo !== 'string' || this.titulo.length < 3) {
        this.errors.titulo = 'Introduce un título con al menos 3 caracteres.';
        isValid = false;
      }
      if (!this.mensaje || this.mensaje.length < 10) {
        this.errors.message = 'Introduce un mensaje con al menos 10 caracteres.';
        isValid = false;
      }
      if (!this.email || !this.validateEmail(this.email)) {
        this.errors.email = 'Introduce un correo electrónico válido.';
        isValid = false;
      }

      if (isValid) {
        // datos del formulario validado
        console.log('Formulario enviado:', this.nombre, this.email, this.titulo, this.mensaje);
      }
    },
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      return re.test(email);
    },
  }
}
</script>

<template>
  <div class="main-content">
    <div class="form">
      <h2>Formulario de Contacto_</h2>
      <form
          @submit.prevent="submitForm">
      <!--id="contacto"
          @submit="checkForm"
          action="url"
          method="post"-->

        <div>
          <p> Gracias por ponerte en contacto con nosotros.</p>
          <label for="name"></label>
          <input
              id="name"
              placeholder="Nombre"
              v-model="nombre"
              type="text"
          >
          <p class="p-error">{{ errors.nombre }}</p>
        </div>
        <div>
          <label for="email"></label>
          <input
              id="email"
              placeholder="email@email.com"
              v-model="email"
              type="text"
          >
          <p class="p-error">{{ errors.email }}</p>
        </div>
        <div>
          <label for="title"></label>
          <input
              id="title"
              placeholder="Titulo"
              v-model="titulo"
              type="text"
          >
          <p class="p-error">{{ errors.titulo }}</p>
        </div>
        <div>
          <label for="message"></label>
          <textarea
              id="message"
              placeholder="Escriba aqui su mensaje"
              v-model="mensaje"
              rows="6"
          ></textarea>
          <p class="p-error">{{ errors.message }}</p>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
h2{
  color: #4E3D90;
}
.p-validado{
  color: darkgreen;
}
.p-error{
  color: #C2431E;
}
.img-bakery{
  background: #747bff;
}
.form{
  justify-self: center;
  padding: 2rem 2rem;
  margin: 2rem 2rem;
}
form{
  text-align: left;
  /*TODO: voy por aqui ajustando el formulario*/
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
  height: 4rem;
}
button[type="submit"] {
  background-color: #C2431E;
  color: #fff;
  border-radius: 1rem;
  cursor: pointer;
  border: 0;
  padding: 0.625rem 0.9375rem;
  margin-top: 0.3125rem;
  margin-right: 4rem;
}
</style>