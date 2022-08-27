<script setup lang="ts">
// Imports
// Vue
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
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
import type HttpResponse from "@/interfaces/http-response";
import type { Business, BusinessBasicData } from "@/interfaces/business";
// Enums
import Taxation from "@/enums/taxation";
// Utils
import { useForm } from "vee-validate";
import * as yup from "yup";
// Services
import getError from "@/utils/handle-errors";
import service from "@/http/services";
import { useToast } from "primevue/usetoast";
// End imports

const router = useRouter();
const { t } = useI18n();
const toast = useToast();
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
  businessCity: yup.string().required(),
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
const initialValues = {
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
  businessCity: 0,
  manager: {
    name: "",
    lastname: "",
    document: "",
    documentType: "",
  },
};
const formRef = reactive(
  useForm({
    validationSchema,
    initialValues,
  })
);
const cities: SelectOption[] = reactive([]);
const businessExists = ref(false);
let businessData: BusinessBasicData = reactive({});

// Computed
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

onBeforeMount(() => {
  getAssociatedBusiness();
  getDepartments();
});

// Emit
const emit = defineEmits(["next-page"]);

// Functions
const getDepartments = async () => {
  try {
    const res: HttpResponse = await service.utils.getDepartments();
    const response = res.data.data.colombia.departments;
    response.map(
      (department: { name: string; id: string; cities: Array<any> }) => {
        department.cities.map((city) => {
          cities.push({ code: city.id, name: city.name });
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getAssociatedBusiness = async () => {
  try {
    const res = await service.seller.associatedBusinesses();
    if (res.data.data.merchantAssociated.length > 0) {
      businessExists.value = true;
      const merchantAssociated: Business = res.data.data.merchantAssociated[0];
      businessLogin(merchantAssociated.apiKey, merchantAssociated.apiLogin);
    }
  } catch (error) {
    console.error(error);
  }
};

const businessLogin = async (apiKey: string, apiLogin: string) => {
  try {
    const res = await service.business.login(apiKey, apiLogin);
    localStorage.setItem("token", res.data.data);
    businessDetail();
  } catch (error) {
    console.error(error);
  }
};

const businessDetail = async () => {
  try {
    const res = await service.business.detail();
    const business = res.data.data;
    formRef.setValues({
      businessName: business.name,
      businessType: business.merchantCategory,
      email: business.email,
      phone: business.cellPhone,
      businessCity: 20001, // cambiar
      businessAddress: business.adress,
      kindOfperson: "NATURAL", // cambiar
      businessDocumentType: business.documentType,
      businessDocument: "123456789", // cambiar
      companyName: "Capachos SAS", // cambiar
      taxation: "NO_IVA", // cambiar
      manager: {
        name: business.legalRepresentative.firstName,
        lastname: business.legalRepresentative.lastName,
        document: business.legalRepresentative.documentNumber,
        documentType: business.legalRepresentative.documentType,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const registerBusiness = formRef.handleSubmit(async (values) => {
  try {
    businessData = {
      name: values.businessName,
      category: values.businessType,
      address: values.businessAddress,
      prefixCellPhone: "+57",
      cellPhone: values.phone,
      email: values.email,
      taxRegime: values.taxation,
      kindOfPerson: values.kindOfperson,
      documentNumber: values.businessDocument,
      documentType: values.businessDocumentType,
      bussinesName: values.companyName,
      cityId: values.businessCity,
      legalRepresentative: {
        documentNumber: values.manager.document,
        documentType: values.manager.documentType,
        firstName: values.manager.name,
        lastName: values.manager.lastname,
      },
    };
    if (!businessExists.value) {
      const response = await service.business.signUp(businessData);
      localStorage.setItem("token", response.data.data);
    }
    nextPage(businessData);
  } catch (error) {
    console.error(error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t(getError(error)),
      life: 3000,
    });
  }
});

const nextPage = (values: BusinessBasicData) => {
  emit("next-page", {
    formData: values,
    pageIndex: 0,
  });
};

const prevPage = () => {
  router.push("/");
};
</script>
<template>
  <form @submit="registerBusiness">
    <Card>
      <template v-slot:title>
        {{ t("onboarding.steps.basicData") }}
      </template>
      <template v-slot:content>
        <div class="grid">
          <div class="col-12 md:col-8">
            <SKInputText
              name="businessName"
              :label="$t('form.businessName')"
              labelClasses="block mb-2"
              :placeholder="$t('form.businessName')"
              inputClasses="w-full"
              :disabled="businessExists"
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
              :disabled="businessExists"
            />
          </div>
          <div class="col-12 md:col-3">
            <SKInputText
              name="email"
              :label="$t('form.email')"
              labelClasses="block mb-2"
              :placeholder="$t('form.email')"
              inputClasses="w-full"
              :disabled="businessExists"
            />
          </div>
          <div class="col-12 md:col-3">
            <SKInputMask
              name="phone"
              :label="$t('form.phone')"
              labelClasses="block mb-2"
              inputClasses="w-full"
              mask="(999) 999 9999"
              placeholder="(999) 999 9999"
              :disabled="businessExists"
            />
          </div>
          <div class="col-12 md:col-3">
            <SKSelect
              name="businessCity"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="cities"
              :label="$t('form.city')"
              labelClasses="block mb-2"
              filter
              :disabled="businessExists"
            />
          </div>
          <div class="col-12 md:col-3">
            <SKInputText
              name="businessAddress"
              :label="$t('form.businessAddress')"
              labelClasses="block mb-2"
              :placeholder="$t('form.businessAddress')"
              inputClasses="w-full"
              :disabled="businessExists"
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
              :disabled="businessExists"
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
              :disabled="businessExists"
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
              :disabled="businessExists"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="businessDocument"
              :label="$t('form.document')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
              :disabled="businessExists"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="companyName"
              :label="$t('form.companyName')"
              labelClasses="block mb-2"
              :placeholder="$t('form.companyName')"
              inputClasses="w-full"
              :disabled="businessExists"
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
              :disabled="businessExists"
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
              :disabled="businessExists"
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
              :disabled="businessExists"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="manager.document"
              :label="$t('form.document')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
              :disabled="businessExists"
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
