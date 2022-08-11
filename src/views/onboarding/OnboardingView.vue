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
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();

const router = useRouter();
const items = ref([
  {
    label: t("onboarding.steps.basicData"),
    to: "/",
  },
]);
const formObject: Ref<Record<string, unknown>> = ref({
  name: "",
  type: {},
  email: "",
  phone: "",
  address: "",
  kindOfperson: {},
  taxation: {},
  documentType: {},
  document: "",
  companyName: "",
  manager: {
    name: "",
    lastname: "",
    documentType: {},
    document: "",
  },
});

const nextPage = (event: any) => {
  for (const field in event.formData) {
    formObject.value[field] = event.formData[field];
  }
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
</style>
