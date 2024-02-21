import Home from "../pages/Home.vue";

import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {   /*rutas anidadas*/
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                component: () => import('../pages/HomeSection.vue') }
        ]},
    {   /*lazy loading*/
        path: '/registro',
        component: () => import('../pages/Registro.vue')
    },
    {
        path: '/perfil',
        component: () => import('../pages/Perfil.vue')
    },
    {
        path: '/login',
        component: () => import('../pages/Login.vue')
    },
    {
        path: '/proyectos',
        component: () => import('../pages/Proyectos.vue')
    },
    {
        path: '/descubre',
        component: () => import('../pages/Descubre.vue')
    },
    {
        path: '/contacto',
        component: () => import('../pages/Contacto.vue')
    },
    {
        path: '/:pathMach(.*)*',
        component: () => import('../pages/404.vue')
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router