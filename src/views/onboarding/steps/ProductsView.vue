<script setup lang="ts">
// Components
import ProductsTable from "@/components/tables/products/ProductsTable.vue";
// Utils
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<template>
  <Card>
    <template v-slot:title> {{ t("onboarding.steps.products") }} </template>
    <template v-slot:subtitle>
      <ProductsTable />
    </template>
  </Card>
</template>

<style lang="scss"></style>
