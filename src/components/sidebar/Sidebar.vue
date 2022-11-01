<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type Menu from "@/interfaces/menu";
import { useBusinessStore } from "@/stores/business";

defineProps({
  menu: {
    type: Array<Menu>,
    default: () => [],
  },
});

const businessStore = useBusinessStore();
const { t } = useI18n();
</script>
<template>
  <div class="sidebar">
    <RouterLink
      v-for="(item, i) in menu"
      :key="i"
      :to="item.to!"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <div
        class="item w-full"
        :class="{
          'surface-200': isExactActive,
        }"
        :href="href"
        @click="navigate"
      >
        <a
          class="p-menuitem-link"
          :class="{
            'active-link': isActive,
            'exact-active-link': isExactActive,
          }"
        >
          <div>
            <i
              class="hidden md:inline-block m-0 md:mr-3 pi"
              :class="[item.icon]"
            ></i>
            <i
              class="flex md:hidden m-0 md:mr-3 pi"
              :class="[
                item.icon,
                {
                  'text-green-500': businessStore.stepsCompleted.includes(
                    item.step
                  ),
                },
              ]"
            ></i>
            <span class="hidden md:inline-block">{{ t(item.label) }}</span>
          </div>
          <i
            v-if="businessStore.stepsCompleted.includes(item.step)"
            class="ml-auto pi pi-check-circle text-green-500 hidden md:inline-block"
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

      &.exact-active-link {
        color: var(--primary-color) !important;
        font-weight: bolder;
      }
    }
  }
}

@media (max-width: 576px) {
  .sidebar {
    min-width: 50px;
  }
}
</style>
