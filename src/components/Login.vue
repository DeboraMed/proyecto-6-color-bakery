<script>
import {ref} from "vue";

const mensaje = ref('');
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
    submitForm() {
      this.errors = { email: '',  password: '' };
      let isValid = true;

      if (!this.password) {
        this.errors.nombre = 'Introduce un contraseña con al menos 3 caracteres.';
        isValid = false;
      }
      if (!this.email || !this.validateEmail(this.email)) {
        this.errors.email = 'Introduce un correo electrónico válido.';
        isValid = false;
      }
      if (isValid) {
        // datos del formulario validado
        console.log('Formulario enviado:'+this.email, this.password);
      }
    },
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      console.log(email)
      return re.test(email);
    },
  },
  watch: {
    /*v-bind en el input y que el resultado lo reciba el watch*/

  }
}
</script>

<template>
  <div class="main-content">
    <div class="form">
      <h2>Logueate_</h2>
      <form
          @submit.prevent="submitForm">
        <!--id="contacto"
            @submit="checkForm"
            action="url"
            method="post"-->
        <div>
          <p> Logueate en la web.</p>
        </div>
        <div>
          <label for="email"></label>
          <input
              id="email"
              placeholder="email@email.com"
              v-model="email"
              type="text"
          >
          <p class="p-error">{{ mensaje }}</p>
        </div>
        <div>
          <label for="title"></label>
          <input
              id="password"
              placeholder="Contraseña"
              v-model="password"
              type="password"
          >
          <p class="p-error">{{ mensaje }}</p>
        </div>
        <button type="submit">Acceder</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
h2{
  color: #4E3D90;
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