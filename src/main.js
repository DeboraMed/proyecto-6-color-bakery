import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router.js";
import {createPinia} from "pinia";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faHeart,faXmark} from '@fortawesome/free-solid-svg-icons';

library.add(faHeart,faXmark);

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;
