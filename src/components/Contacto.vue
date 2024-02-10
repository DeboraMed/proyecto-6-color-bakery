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
      this.validateForm('nombre');
      this.validateForm('email');
      this.validateForm('titulo');
      this.validateForm('mensaje');

      if (!Object.values(this.errors).some(error => error !== '')) {
        console.log('Formulario enviado:', this.nombre, this.email, this.titulo, this.mensaje);
      }
    },
  }
}
</script>

<template>
  <main class="main-content">
    <section class="content-section">
      <img src="../assets/img/img-horno.png" alt="Horno de colores" title="Horno de colores">
    </section>
    <article class="content-article">
      <form class="form" @submit.prevent="submitForm">
        <h2>Formulario de Contacto_</h2>
        <article>
          <p> Gracias por ponerte en contacto con nosotros.</p>
          <label for="name"></label>
          <input
              id="name"
              placeholder="Nombre"
              v-model="nombre"
              type="text"
              @change="validateForm('nombre')">
          <p class="p-error">{{ errors.nombre }}</p>
        </article>
        <article>
          <label for="email"></label>
          <input
              id="email"
              placeholder="email@email.com"
              v-model="email"
              type="text"
              @change="validateForm('email')">
          <p class="p-error">{{ errors.email }}</p>
        </article>
        <article>
          <label for="title"></label>
          <input
              id="title"
              placeholder="Titulo"
              v-model="titulo"
              type="text"
              @change="validateForm('titulo')">
          <p class="p-error">{{ errors.titulo }}</p>
        </article>
        <article>
          <label for="message"></label>
          <textarea
              id="message"
              placeholder="Escriba aqui su mensaje"
              v-model="mensaje"
              rows="6"
              @change="validateForm('mensaje')"></textarea>
          <p class="p-error">{{ errors.mensaje }}</p>
        </article>
        <button class="button" type="submit">Enviar</button>
      </form>
    </article>
  </main>
</template>

<style scoped>
.main-content{
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 6rem 0 6rem;
}
.content-section{
  margin: auto;
  width: 40%;
}
.content-section img{
  width: 60%;
  margin: auto;
}
.content-article{
  margin: auto;
  width: 60%;
}
h2{
  color: #4E3D90;
}
.p-validado{
  color: darkgreen;
}
.p-error{
  color: #C2431E;
}

.form{
  justify-self: center;
  padding: 2rem 2rem;
  margin: 2rem 2rem;
}
form{
  text-align: left;
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
button[type="submit"] {
  background-color: #c2431e;
  color: #fff;
  cursor: pointer;
  border: 0;
  padding: 0.625rem 0.9375rem;
  margin-top: 0.3125rem;
  margin-right: 4rem;
}
</style>