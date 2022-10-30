<script setup lang="ts">
import { BusinessSteps } from "@/enums/business-steps";
import { useBusinessStore } from "@/stores/business";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const businessStore = useBusinessStore();
const { t } = useI18n();
const stepItems = ref([
  {
    label: t("onboarding.steps.basicData"),
    to: "/onboarding/basic-data",
    icon: "pi-building",
    step: BusinessSteps.BASIC_DATA,
  },
  {
    label: t("onboarding.steps.customization"),
    to: "/onboarding/customization",
    icon: "pi-cog",
    step: BusinessSteps.CUSTOMIZATION,
  },
  {
    label: t("onboarding.steps.products"),
    to: "/onboarding/products",
    icon: "pi-database",
    step: BusinessSteps.PRODUCTS,
  },
  {
    label: t("onboarding.steps.bankAccount"),
    to: "/onboarding/bank",
    icon: "pi-dollar",
    step: BusinessSteps.BANK,
  },
  {
    label: t("onboarding.steps.documents"),
    to: "/onboarding/documents",
    icon: "pi-file",
    step: BusinessSteps.DOCUMENTS,
  },
  {
    label: t("onboarding.steps.summary"),
    to: "/onboarding/summary",
    icon: "pi-list",
    step: BusinessSteps.SUMMARY,
  },
]);
</script>
<template>
  <div class="sidebar">
    <RouterLink
      v-for="(item, i) in stepItems"
      :key="i"
      :to="item.to!"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <div class="item w-full" :href="href" @click="navigate">
        <a
          class="p-menuitem-link"
          :class="{
            'active-link': isActive,
            'exact-active-link': isExactActive,
          }"
        >
          <div>
            <i class="mr-2 pi" :class="[item.icon]"></i> {{ item.label }}
          </div>
          <i
            v-if="businessStore.stepsCompleted.includes(item.step)"
            class="ml-auto pi pi-check-circle text-green-500"
            :class="[item.icon]"
          ></i>
        </a>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  overflow: auto;
  position: -webkit-sticky;
  position: sticky;
  top: 62.5px;
  max-width: 230px;
  min-width: 230px;
  background-color: white;
  z-index: 2;
  height: calc(100vh - 62.5px);
  border-right: 1px solid #dee2e6;

  .item {
    min-height: 60px;
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      background-color: var(--surface-ground);
    }

    .p-menuitem-link {
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: var(--text-color) !important;

      // &.active-link,
      &.exact-active-link {
        color: var(--primary-color) !important;
        font-weight: bolder;
      }
    }
  }
}
</style>
