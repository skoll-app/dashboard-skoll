<script setup lang="ts">
// Vue
import { onMounted, reactive, ref } from "vue";
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
// Stores
import { useProductStore } from "@/stores/product";

const productsStore = useProductStore();
const toast = useToast();
const { t } = useI18n();
const display = ref(false);
const categoryList = ref<SelectOption[]>([]);
const brandList = ref<SelectOption[]>([]);
const ageRestriction = ref(false);
const saveAnotherProduct = ref(false);
const initialValues = {
  name: "",
  description: "",
  category: "",
  brandId: "",
  amount: 0,
  price: 0,
};
// Form
const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  brandId: yup.string().required(),
  price: yup.number().required().min(100),
  amount: yup.number().required().min(1),
});
const formRef = reactive(
  useForm({
    validationSchema,
    initialValues,
  })
);

// Lifecycle
onMounted(() => {
  getParameters();
});

// Methods
const openForm = () => {
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
    !saveAnotherProduct.value && (display.value = false);
    saveAnotherProduct.value = false;
    productsStore.getProducts();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: t("toast.products.save.error.title"),
      detail: t("toast.products.save.error.message"),
      life: 3000,
    });
  }
});

const getParameters = async () => {
  try {
    const response = await service.utils.parameters();
    const { brand, productCategory } = response.data.data.params;
    setBrands(brand);
    setProductCategory(productCategory);
  } catch (error) {
    console.log(error);
  }
};

const setBrands = (brands: Array<{ id: string; name: string }>) => {
  brands.map((brand: { id: string; name: string }) => {
    brandList.value.push({ code: brand.id, name: brand.name });
  });
};

const setProductCategory = (
  categories: Array<{ id: string; name: string }>
) => {
  categories.map((brand: { id: string; name: string }) => {
    categoryList.value.push({ code: brand.id, name: brand.name });
  });
};

const reset = () => {
  display.value = false;
  formRef.handleReset();
};
</script>

<template>
  <Button
    :label="$t('form.buttons.newProduct')"
    @click="openForm"
    class="mr-2"
  />
  <form class="mt-3" v-show="display" @submit="saveProduct">
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
      <div class="col-12 md:col-6">
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
      <div class="col-12 md:col-6">
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
      <div class="col-12 md:col-6">
        <SKInputNumber
          labelClasses="block mb-2"
          :label="t('form.price')"
          inputId="price"
          mode="currency"
          currency="COP"
          name="price"
          inputClasses="w-full"
          showButtons
          :min="100"
          :step="100"
        />
      </div>
      <div class="col-12 md:col-6">
        <SKInputNumber
          labelClasses="block mb-2"
          :label="t('form.amount')"
          inputId="amount"
          mode="decimal"
          name="amount"
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
          <label for="ageRestriction">{{ $t("form.ageRestriction") }}</label>
        </div>
      </div>
      <div class="col-12">
        <div class="flex justify-content-end">
          <Button
            type="button"
            :label="$t('form.buttons.cancel')"
            class="mt-3 mr-2 p-button-danger"
            @click="reset"
          />
          <Button
            :disabled="!formRef.meta.valid"
            type="submit"
            :label="$t('form.buttons.createProduct')"
            class="mt-3 mr-2 p-button-success"
          />
          <Button
            :disabled="!formRef.meta.valid"
            type="submit"
            :label="$t('form.buttons.saveAndCreateProduct')"
            class="mt-3 p-button-secondary"
            @click="saveAnotherProduct = true"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
