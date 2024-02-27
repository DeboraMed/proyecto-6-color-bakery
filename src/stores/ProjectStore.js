import { defineStore } from 'pinia';
import axios from "axios";
import {useAlertStore} from "./AlertStore.js";

export const useProjectStore = defineStore( 'project',{
    state: () => ({
        token: localStorage.getItem('token'),
        projectData: [],
    }),
    actions: {
        async getProjects() {
            console.log(this.token)
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            await axios.get('/api/v1/projects', config)
                .then(data => {
                    if (data.statusText === "OK") {
                        console.log('Solicitud procesada correctamente', data);
                        this.projectData = data.data

                    }
                }).catch(error => {
                    console.error('Error en la solicitud:', error);
                    alertStore.error('Ha ocurrido un error en la solicitud.');
                });
            alertStore.clear();
        },
        deleteProjects(id) {
            // logica para borrar
            console.log(id)
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            axios.delete(`/api/v1/projects/${id}`, config)
                .then(async data => {
                    if (data.statusText === "OK") {
                        console.log('Solicitud procesada correctamente', data);
                        alertStore.success('Se ha borrado el proyecto correctamente.');
                        await this.getProjects()
                    }
                }).catch(error => {
                console.error('Error en la solicitud:', error);
                alertStore.error('Ha ocurrido un error en la solicitud.');
            });
            alertStore.clear();

        },
        editProjects(id,name,description) {
            let json =  {
                "name": name,
                "description": description
            };
            console.log(id)
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${this.token}`}
            };
            axios.put(`/api/v1/projects/${id}`,json,config)
                .then(async data => {
                    if (data.statusText === "OK") {
                        console.log('Solicitud procesada correctamente', data);
                        alertStore.success('Se ha editado el proyecto correctamente.');
                        await this.getProjects()
                    }
                }).catch(error => {
                console.error('Error en la solicitud:', error);
                alertStore.error('Ha ocurrido un error en la solicitud.');
            });
            alertStore.clear();

        },
    }
})