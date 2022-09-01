/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "./assets/i18n";

// Yup
import "./utils/yup-custom-validations";

// Axios
import VueAxios from "vue-axios";
import { api, apiAuth } from "./http/axios";

import "primevue/resources/themes/saga-orange/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./assets/styles/layout.scss";

// Primevue Components
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import InputMask from "primevue/inputmask";
import Dropdown from "primevue/dropdown";
import Divider from "primevue/divider";
import Steps from "primevue/steps";
import Card from "primevue/card";
import InputNumber from "primevue/inputnumber";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";
import SplitButton from "primevue/splitbutton";
import FileUpload from "primevue/fileupload";
import Sidebar from "primevue/sidebar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// Vee validate components
import { Form } from "vee-validate";

const app = createApp(App);

app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.use(VueAxios, { $api: api, $apiAuth: apiAuth });
app.use(i18n);
app.use(ToastService);

// eslint-disable-next-line vue/no-reserved-component-names
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Password", Password);
app.component("VeeForm", Form);
app.component("Checkbox", Checkbox);
app.component("InputMask", InputMask);
app.component("Dropdown", Dropdown);
app.component("Divider", Divider);
app.component("Steps", Steps);
app.component("Card", Card);
app.component("InputNumber", InputNumber);
app.component("Loading", Loading);
app.component("Toast", Toast);
app.component("Toolbar", Toolbar);
app.component("SplitButton", SplitButton);
app.component("FileUpload", FileUpload);
app.component("Sidebar", Sidebar);
app.component("DataTable", DataTable);
app.component("Column", Column);

app.mount("#app");
