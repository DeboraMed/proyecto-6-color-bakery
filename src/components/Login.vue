<script>
export default {
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
    validateForm(field) {
      if (!this.password || this.password.length < 3) {
        this.errors.nombre = 'Introduce un contraseña con al menos 3 caracteres.';
      }
      if (!this.email || !this.validateEmail(this.email)) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      }else {
        this.errors[field] = '';
      }
    },
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      console.log(email)
      return re.test(email);
    },
  },
  submitForm() {
    this.validateForm('email');
    this.validateForm('password');

    if (!Object.values(this.errors).some(error => error !== '')) {
      console.log('Formulario enviado:', this.email, this.password);
    }
  }
}
</script>

<template>
  <main class="main-content">

    <article class="content-article">
      <form class="form" @submit.prevent="submitForm">
        <h2>Logueate_</h2>
        <!--id="contacto"
            @submit="checkForm"
            action="url"
            method="post"-->
        <article>
          <p> Logueate en la web.</p>
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
        <button class="button" type="submit">Enviar</button>
      </form>
    </article>
    <section class="content-section"><img src="../assets/img/img-colores.png"></section>
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
  width: 50%;
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