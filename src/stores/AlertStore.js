import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    // para pasarle el mensaje:
    // const alertStore = useAlertStore();
    //       alertStore.error(error);

    // para borrar las alertas
    // const alertStore = useAlertStore();
    // alertStore.clear();
    actions: {
        success(message) {
            this.alert = { message, type: 'alert__success' };
        },
        error(message) {
            this.alert = { message, type: 'alert__danger' };
        },
        clear() {
            this.alert = null;
        }
    }
});