import { defineStore } from 'pinia';
import axios from "axios";
import {useAlertStore} from "./AlertStore.js";

export const useFavoriteStore = defineStore( 'favorite',{
    state: () => ({
        // TODO coger token del userStore
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
        },
        addFavorites(color){
            // console.log(this.token)
            const alertStore = useAlertStore();
            let json =   {
                "name": "Mi nuevo Color Favorito",
                "color_hex": color,
                };
            // llamada a la Api con autenticacion
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            axios.post('/api/v1/favorites',json,config)
                .then(data => {
                    if(data.statusText === "Created"){
                        console.log('Solicitud procesada correctamente',data);
                        alertStore.success('Se ha añadido a favoritos correctamente.');
                        this.favoriteData = data.data
                    }
                }).catch(error => {
                    console.error('Error en la solicitud:', error);
                    alertStore.error('Ha ocurrido un error en la solicitud.');
                });
            alertStore.clear();
        },
        deleteFavorites(id){
            // logica para borrar
            console.log(id)
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            axios.delete('/api/v1/favorites/',json,config)
                .then(data => {
                    if(data.statusText === "OK"){
                        console.log('Solicitud procesada correctamente',data);
                        alertStore.success('Se ha borrado de favoritos correctamente.');
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