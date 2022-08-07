import { useI18n } from "vue-i18n";
import * as yup from "yup";

yup.addMethod<yup.StringSchema>(
  yup.string,
  "onlyLetters",
  function onlyLetters(msg: string) {
    const { t } = useI18n();

    return this.test({
      name: "onlyLetters",
      message: msg || t("form.validations.onlyLetters"),
      test: (value) => {
        if (value === "") {
          return true;
        }
        if (!/^[a-zA-ZÀ-ÿ]+( [a-zA-ZÀ-ÿ]+)*$/.test(value as string)) {
          return false;
        }
        return !!value;
      },
    });
  }
);
