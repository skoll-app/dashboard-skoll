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
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

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

const nextPage = (event: any) => {
  formObject = { ...event.formData };
  console.log(formObject);
  // for (const field in event.formData) {
  //   formObject[field] = event.formData[field];
  // }
  router.push(stepItems.value[event.pageIndex + 1].to);
};
const complete = (e: any) => {
  stepsCompleted.push(e.step);
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
