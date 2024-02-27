import { defineStore } from 'pinia';
import axios from "axios";
import {useAlertStore} from "./AlertStore.js";

export const useFavoriteStore = defineStore( 'favorite',{
    state: () => ({
        token: localStorage.getItem('token'),
        favoriteData: []
    }),
    actions: {
        async getFavorites(){
            // console.log(this.token)
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            await axios.get('/api/v1/favorites',config)
                .then(data => {
                    if(data.statusText === "OK"){
                        console.log('Solicitud procesada correctamente',data);
                        this.favoriteData = data.data

                    }
                }).catch(error => {
                    console.error('Error en la solicitud:', error);
                    alertStore.error('Ha ocurrido un error en la solicitud.');
                });
            alertStore.clear();
        }
    }
})