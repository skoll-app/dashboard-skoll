import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import BasicData from "../views/onboarding/steps/BasicDataView.vue";
import CustomizationView from "../views/onboarding/steps/CustomizationView.vue";
import BankView from "@/views/onboarding/steps/BankView.vue";
import DocumentsView from "@/views/onboarding/steps/DocumentsView.vue";

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
        path: "basic-data",
        name: "basic-data",
        component: BasicData,
      },
      {
        path: "customization",
        name: "customization",
        component: CustomizationView,
      },
      {
        path: "bank",
        name: "bank",
        component: BankView,
      },
      {
        path: "documents",
        name: "documents",
        component: DocumentsView,
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/DashboardView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
