import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from '@/views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        props: true
    },
    {
        path: "/Admin",
        name: "AdminView",
        component: () => import("../views/AdminView.vue"),
        props: true
    },
    {
        path: "/Productos",
        name: "UserView",
        component: () => import("../views/UserView.vue"),
        props: true
    },
    {
        path: "/SignUp",
        name: "SignUpView",
        component: () => import("../views/SignUpView.vue"),
        props: true
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;