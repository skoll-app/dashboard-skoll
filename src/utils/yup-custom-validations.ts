import { useI18n } from "vue-i18n";
import * as yup from "yup";

function onlyLetters(msg?: string) {
  const { t } = useI18n();
  return yup.string().matches(/^[a-zA-ZÀ-ÿ]+( [a-zA-ZÀ-ÿ]+)*$/, {
    message: msg || t("form.validations.onlyLetters"),
    excludeEmptyStrings: true,
  });
}

yup.addMethod<yup.StringSchema>(yup.string, "onlyLetters", onlyLetters);
