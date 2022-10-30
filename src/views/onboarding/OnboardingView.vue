<template>
  <div class="w-full">
    <Toolbar class="sticky top-0 bg-white z-5">
      <template #start>
        <img class="mr-2" height="30" src="@/assets/img/logo.png" alt="logo" />
        SKOLL
      </template>

      <template #end>
        <SplitButton
          icon="pi pi-user"
          class="p-button-secondary"
          :model="userOptionsItems"
        ></SplitButton>
      </template>
    </Toolbar>
    <div class="flex">
      <OnboardingSidebar />
      <div class="p-4 w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Vue
import { onBeforeMount, ref, watch } from "vue";
// Utils
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import getError from "@/utils/handle-errors";
// Services
import service from "@/http/services";
// Interfaces
import type { Business } from "@/interfaces/business";
import type Bank from "@/interfaces/bank";
// Store
import { useBusinessStore } from "@/stores/business";
import { useProductStore } from "@/stores/product";
import { useScheduleStore } from "@/stores/schedule";
import { useDocumentsStore } from "@/stores/documents";
// Enums
import { BusinessSteps } from "@/enums/business-steps";
// Components
import OnboardingSidebar from "@/components/sidebar/OnboardingSidebar.vue";

// Data
const productsStore = useProductStore();
const { t } = useI18n();
const userOptionsItems = ref([
  {
    label: "Cerrar sesión",
    command: () => {
      location.href = "/";
    },
  },
]);
const businessStore = useBusinessStore();
const toast = useToast();
const scheduleStore = useScheduleStore();
const documentsStore = useDocumentsStore();

// Vue lifecycle
onBeforeMount(async () => {
  getAssociatedBusiness();
});

// Watch
watch(
  () => scheduleStore.stepCompleted,
  (value) => {
    if (value && businessStore.photoAndCoverCompleted) {
      businessStore.setStep(BusinessSteps.CUSTOMIZATION);
    }
  },
  { deep: true }
);

watch(
  () => businessStore.photoAndCoverCompleted,
  (value) => {
    if (value && scheduleStore.stepCompleted) {
      businessStore.setStep(BusinessSteps.CUSTOMIZATION);
    }
  },
  { deep: true }
);

const getAssociatedBusiness = async () => {
  try {
    const res = await service.seller.associatedBusinesses();
    if (res.data.data.merchantAssociated.length > 0) {
      const merchantAssociated: Business = res.data.data.merchantAssociated[0];
      businessLogin(merchantAssociated.apiKey, merchantAssociated.apiLogin);
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t(getError(error)),
      life: 3000,
    });
  }
};

const businessLogin = async (apiKey: string, apiLogin: string) => {
  try {
    const res = await service.business.login(apiKey, apiLogin);
    localStorage.setItem("token", res.data.data);
    businessDetail();
    getBank();
    getProducts();
    getSchedule();
    getDocuments();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t(getError(error)),
      life: 3000,
    });
  }
};

const businessDetail = async () => {
  try {
    const res = await service.business.detail();
    const business = res.data.data;
    if (business) {
      const formObject = {
        name: business.name,
        category: business.merchantCategory,
        email: business.email,
        phone: business.cellPhone,
        city: business.cityId,
        address: business.adress,
        kindOfPerson: business.kindOfPerson,
        documentType: business.documentType,
        documentNumber: business.documentNumber,
        companyName: business.bussinesName,
        taxRegime: business.taxRegime,
        legalRepresentative: {
          firstName: business.legalRepresentative.firstName,
          lastName: business.legalRepresentative.lastName,
          documentNumber: business.legalRepresentative.documentNumber,
          documentType: business.legalRepresentative.documentType,
        },
        allowedReservations: business.numberOfReservation,
        minimumValue: business.minimumReserve,
        frontLogo: business.frontLogo,
        logo: business.logo,
      };
      businessStore.setBasicData(formObject);
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t(getError(error)),
      life: 3000,
    });
  }
};

const getBank = async () => {
  try {
    const response = await service.business.getBank();
    const bank = response.data.data.bankAccount[0];
    if (bank) {
      const bankSaved: Bank = {
        fullname: bank.fullName,
        bank: bank.bank,
        account: bank.account,
        document: bank.documentNumber,
        documentType: bank.documentType,
        email: bank.email,
        phone: bank.phone,
        type: bank.type,
      };
      businessStore.setBank(bankSaved);
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t(getError(error)),
      life: 3000,
    });
  }
};

const getProducts = async () => {
  try {
    await productsStore.getProducts();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: t("toast.products.list.error.title"),
      detail: t("toast.products.list.error.message"),
      life: 3000,
    });
  }
};

const getSchedule = () => {
  try {
    scheduleStore.getSchedule();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t(getError(error)),
      life: 3000,
    });
  }
};

const getDocuments = async () => {
  try {
    documentsStore.getDocuments();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t("onboarding.documents.messages.error.load"),
      life: 3000,
    });
  }
};
</script>

<style scoped lang="scss">
::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}
</style>
