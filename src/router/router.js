import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/Admin",
        name: "AdminView",
        component: () => import("../views/AdminView.vue"),
    },
    {
        path: "/Productos",
        name: "UserView",
        component: () => import("../views/UserView.vue"),
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;