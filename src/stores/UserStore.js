 import { defineStore } from 'pinia';
 import axios from "axios";

export const useUserStore = defineStore( 'user',{
    state() {
        return {
            user:null
        }
    },
    actions: {
        login(userDetails) {
            axios.get('https://randomuser.me/api/',json)
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
        logout() {
            this.user = null
        }
    }
})
