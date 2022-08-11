import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import BasicData from "../views/onboarding/steps/BasicData.vue";
import CustomizationView from "../views/onboarding/steps/CustomizationView.vue";

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
  {
    path: "/onboarding",
    name: "onboarding",
    component: () => import("../views/onboarding/OnboardingView.vue"),
    redirect: { name: "basic-data" },
    children: [
      {
        path: "",
        name: "basic-data",
        component: BasicData,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
