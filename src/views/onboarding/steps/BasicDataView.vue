<script setup lang="ts">
// Imports
// Vue
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
// Utils
import { useI18n } from "vue-i18n";
// Components
import SKInputText from "@/components/ux/SKInputText.vue";
import SKSelect from "@/components/ux/SKSelect.vue";
import SKInputMask from "@/components/ux/SKInputMask.vue";
import SKInputNumber from "@/components/ux/SKInputNumber.vue";
// Enums
import KindOfPerson from "@/enums/person";
// Interfaces
import type SelectOption from "@/interfaces/select-option";
import type HttpResponse from "@/interfaces/http-response";
import type { BusinessBasicData } from "@/interfaces/business";
// Enums
import Taxation from "@/enums/taxation";
// Utils
import { useForm } from "vee-validate";
import * as yup from "yup";
// Services
import getError from "@/utils/handle-errors";
import service from "@/http/services";
import { useToast } from "primevue/usetoast";
// Store
import { useBusinessStore } from "@/stores/business";
// End imports

const businessStore = useBusinessStore();
const { t } = useI18n();
const toast = useToast();
// Begin select fields
const businessTypes = ref<SelectOption[]>([]);
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
const documentType = ref<SelectOption[]>([]);
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
  legalRepresentative: yup.object({
    name: yup.string().required().onlyLetters(),
    lastname: yup.string().required().onlyLetters(),
    documentType: yup.string().required(),
    document: yup.string().required(),
  }),
  allowedReservations: yup.number().min(1).required(),
  minimumValue: yup.number().min(1000).required(),
});
const initialValues = reactive({
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
  businessCity: "",
  legalRepresentative: {
    name: "",
    lastname: "",
    document: "",
    documentType: "",
  },
  allowedReservations: 1,
  minimumValue: 1000,
});
const formRef = reactive(
  useForm({
    validationSchema,
    initialValues,
  })
);
const cities: SelectOption[] = reactive([]);
let businessData: Partial<BusinessBasicData> = reactive({});
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

const stepCompleted = computed(() => businessStore.basicStepCompleted);

// watch(
//   () => formRef.meta.valid,
//   (valid) => {
//     if (valid && businessStore.basicStepCompleted) {
//       emit("step-complete", {
//         step: 0,
//       });
//     }
//   }
// );

watch(
  () => businessStore,
  (business) => {
    formRef.setValues({
      businessName: business.name,
      businessType: business.category,
      email: business.email,
      phone: business.phone,
      businessCity: business.city,
      businessAddress: business.address,
      kindOfperson: business.kindOfperson,
      taxation: business.taxation,
      businessDocumentType: business.documentType,
      businessDocument: business.documentNumber,
      companyName: business.companyName,
      legalRepresentative: {
        name: business.legalRepresentative.firstName,
        lastname: business.legalRepresentative.lastName,
        document: business.legalRepresentative.documentNumber,
        documentType: business.legalRepresentative.documentType,
      },
      allowedReservations: business.allowedReservations,
      minimumValue: business.minimumValue,
    });
  },
  { deep: true }
);

onBeforeMount(() => {
  getDepartments();
  getParameters();
});

