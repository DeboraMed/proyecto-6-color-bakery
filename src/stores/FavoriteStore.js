import {defineStore} from 'pinia';
import axios from "axios";
import {useAlertStore} from "./AlertStore.js";

export const useFavoriteStore = defineStore('favorite', {
    state: () => ({
        token: localStorage.getItem('token'),
        favoriteData: []
    }),
    actions: {
        async getFavorites() {
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            await axios.get('/api/v1/favorites', config)
                .then(data => {
                    if (data.statusText === "OK") {
                        this.favoriteData = data.data

                    }
                }).catch(error => {
                    console.error('Error en la solicitud:', error);
                    alertStore.error('Ha ocurrido un error en la solicitud.');
                });
            alertStore.clear();
        },
        addFavorites(color) {
            const alertStore = useAlertStore();
            let json = {
                "name": "Mi nuevo Color Favorito",
                "color_hex": color,
            };
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            axios.post('/api/v1/favorites', json, config)
                .then(data => {
                    if (data.statusText === "Created") {
                        alertStore.success('Se ha añadido a favoritos correctamente.');
                        this.favoriteData = data.data
                    }
                }).catch(error => {
                console.error('Error en la solicitud:', error);
                alertStore.error('Ha ocurrido un error en la solicitud.');
            });
            alertStore.clear();
        },
        deleteFavorites(id) {
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            axios.delete(`/api/v1/favorites/${id}`, config)
                .then(async data => {
                    if (data.statusText === "OK") {
                        alertStore.success('Se ha borrado de favoritos correctamente.');
                        await this.getFavorites()
                    }
                }).catch(error => {
                console.error('Error en la solicitud:', error);
                alertStore.error('Ha ocurrido un error en la solicitud.');
            });
            alertStore.clear();
        }
    }
})