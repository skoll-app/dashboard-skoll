<script setup lang="ts">
import { watch } from "vue";
// Components
import ScheduleTable from "@/components/tables/schedule/ScheduleTable.vue";
import CoverPhoto from "@/components/cropper/CoverPhoto.vue";
import LogoPhoto from "@/components/cropper/LogoPhoto.vue";
// Store
import { useScheduleStore } from "@/stores/schedule";
import { useBusinessStore } from "@/stores/business";
import { Steps } from "@/interfaces/business-steps";

const scheduleStore = useScheduleStore();
const businessStore = useBusinessStore();

// Watch
watch(
  () => scheduleStore.stepCompleted,
  (value) => {
    if (value && businessStore.photoAndCoverCompleted)
      businessStore.setStep(Steps.CUSTOMIZATION);
  },
  { deep: true }
);

watch(
  () => businessStore.photoAndCoverCompleted,
  (value) => {
    if (value && scheduleStore.stepCompleted)
      businessStore.setStep(Steps.CUSTOMIZATION);
  },
  { deep: true }
);
</script>
<template>
  <LogoPhoto />
  <CoverPhoto />
  <ScheduleTable />
</template>
<style scoped></style>
