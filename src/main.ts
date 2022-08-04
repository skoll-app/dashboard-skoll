import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "./assets/i18n";

import "primevue/resources/themes/saga-orange/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "./assets/styles/layout.scss";

// Primevue Components
import PrimeVue from "primevue/config";
import Button from "primevue/button";

const app = createApp(App);

app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.use(i18n);

// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component("Button", Button);

app.mount("#app");
