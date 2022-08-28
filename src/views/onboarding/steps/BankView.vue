<script setup lang="ts">
// Vue
import { reactive, ref } from "vue";
// Utils
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { useForm } from "vee-validate";
// Components
import SKInputText from "@/components/ux/SKInputText.vue";
import SKSelect from "@/components/ux/SKSelect.vue";
import SKInputMask from "@/components/ux/SKInputMask.vue";
// Interfaces
import type SelectOption from "@/interfaces/select-option";

// Data
const { t } = useI18n();
const bankList = ref<SelectOption[]>([
  {
    code: "00001",
    name: "Bancolombia",
  },
]);

const documentTypeList = ref<SelectOption[]>([
  {
    name: t("form.documentTypeList.CC"),
    code: "CC",
  },
  {
    name: t("form.documentTypeList.NIT"),
    code: "NIT",
  },
  {
    name: t("form.documentTypeList.CE"),
    code: "CE",
  },
]);
const accountTypeList = ref<SelectOption[]>([
  {
    name: t("form.accountTypeList.savingAccount"),
    code: "SA",
  },
  {
    name: t("form.accountTypeList.currentAccount"),
    code: "CA",
  },
  {
    name: t("form.accountTypeList.virtualAccount"),
    code: "VA",
  },
]);
const initialValues = {
  fullname: "",
  bank: "",
  documentType: "",
  document: "",
  type: "",
  account: "",
  email: "",
  phone: "",
};

// Emit
const emit = defineEmits(["next-page", "prev-page"]);

// Form
const validationSchema = yup.object({
  fullname: yup.string().required().onlyLetters(),
  bank: yup.string().required(),
  documentType: yup.string().required(),
  document: yup.string().required(),
  type: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required().min(10),
  account: yup.string().required(),
});
const formRef = reactive(
  useForm({
    validationSchema,
    initialValues,
  })
);

// Methods
const nextPage = (values: any) => {
  emit("next-page", {
    formData: values,
    pageIndex: 2,
  });
};

const prevPage = () => {
  emit("prev-page", {
    pageIndex: 2,
  });
};

const saveAccount = formRef.handleSubmit(async (values) => {
  console.log(values);
});
</script>
<template>
  <form @submit="nextPage">
    <Card>
      <template v-slot:title>
        {{ t("onboarding.steps.bankAccount") }}
      </template>
      <template v-slot:content>
        <div class="grid">
          <div class="col-12 md:col-6">
            <SKInputText
              name="fullname"
              :label="$t('form.accountHolderFullname')"
              labelClasses="block mb-2"
              :placeholder="$t('form.fullname')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="bank"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="bankList"
              :label="$t('form.accountBank')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="documentType"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="documentTypeList"
              :label="$t('form.documentType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="document"
              :label="$t('form.accountHolderDocument')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="type"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="accountTypeList"
              :label="$t('form.accountType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="account"
              :label="$t('form.accountNumber')"
              labelClasses="block mb-2"
              :placeholder="$t('form.accountNumber')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="email"
              :label="$t('form.email')"
              labelClasses="block mb-2"
              :placeholder="$t('form.email')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputMask
              name="phone"
              :label="$t('form.phone')"
              labelClasses="block mb-2"
              inputClasses="w-full"
              mask="(999) 999 9999"
              placeholder="(999) 999 9999"
            />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between">
          <Button
            :label="$t('form.buttons.back')"
            @click="prevPage()"
            icon="pi pi-angle-left"
            iconPos="left"
            class="p-button-secondary"
          />
          <Button
            type="submit"
            :label="$t('form.buttons.next')"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
      </template>
    </Card>
  </form>
</template>
<style scoped></style>
