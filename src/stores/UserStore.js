 import { defineStore } from 'pinia';
 import axios from "axios";
 import router from "../router/router.js";

export const useUserStore = defineStore( 'user',{
    state: () => ({
        token: localStorage.getItem('token'),
        userData: []
    }),

    actions: {

        isLogged() {
            return this.token !== null
        },
        register(name,email,password){
            let json = {
                'name': name,
                'email': email,
                'password': password,
            };
            axios.post('/api/v1/register',json)
                .then(data => {
                    if(data.statusText === "OK"){
                        console.log('Solicitud procesada correctamente',data);

                        // redirigir al login
                        router.push({ path: '/login'})
                    }
                })
        },
        login(email,password) {
            let json = {
                'email': email,
                'password': password,
            };
            axios.post('/api/v1/login',json)
                .then(data => {
                    if(data.statusText === "OK"){
                        console.log('Solicitud procesada correctamente',data);
                        this.token = data.data.token;
                        // guarda el token en el localstorage
                        localStorage.setItem('token', this.token);
                        console.log(this.token)
                        // redirigir al perfil
                        router.push({ path: '/perfil'})
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });

        },
        async fetchUser() {
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            await axios.get('/api/v1/user',config)
                .then(data => {
                    if(data.statusText === "OK"){
                        console.log('Solicitud procesada correctamente',data);
                        this.userData = data.data
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },
        getProjects(){
            // llamada a la Api con autenticacion
            /*const config = {
              headers: { Authorization: `Bearer ${token}` }
            };

            const bodyParameters = {
              key: "value"
            };

            axios.post(
                'http://localhost:8000/api/v1/get_token_payloads',
                bodyParameters,
                config
            ).then(data => {
              if(data.statusText === "OK"){
                console.log('Solicitud procesada correctamente',data);
                this.resetForm();
              }
            }).catch(error => {
              console.error('Error en la solicitud:', error);
            });*/
        },
        logout() {
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            axios.get('/api/v1/logout',config)
                .then(data => {
                    if(data.statusText === "OK"){
                        console.log('Solicitud procesada correctamente',data);
                        this.token = null;
                        // borra el token del localstorage
                        localStorage.removeItem('token');

                        // redirige al inicio
                        router.push({ path: '/'})
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        },
    }
})
