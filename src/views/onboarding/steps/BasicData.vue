<script setup lang="ts">
// Imports
// Vue
import { computed, reactive, ref } from "vue";
// Utils
import { useI18n } from "vue-i18n";
// Components
import SKInputText from "@/components/ux/SKInputText.vue";
import SKSelect from "@/components/ux/SKSelect.vue";
import SKInputMask from "@/components/ux/SKInputMask.vue";
// Enums
import KindOfPerson from "@/enums/person";
// Interfaces
import type SelectOption from "@/interfaces/select-option";
import { useForm } from "vee-validate";
import * as yup from "yup";
import Taxation from "@/enums/taxation";
// End imports

const { t } = useI18n();

// Begin select fields
const businessTypes = ref<SelectOption[]>([
  { name: "Bar", code: "Bar" },
  { name: "Discoteca", code: "Discoteca" },
  { name: "Restaurante", code: "Restaurante" },
]);

const kindOfperson = ref<SelectOption[]>([
  {
    name: KindOfPerson.NATURAL.toLowerCase(),
    code: KindOfPerson.NATURAL,
  },
  {
    name: KindOfPerson.JURIDICAL.toLowerCase(),
    code: KindOfPerson.JURIDICAL,
  },
]);

const businessDocumentType = ref<SelectOption[]>([
  {
    name: t("form.documentTypeList.CC"),
    code: "CC",
  },
  {
    name: t("form.documentTypeList.NIT"),
    code: "NIT",
  },
]);

const managerDocumentType = ref<SelectOption[]>([
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
// End select fields

// Form
const validationSchema = yup.object({
  businessName: yup.string().required(),
  businessType: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required().min(10),
  businessAddress: yup.string().required(),
  kindOfperson: yup.string().required(),
  taxation: yup.string().required(),
  businessDocumentType: yup.string().required(),
  businessDocument: yup.string().required(),
  companyName: yup.string().required(),
  manager: yup.object({
    name: yup.string().required().onlyLetters(),
    lastname: yup.string().required().onlyLetters(),
    documentType: yup.string().required(),
    document: yup.string().required(),
  }),
});

const formRef = reactive(
  useForm({
    validationSchema,
    initialValues: {
      businessName: "",
      email: "",
      phone: "",
      businessType: "",
      businessAddress: "",
      kindOfperson: "",
      taxation: "",
      businessDocumentType: "",
      businessDocument: "",
      companyName: "",
      manager: {
        name: "",
      },
    },
  })
);

// Emit
const emit = defineEmits(["next-page"]);

// Functions
function nextPage() {
  emit("next-page", {
    formData: {},
    pageIndex: 0,
  });
}

const taxation = computed(() => {
  const naturalPerson = [0, 1, 2];
  const juridicalPerson = [1, 2, 3, 4, 5, 6, 7];
  const options: SelectOption[] = [];

  const taxation = Object.keys(Taxation);
  taxation.forEach((key, index) => {
    if (
      formRef.values.kindOfperson === KindOfPerson.NATURAL &&
      naturalPerson.includes(index)
    ) {
      options.push({
        name: Taxation[key as keyof typeof Taxation],
        code: key,
      });
    } else if (
      formRef.values.kindOfperson === KindOfPerson.JURIDICAL &&
      juridicalPerson.includes(index)
    ) {
      options.push({
        name: Taxation[key as keyof typeof Taxation],
        code: key,
      });
    }
  });

  return options;
});

// watch(
//   () => formRef.values.kindOfperson,
//   (newValue, oldValue) => {
//     if (newValue !== oldValue) {
//       console.log("por aca");
//     }
//   },
//   { deep: true }
// );
</script>
<template>
  <Card>
    <template v-slot:title> {{ t("onboarding.steps.basicData") }} </template>
    <template v-slot:content>
      <form>
        <div class="grid">
          <div class="col-12 md:col-8">
            <SKInputText
              name="businessName"
              :label="$t('form.businessName')"
              labelClasses="block mb-2"
              :placeholder="$t('form.businessName')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-4">
            <SKSelect
              name="businessType"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="businessTypes"
              :label="$t('form.businessType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-4">
            <SKInputText
              name="email"
              :label="$t('form.email')"
              labelClasses="block mb-2"
              :placeholder="$t('form.email')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-4">
            <SKInputMask
              name="phone"
              :label="$t('form.phone')"
              labelClasses="block mb-2"
              inputClasses="w-full"
              mask="(999) 999 9999"
              placeholder="(999) 999 9999"
            />
          </div>
          <div class="col-12 md:col-4">
            <SKInputText
              name="businessAddress"
              :label="$t('form.businessAddress')"
              labelClasses="block mb-2"
              :placeholder="$t('form.businessAddress')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="kindOfperson"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="kindOfperson"
              :label="$t('form.kindOfperson')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="taxation"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="taxation"
              :label="$t('form.taxation')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="businessDocumentType"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="businessDocumentType"
              :label="$t('form.documentType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="businessDocument"
              :label="$t('form.document')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="companyName"
              :label="$t('form.companyName')"
              labelClasses="block mb-2"
              :placeholder="$t('form.companyName')"
              inputClasses="w-full"
            />
          </div>
        </div>

        <h5 class="p-card-title">{{ t("onboarding.managerLegalInfo") }}</h5>
        <div class="grid">
          <div class="col-12 md:col-6">
            <SKInputText
              name="manager.name"
              :label="$t('form.name')"
              labelClasses="block mb-2"
              :placeholder="$t('form.name')"
              inputClasses="w-full"
              inputStyle="padding: 1rem"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="manager.lastname"
              :label="$t('form.lastname')"
              labelClasses="block mb-2"
              :placeholder="$t('form.lastname')"
              inputClasses="w-full"
              inputStyle="padding: 1rem"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="manager.documentType"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="managerDocumentType"
              :label="$t('form.documentType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="manager.document"
              :label="$t('form.document')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
            />
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <div class="grid grid-nogutter justify-content-between">
        <i></i>
        <Button
          :disabled="!formRef.meta.valid"
          :label="$t('form.buttons.next')"
          @click="nextPage()"
          icon="pi pi-angle-right"
          iconPos="right"
        />
      </div>
    </template>
  </Card>
</template>
<style scoped></style>
