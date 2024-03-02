import {defineStore} from 'pinia';
import axios from "axios";
import {useAlertStore} from "./AlertStore.js";
import {useUserStore} from "./UserStore.js";

export const useProjectStore = defineStore('project', {
    state: () => ({
        projectData: [],
    }),
    actions: {
        async getProjects() {
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${useUserStore().token}`}
            };
            await axios.get('/api/v1/projects', config)
                .then(data => {
                    if (data.statusText === "OK") {
                        this.projectData = data.data

                    }
                }).catch(error => {
                    console.error('Error en la solicitud:', error);
                    alertStore.error('Ha ocurrido un error en la solicitud.');
                });
            alertStore.clear();
        },
        deleteProjects(id) {
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${useUserStore().token}`}
            };
            axios.delete(`/api/v1/projects/${id}`, config)
                .then(async data => {
                    if (data.statusText === "OK") {
                        alertStore.success('Se ha borrado el proyecto correctamente.');
                        await this.getProjects()
                    }
                }).catch(error => {
                console.error('Error en la solicitud:', error);
                alertStore.error('Ha ocurrido un error en la solicitud.');
            });
            alertStore.clear();

        },
        addPaletteToProject(project_id, color_palette) {
            let json = {
                "name": "Mi Paleta",
                "project_id": project_id,
                "colors": color_palette
            };
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${useUserStore().token}`}
            };
            axios.post(`/api/v1/palettes/`, json, config)
                .then(async data => {
                    if (data.statusText === "Created") {
                        alertStore.success('Se ha editado el proyecto correctamente.');
                        await this.getProjects()
                    }
                }).catch(error => {
                console.error('Error en la solicitud:', error);
                alertStore.error('Ha ocurrido un error en la solicitud.');
            });
            alertStore.clear();
        },
        async createNewProject(name, description) {
            let json = {
                name: name,
                description: description
            };
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${useUserStore().token}`}
            };
            axios.post(`/api/v1/projects`, json, config)
                .then(async data => {
                    if (data.statusText === "Created") {
                        alertStore.success('Se ha creado el proyecto correctamente.');
                        await this.getProjects()
                    }
                }).catch(error => {
                console.error('Error en la solicitud:', error);
                alertStore.error('Ha ocurrido un error en la solicitud.');
            });
            alertStore.clear();
        },
        async editProject(project_id, name, description) {
            let json = {
                name: name,
                description: description
            };
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${useUserStore().token}`}
            };
            axios.put(`/api/v1/projects/${project_id}`, json, config)
                .then(async data => {
                    if (data.statusText === "OK") {
                        alertStore.success('Se ha editado el proyecto correctamente.');
                        await this.getProjects()
                    }
                }).catch(error => {
                console.error('Error en la solicitud:', error);
                alertStore.error('Ha ocurrido un error en la solicitud.');
            });
            alertStore.clear();
        },
        deletePalette(id) {
            const alertStore = useAlertStore();
            // llamada a la Api con autenticacion
            const config = {
                headers: {Authorization: `Bearer ${useUserStore().token}`}
            };
            axios.delete(`/api/v1/palettes/${id}`, config)
                .then(async data => {
                    if (data.statusText === "OK") {
                        alertStore.success('Se ha borrado la paleta correctamente.');
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