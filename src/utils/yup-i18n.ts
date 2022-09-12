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
      min: ({ min }) => t("form.validations.string.min", { min: min }),
    },
    number: {
      min: ({ min }) => t("form.validations.number.min", { min: min }),
    },
  });
}
