<script>
import axios from "axios";
import BorderFooter from "../shared/BorderFooter.vue";
/**
 * Este componente es el encargado de mostrar el formulario de registro de la aplicación,
 * que permite al usuario introducir su nombre, correo electrónico y contraseña para
 * crear una cuenta.
 */
export default {
  components: {BorderFooter},
  data() {
    return {
      /**
       * nombre: una cadena que almacena el nombre introducido por el usuario
       */
      nombre: '',
      /**
       * email: cadena que almacena el correo electrónico introducido por el usuario.
       */
      email: '',
      /**
       * password: una cadena que almacena la contraseña introducida por el usuario.
       */
      password: '',
      /**
       * re_password: cadena que almacena la confirmación de la contraseña introducida por el usuario.
       */
      re_password: '',
      /**
       * errors: Un objeto que almacena los mensajes de error de las validaciones de los campos del formulario, que son:
       */
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
     * validateForm(field): método que recibe el nombre de un campo del formulario como parámetro
     * y valida su valor según las reglas establecidas.
     * Si el valor es inválido, muestra el mensaje de error correspondiente en la propiedad errors.
     * @param field
     */
    validateForm(field) {
      if (field === 'nombre' && (!this.nombre || typeof this.nombre !== 'string' || this.nombre.length < 3)) {
        this.errors.nombre = 'Introduce un nombre con al menos 3 caracteres.';
      } else if (field === 'email' && (!this.email || !this.validateEmail(this.email))) {
        this.errors.email = 'Introduce un correo electrónico válido.';
      } else if (field === 'password' && (!this.password || this.password.length < 3)) {
        this.errors.password = 'Introduce un contraseña con al menos 3 caracteres.';
      } else if (!this.re_password || this.re_password!== this.password) {
        this.errors.re_password = 'Introduce la misma contraseña.';
      } else {
        this.errors[field] = '';
      }
    },
    /**
     * validateEmail(email): método que recibe un correo electrónico como parámetro y
     * devuelve un booleano que indica si tiene un formato válido o no. Utiliza una
     * expresión regular para comprobar el formato.
     * @param email
     * @returns {boolean}
     */
    validateEmail(email) {
      let re = /\w+@\w+\.+[a-z]/;
      return re.test(email);
    },
    /**
     * submitForm(): método que se ejecuta al enviar el formulario de registro.
     * Llama a validateForm() para cada campo del formulario y si no hay errores,
     * envía los datos al servidor. También muestra un mensaje en la consola con los datos enviados.
     */
    submitForm() {
      this.validateForm('nombre','email','password','re_password');

      if (!Object.values(this.errors).some(error => error !== '')) {
        console.log('Formulario enviado:', this.nombre, this.email, this.password, this.re_password);
        let json = {
          'name': this.nombre,
          'email': this.email,
          'password' : this.password,
        };
        axios.post('http://localhost:8000/api/user/registry',json)
            .then(data => {
              if(data.statusText === "OK"){
                console.log('Solicitud procesada correctamente',data);
                this.resetForm();
              }
            })
            .catch(error => {
              console.error('Error en la solicitud:', error);
            });
      }
    },
    resetForm() {
      this.nombre = '';
      this.email = '';
      this.password = '';
      this.re_password = '';
      this.errors = {
        nombre:'',
        email: '',
        password: '',
        re_password: ''
      };
    },
  }
}
</script>

<template>
  <main class="main__content">
    <figure class="content__section">
      <img class="content__section__img" src="../assets/img/img-bolleria.png" alt="Bollitos de colores" title="Bollitos de colores">
    </figure>
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
      </form>
    </section>
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
  width: 70%;
  margin: auto;
}
.content__article{
  margin: auto;
  width: 60%;
}
h2{
  color: #4E3D90;
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
</style>