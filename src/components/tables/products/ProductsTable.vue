<script setup lang="ts">
// Vue
import { ref } from "vue";
// Primevue
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
// Interfaces
import type Product from "@/interfaces/product";
// Store
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product";
// Utils
import { useI18n } from "vue-i18n";
// Services
import service from "@/http/services";
// Components
import ProductForm from "@/components/forms/products/ProductForm.vue";

const confirm = useConfirm();
const toast = useToast();
const dt = ref();
const { t } = useI18n();
const productsStore = useProductStore();
const { products, loading, total } = storeToRefs(productsStore);

// Methods
const onPage = (event: any) => {
  productsStore.getProducts(event.page, event.rows);
};

const deleteProduct = (product: Product) => {
  confirm.require({
    message: t("form.dialogs.confirmation.delete.message"),
    header: t("form.dialogs.confirmation.delete.title"),
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    acceptLabel: t("form.buttons.yes"),
    rejectLabel: t("form.buttons.no"),
    accept: async () => {
      try {
        await service.product.delete(product.serialNumber);
        toast.add({
          severity: "success",
          summary: t("form.dialogs.confirmation.delete.success.title"),
          detail: t("form.dialogs.confirmation.delete.success.message"),
          life: 3000,
        });
        productsStore.getProducts();
      } catch (error) {
        toast.add({
          severity: "error",
          summary: t("form.dialogs.confirmation.delete.error.title"),
          detail: t("form.dialogs.confirmation.delete.error.message"),
          life: 3000,
        });
      }
    },
  });
};
</script>
<template>
  <ProductForm />
  <hr />
  <DataTable
    :value="products"
    paginator
    class="p-datatable-customers"
    :rows="5"
    :lazy="true"
    ref="dt"
    dataKey="id"
    :totalRecords="total"
    :loading="loading"
    @page="onPage($event)"
  >
    <Column field="name" :header="t('form.name')"></Column>
    <Column field="description" :header="t('form.description')"></Column>
    <Column field="stock" :header="t('form.stock')"></Column>
    <Column field="amount" :header="t('form.amount')"></Column>
    <Column field="brand" :header="t('form.brand')"></Column>
    <Column
      headerStyle="width: 4rem; text-align: center"
      bodyStyle="text-align: center; overflow: visible"
    >
      <template v-slot:body="slotProps">
        <div class="flex">
          <Button
            v-if="false"
            class="p-button-warning mr-2"
            type="button"
            icon="pi pi-pencil"
            @click="deleteProduct(slotProps.data)"
          ></Button>
          <Button
            class="p-button-danger"
            type="button"
            icon="pi pi-trash"
            @click="deleteProduct(slotProps.data)"
          ></Button>
        </div>
      </template>
    </Column>
    <template #empty> {{ t("form.empty.products") }} </template>
  </DataTable>
</template>
<style scoped></style>
