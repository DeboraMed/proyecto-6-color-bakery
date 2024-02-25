import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router.js";
import {createPinia} from "pinia";
import axios from "axios";

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;
