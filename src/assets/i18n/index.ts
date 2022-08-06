import { createI18n } from "vue-i18n";

import es from "./locales/es.json";

type MessageSchema = typeof es;

const i18n = createI18n<[MessageSchema], "es">({
  locale: "es",
  fallbackLocale: "es",
  messages: { es },
});
export default i18n;
