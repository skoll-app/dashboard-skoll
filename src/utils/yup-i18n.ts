import { setLocale } from "yup";
import { useI18n } from "vue-i18n";

export default function setGlobalLocale() {
  const { t } = useI18n();
  setLocale({
    mixed: {
      required: t("form.validations.required"),
    },
    string: {
      email: t("form.validations.email"),
    },
  });
}