onMounted(() => {
  if (businessStore.basicStepCompleted) {
    const { ...business } = businessStore;
    formRef.setValues({
      businessName: business.name,
      businessType: business.category,
      email: business.email,
      phone: business.phone,
      businessCity: business.city,
      businessAddress: business.address,
      kindOfperson: business.kindOfperson,
      taxation: business.taxation,
      businessDocumentType: business.documentType,
      businessDocument: business.documentNumber,
      companyName: business.companyName,
      legalRepresentative: {
        name: business.legalRepresentative.firstName,
        lastname: business.legalRepresentative.lastName,
        document: business.legalRepresentative.documentNumber,
        documentType: business.legalRepresentative.documentType,
      },
      allowedReservations: business.allowedReservations,
      minimumValue: business.minimumValue,
    });
  }
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
const registerBusiness = formRef.handleSubmit(async (values) => {
  try {
    businessData = {
      name: values.businessName,
      category: values.businessType,
      address: values.businessAddress,
      prefixCellPhone: "+57",
      phone: values.phone,
      email: values.email,
      taxRegime: values.taxation,
      kindOfPerson: values.kindOfperson,
      documentNumber: values.businessDocument,
      documentType: values.businessDocumentType,
      companyName: values.companyName,
      city: values.businessCity,
      legalRepresentative: {
        documentNumber: values.legalRepresentative.document,
        documentType: values.legalRepresentative.documentType,
        firstName: values.legalRepresentative.name,
        lastName: values.legalRepresentative.lastname,
      },
      allowedReservations: values.allowedReservations,
      minimumValue: values.minimumValue,
    };
    if (businessStore.basicStepCompleted) {
      await service.business.update(businessData);
    } else {
      const response = await service.business.signUp(businessData);
      localStorage.setItem("token", response.data.data);
    }
    businessStore.setBasicData(businessData);
    nextPage();
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t(getError(error)),
      life: 3000,
    });
  }
});

const nextPage = () => {
  emit("next-page", {
    pageIndex: 0,
    step: 0,
  });
};

const getParameters = async () => {
  try {
    const response = await service.utils.parameters();
    const { merchantCategory, documentType } = response.data.data.params;
    setMerchantCategory(merchantCategory);
    setDocumentsType(documentType);
  } catch (error) {
    console.log(error);
  }
};
const setMerchantCategory = (
  categories: Array<{ id: string; name: string }>
) => {
  categories.map((cat: { id: string; name: string }) => {
    businessTypes.value.push({ code: cat.name, name: cat.name });
  });
};

const setDocumentsType = (documents: Array<{ id: string; name: string }>) => {
  documents.map((doc: { id: string; name: string }) => {
    if (doc.name !== "TI") {
      documentType.value.push({
        code: doc.name,
        name: t("form.documentTypeList." + doc.name),
      });
    }
  });
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
          <div class="col-12 md:col-3">
            <SKInputText
              name="email"
              :label="$t('form.email')"
              labelClasses="block mb-2"
              :placeholder="$t('form.email')"
              inputClasses="w-full"
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
            />
          </div>
          <div class="col-12 md:col-3">
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
              :options="documentType"
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
              name="legalRepresentative.name"
              :label="$t('form.name')"
              labelClasses="block mb-2"
              :placeholder="$t('form.name')"
              inputClasses="w-full"
              inputStyle="padding: 1rem"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="legalRepresentative.lastname"
              :label="$t('form.lastname')"
              labelClasses="block mb-2"
              :placeholder="$t('form.lastname')"
              inputClasses="w-full"
              inputStyle="padding: 1rem"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="legalRepresentative.documentType"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="documentType"
              :label="$t('form.documentType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="legalRepresentative.document"
              :label="$t('form.document')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
            />
          </div>
        </div>

        <h5 class="p-card-title">{{ t("onboarding.bookings") }}</h5>
        <div class="grid">
          <div class="col-12 md:col-6">
            <SKInputNumber
              labelClasses="block mb-2"
              :label="t('form.allowedReservations')"
              inputId="allowedReservations"
              name="allowedReservations"
              mode="decimal"
              showButtons
              :min="1"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputNumber
              labelClasses="block mb-2"
              :label="t('form.minimumBookingValue')"
              inputId="minimumBookingValue"
              mode="currency"
              currency="COP"
              name="minimumValue"
              inputClasses="w-full"
              showButtons
              :min="1000"
              :step="1000"
            />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-end">
          <Button
            type="submit"
            :label="
              stepCompleted
                ? t('form.buttons.edit')
                : t('form.buttons.createBusiness')
            "
            :disabled="!formRef.meta.valid"
          />
        </div>
      </template>
    </Card>
  </form>
</template>
<style scoped></style>
