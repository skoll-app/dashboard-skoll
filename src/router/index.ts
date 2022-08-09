import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";

console.log(process.env.NODE_ENV);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/auth/AuthView.vue"),
    redirect: { name: "login" },
    children: [
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "sign-up",
        name: "sign-up",
        component: SignupView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
