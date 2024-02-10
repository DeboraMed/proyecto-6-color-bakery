<script>
export default {
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
    validateForm(field) {
      if (field === 'nombre' && (!this.nombre || typeof this.nombre !== 'string' || this.nombre.length < 3)) {
        this.errors.nombre = 'Introduce un nombre con al menos 3 caracteres.';
      } else if (field === 'email' && (!this.email || !this.validateEmail(this.email))) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      } else if (!this.password || this.password.length < 3) {
        this.errors.password = 'Introduce un contraseña con al menos 3 caracteres.';
      } else if (!this.re_password || this.re_password!== this.password) {
        this.errors.re_password = 'Introduce la misma contraseña.';
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
      this.validateForm('password');

      if (!Object.values(this.errors).some(error => error !== '')) {
        console.log('Formulario enviado:', this.nombre, this.email, this.password, this.re_password);
      }
    },
  }
}
</script>

<template>
  <main class="main-content">
    <section class="content-section"><img src="../assets/img/img-bolleria.png" alt="Bollitos de colores" title="Bollitos de colores"></section>
    <article class="content-article">
      <form class="form" @submit.prevent="submitForm">
        <h2>Formulario de Registro_</h2>
        <article>
          <p> Regístrate en nuestra web.</p>
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
          <label for="contraseña"></label>
          <input
              id="password"
              placeholder="Contraseña"
              v-model="password"
              type="password"
              @change="validateForm('password')">
          <p class="p-error">{{ errors.password }}</p>
        </article>
        <article>
          <label for="contraseña"></label>
          <input
              id="re_password"
              placeholder="Repite la contraseña"
              v-model="re_password"
              type="password"
              @change="validateForm('re_password')">
          <p class="p-error">{{ errors.re_password }}</p>
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
  width: 70%;
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
  padding: 0rem 2rem;
  margin: 0rem 2rem;
}
form{
  text-align: left;
}
input {
  width: 50%;
  border: 1px #797474;
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