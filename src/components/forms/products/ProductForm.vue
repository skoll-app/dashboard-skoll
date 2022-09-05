<script setup lang="ts">
// Vue
import { reactive, ref } from "vue";
// Utils
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { useForm } from "vee-validate";
// Components
import SKInputText from "@/components/ux/SKInputText.vue";
import SKSelect from "@/components/ux/SKSelect.vue";
import SKInputNumber from "@/components/ux/SKInputNumber.vue";
// Primevue
import { useToast } from "primevue/usetoast";
// Interfaces
import type Product from "@/interfaces/product";
import type SelectOption from "@/interfaces/select-option";
// Services
import service from "@/http/services";

const toast = useToast();
const { t } = useI18n();
const display = ref(false);
const categoryList = ref<SelectOption[]>([
  {
    code: "000002",
    name: "Bebidas",
  },
]);
const brandList = ref<SelectOption[]>([
  {
    code: "00001",
    name: "Coca Cola",
  },
]);
const ageRestriction = ref(false);
const initialValues = {
  name: "",
  description: "",
  category: "",
  brandId: "",
  amount: 0,
  stock: 0,
};
// Form
const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  brandId: yup.string().required(),
  amount: yup.number().required().min(100),
  stock: yup.number().required().min(1),
});
const formRef = reactive(
  useForm({
    validationSchema,
    initialValues,
  })
);
// Methods
const openModal = () => {
  display.value = true;
};

const saveProduct = formRef.handleSubmit(async (values: any, { resetForm }) => {
  try {
    const product: Product = {
      ...values,
      ageRestriction: ageRestriction.value,
    };
    await service.product.create(product);
    resetForm();
    display.value = false;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: t("toast.products.save.error.title"),
      detail: t("toast.products.save.error.message"),
      life: 3000,
    });
  }
});
</script>

<template>
  <Button
    :label="$t('form.buttons.createProduct')"
    @click="openModal"
    class="mr-2"
  />
  <Sidebar v-model:visible="display" position="right" class="p-sidebar-md">
    <div class="px-3">
      <h3>Producto</h3>
      <form @submit="saveProduct">
        <div class="grid">
          <div class="col-12">
            <SKInputText
              name="name"
              :label="$t('form.name')"
              labelClasses="block mb-2"
              :placeholder="$t('form.name')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12">
            <SKInputText
              name="description"
              :label="$t('form.description')"
              labelClasses="block mb-2"
              :placeholder="$t('form.description')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12">
            <SKSelect
              name="category"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="categoryList"
              :label="$t('form.category')"
              labelClasses="block mb-2"
              filter
            />
          </div>
          <div class="col-12">
            <SKSelect
              name="brandId"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="brandList"
              :label="$t('form.brand')"
              labelClasses="block mb-2"
              filter
            />
          </div>
          <div class="col-12">
            <SKInputNumber
              labelClasses="block mb-2"
              :label="t('form.amount')"
              inputId="amount"
              mode="currency"
              currency="COP"
              name="amount"
              inputClasses="w-full"
              showButtons
              :min="100"
              :step="100"
            />
          </div>
          <div class="col-12">
            <SKInputNumber
              labelClasses="block mb-2"
              :label="t('form.stock')"
              inputId="stock"
              mode="decimal"
              name="stock"
              inputClasses="w-full"
              showButtons
              :min="1"
            />
          </div>
          <div class="col-12">
            <div class="flex align-items-center">
              <Checkbox
                id="ageRestriction"
                v-model="ageRestriction"
                :binary="true"
                class="mr-2"
                name="ageRestriction"
              ></Checkbox>
              <label for="ageRestriction">{{
                $t("form.ageRestriction")
              }}</label>
            </div>
          </div>
          <div class="col-12">
            <div class="flex justify-content-end">
              <Button
                :disabled="!formRef.meta.valid"
                type="submit"
                :label="$t('form.buttons.createProduct')"
                class="mt-3 p-button-success"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </Sidebar>
</template>

<style scoped></style>
