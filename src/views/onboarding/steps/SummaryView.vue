<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
<template>
  <Card>
    <template v-slot:title> {{ t("summary.title") }} </template>
    <template v-slot:subtitle> </template>
  </Card>
</template>
<style scoped></style>
