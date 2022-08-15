<template>
  <div class="pt-5">
    <div class="w-full md:w-9 mx-auto">
      <div class="card">
        <Steps :model="items" readonly />
      </div>

      <router-view
        v-slot="{ Component }"
        :formData="formObject"
        @prevPage="prevPage($event)"
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
const items = ref([
  {
    label: t("onboarding.steps.basicData"),
    to: "/onboarding/basic-data",
  },
  {
    label: t("onboarding.steps.customization"),
    to: "/onboarding/customization",
  },
  {
    label: t("onboarding.steps.menu"),
    to: "/onboarding/menu",
  },
  {
    label: t("onboarding.steps.scheduler"),
    to: "/onboarding/scheduler",
  },
  {
    label: t("onboarding.steps.documents"),
    to: "/onboarding/documents",
  },
]);
let formObject: Record<string, unknown> = reactive({});

const nextPage = (event: any) => {
  formObject = { ...event.formData };
  console.log(formObject);
  // for (const field in event.formData) {
  //   formObject[field] = event.formData[field];
  // }
  router.push(items.value[event.pageIndex + 1].to);
};
const prevPage = (event: any) => {
  router.push(items.value[event.pageIndex - 1].to);
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
</style>
