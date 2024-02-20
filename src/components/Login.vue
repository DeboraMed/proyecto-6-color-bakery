<script>
import axios from "axios";
import BorderFooter from "../shared/BorderFooter.vue";

export default {
  components: {BorderFooter},
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
        this.errors.password = 'Introduce un contraseña con al menos 3 caracteres.';
      }
      if (!this.email || !this.validateEmail(this.email)) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      }else {
        this.errors[field] = '';
      }
    },
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      return re.test(email);
    },
    submitForm() {
      this.validateForm('email');
      this.validateForm('password');

      if (!Object.values(this.errors).some(error => error !== '')) {
        console.log('Formulario enviado:', this.email, this.password);
      };
      let json = {
        'email': this.email,
        'password': this.password,
      };
      axios.post('http://localhost:8000/api/user/login',json)
          .then(data => {
            if(data.statusText === "OK"){
              console.log('Solicitud procesada correctamente',data);
              this.resetForm();
            }
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
    },
    resetForm() {
      this.email = '';
      this.password = '';
      this.errors = {
        email: '',
        password: ''
      };
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
    </section>
    <figure class="content__section">
      <img class="content__section__img" src="../assets/img/img-colores.png" alt="Ruedas de colores" title="Ruedas de colores">
    </figure>
  </main>
</template>

<style scoped>
.main__content{
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 6rem 0 6rem;
}
.content__section{
  margin: auto;
  width: 40%;
}
.content__section__img{
  width: 50%;
  margin: auto;
}
.content__article{
  margin: auto;
  width: 60%;
}
h2{
  color: #4E3D90;
}
input {
  width: 50%;
  border: 1px #797474;
  border-radius: 0.7rem;
  padding: 0.625rem;
  margin-top: 0.3125rem;
}
</style>