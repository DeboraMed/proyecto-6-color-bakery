import Home from "../components/Home.vue";

import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    { path: '/', component: Home },
    {
        path: '/imgcolor',
        component: () => import('../components/ResultadoImagen.vue')
    },
    {
        path: '/registro',
        component: () => import('../components/Registro.vue')
    },
    {
        path: '/perfil',
        component: () => import('../components/Perfil.vue')
    },
    {
        path: '/login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/proyectos',
        component: () => import('../components/Proyectos.vue')
    },
    {
        path: '/descubre',
        component: () => import('../components/Descubre.vue')
    },
    {
        path: '/contacto',
        component: () => import('../components/Contacto.vue')
    },
    {
        path: '/:pathMach(.*)*',
        component: () => import('../components/404.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router