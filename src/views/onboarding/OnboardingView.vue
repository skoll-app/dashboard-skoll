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
        <Steps :model="stepItems" :readonly="false" />
      </div>

      <router-view
        v-slot="{ Component }"
        :formData="formObject"
        @nextPage="nextPage($event)"
        @complete="complete"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();

const router = useRouter();
const stepItems = ref([
  {
    label: t("onboarding.steps.basicData"),
    to: "/onboarding/basic-data",
  },
  {
    label: t("onboarding.steps.customization"),
    to: "/onboarding/customization",
  },
  {
    label: t("onboarding.steps.bankAccount"),
    to: "/onboarding/bank",
  },
  {
    label: t("onboarding.steps.documents"),
    to: "/onboarding/documents",
  },
  {
    label: t("onboarding.steps.summary"),
    to: "/onboarding/documents",
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

const nextPage = (event: any) => {
  formObject = { ...event.formData };
  console.log(formObject);
  // for (const field in event.formData) {
  //   formObject[field] = event.formData[field];
  // }
  router.push(stepItems.value[event.pageIndex + 1].to);
};
const complete = () => {
  console.log("completo");
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
</style>
