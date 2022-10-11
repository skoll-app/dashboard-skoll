<template>
  <Toolbar class="sticky top-0 bg-white z-5">
    <template #start> SKOLL </template>

    <template #end>
      <SplitButton
        icon="pi pi-user"
        class="p-button-secondary"
        :model="userOptionsItems"
      ></SplitButton>
    </template>
  </Toolbar>
  <div class="py-3">
    <div class="w-full md:w-9 mx-auto">
      <div class="card sticky steps">
        <Steps :model="stepItems" :readonly="!basicInfoCompleted">
          <template #item="{ item }">
            <RouterLink
              :to="item.to!"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                class="p-menuitem-link"
                :class="{
                  'active-link': isActive,
                  'exact-active-link': isExactActive,
                }"
                :href="href"
                @click="navigate"
              >
                <span
                  class="p-steps-number"
                  :class="{
                    'bg-green-500': businessStore.stepsCompleted.includes(
                      item.step
                    ),
                  }"
                >
                  <!-- <i
                    v-if="businessStore.stepsCompleted.includes(item.step)"
                    class="pi pi-check text-white"
                  ></i> -->
                  <i
                    class="pi"
                    :class="[
                      item.icon,
                      {
                        'text-white': businessStore.stepsCompleted.includes(
                          item.step
                        ),
                      },
                    ]"
                  ></i>
                </span>
                <span
                  class="mt-1 p-steps-title"
                  :class="{
                    'text-green-500': businessStore.stepsCompleted.includes(
                      item.step
                    ),
                  }"
                  >{{ item.label }}</span
                >
              </a>
            </RouterLink>
          </template>
        </Steps>
      </div>

      <router-view v-slot="{ Component }" @nextPage="nextPage($event)">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Vue
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
// Utils
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
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

// Data
const productsStore = useProductStore();
const { t } = useI18n();
const router = useRouter();
const stepItems = ref([
  {
    label: t("onboarding.steps.basicData"),
    to: "/onboarding/basic-data",
    icon: "pi-building",
    step: "basic-data",
  },
  {
    label: t("onboarding.steps.customization"),
    to: "/onboarding/customization",
    icon: "pi-cog",
    step: "customization",
  },
  {
    label: t("onboarding.steps.products"),
    to: "/onboarding/products",
    icon: "pi-database",
    step: "products",
  },
  {
    label: t("onboarding.steps.bankAccount"),
    to: "/onboarding/bank",
    icon: "pi-dollar",
    step: "bank",
  },
  {
    label: t("onboarding.steps.documents"),
    to: "/onboarding/documents",
    icon: "pi-file",
    step: "documents",
  },
  {
    label: t("onboarding.steps.summary"),
    to: "/onboarding/summary",
    icon: "pi-list",
    step: "summary",
  },
]);
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
// Computed
const basicInfoCompleted = computed(() => {
  return businessStore.basicStepCompleted;
});
// Methods
const nextPage = (event: { pageIndex: number; step: number }) => {
  router.push(stepItems.value[event.pageIndex + 1].to);
};

const getAssociatedBusiness = async () => {
  try {
    const res = await service.seller.associatedBusinesses();
    if (res.data.data.merchantAssociated.length > 0) {
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
    getBank();
    getProducts();
    getSchedule();
    getDocuments();
  } catch (error) {
    console.error(error);
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
      };
      businessStore.setBasicData(formObject);
    }
  } catch (error) {
    console.error(error);
  }
};

const getBank = async () => {
  try {
    const response = await service.business.getBank();
    const bank = response.data.data.bankAccount[0];
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
  } catch (error) {
    console.error(error);
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
    console.log(error);
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

::v-deep(.p-steps-title) {
  @media (max-width: 768px) {
    display: none;
  }
}

::v-deep(.p-steps-item) {
  @media (max-width: 768px) {
    &::before {
      border-top: 0;
    }
  }
}

.steps {
  background-color: white;
  top: 75px;
  z-index: 2;
}

.p-menuitem-link {
  color: var(--text-color) !important;

  &.active-link,
  &.exact-active-link {
    color: var(--blue-400) !important;
    font-weight: bolder;
  }
}

::v-deep(.p-steps .p-steps-item.p-highlight .p-steps-number) {
  background-color: var(--blue-400);
  color: white;
}

::v-deep(.p-steps .p-steps-item:before) {
  content: " ";
  width: 90%;
  top: 56%;
  left: 0;
  display: block;
  position: absolute;
  margin-top: -1rem;
}
</style>
