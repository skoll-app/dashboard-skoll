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
  <div class="py-5">
    <div class="w-full md:w-9 mx-auto">
      <div class="card sticky steps">
        <Steps :model="stepItems" :readonly="false">
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
                    'bg-green-500': stepsCompleted.includes(item.index),
                  }"
                >
                  <i
                    v-if="stepsCompleted.includes(item.index)"
                    class="pi pi-check text-white"
                  ></i>
                  <i v-else class="pi" :class="item.icon"></i>
                </span>
                <span
                  :class="{
                    'text-green-500': stepsCompleted.includes(item.index),
                  }"
                  >{{ item.label }}</span
                >
              </a>
            </RouterLink>
          </template>
        </Steps>
      </div>

      <router-view
        v-slot="{ Component }"
        :formData="formObject"
        @nextPage="nextPage($event)"
        @stepComplete="complete"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Vue
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
// Utils
import { useI18n } from "vue-i18n";
// Services
import service from "@/http/services";
// Interfaces
import type { Business } from "@/interfaces/business";

// Data
const { t } = useI18n();
const router = useRouter();
const stepItems = ref([
  {
    label: t("onboarding.steps.basicData"),
    to: "/onboarding/basic-data",
    icon: "pi-building",
    index: 0,
  },
  {
    label: t("onboarding.steps.customization"),
    to: "/onboarding/customization",
    icon: "pi-cog",
    index: 1,
  },
  {
    label: t("onboarding.steps.bankAccount"),
    to: "/onboarding/bank",
    icon: "pi-dollar",
    index: 2,
  },
  {
    label: t("onboarding.steps.documents"),
    to: "/onboarding/documents",
    icon: "pi-file",
    index: 3,
  },
  {
    label: t("onboarding.steps.summary"),
    to: "/onboarding/documents",
    icon: "pi-list",
    index: 4,
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
let formObject: Record<string, unknown> = reactive({});
const stepsCompleted = reactive<number[]>([]);
// Vue lifecycle

onBeforeMount(() => {
  getAssociatedBusiness();
});
// Methods
const nextPage = (event: any) => {
  // for (const field in event.formData) {
  //   formObject[field] = event.formData[field];
  // }
  router.push(stepItems.value[event.pageIndex + 1].to);
};
const complete = (e: any) => {
  stepsCompleted.push(e.step);
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
  } catch (error) {
    console.error(error);
  }
};

const businessDetail = async () => {
  try {
    const res = await service.business.detail();
    const business = res.data.data;
    formObject = {
      businessName: business.name,
      businessType: business.merchantCategory,
      email: business.email,
      phone: business.cellPhone,
      businessCity: business.cityId,
      businessAddress: business.adress,
      kindOfperson: business.kindOfPerson,
      businessDocumentType: business.documentType,
      businessDocument: business.documentNumber,
      companyName: business.bussinesName,
      taxation: business.taxRegime,
      manager: {
        name: business.legalRepresentative.firstName,
        lastname: business.legalRepresentative.lastName,
        document: business.legalRepresentative.documentNumber,
        documentType: business.legalRepresentative.documentType,
      },
    };
  } catch (error) {
    console.error(error);
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
  top: 90px;
  z-index: 2;
}

.p-menuitem-link {
  color: var(--text-color) !important;

  &.active-link,
  &.exact-active-link {
    color: var(--primary-color) !important;
    font-weight: bolder;
  }
}

::v-deep(.p-steps .p-steps-item.p-highlight .p-steps-number) {
  background-color: var(--primary-color);
  color: white;
}

::v-deep(.p-steps .p-steps-item:before) {
  content: " ";
  border-top: 1px solid #dee2e6;
  width: 90%;
  top: 60%;
  left: 0;
  display: block;
  position: absolute;
  margin-top: -1rem;
}
</style>
