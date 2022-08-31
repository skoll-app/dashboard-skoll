<script setup lang="ts">
// Vue
import { ref } from "vue";
// Utils
import { useI18n } from "vue-i18n";
// Components
import SKInputText from "@/components/ux/SKInputText.vue";
import SKSelect from "@/components/ux/SKSelect.vue";
import SKInputNumber from "@/components/ux/SKInputNumber.vue";
// Interfaces
import type SelectOption from "@/interfaces/select-option";

const { t } = useI18n();
const display = ref(false);
const categoryList = ref<SelectOption[]>([
  {
    code: "00001",
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
// Methods
const openModal = () => {
  display.value = true;
};
</script>
<template>
  <Card>
    <template v-slot:title> {{ t("onboarding.steps.products") }} </template>
    <template v-slot:subtitle>
      <Button
        :label="$t('form.buttons.createProduct')"
        @click="openModal"
        class="mr-2"
      />
      <Button
        :label="$t('form.buttons.createCategory')"
        @click="openModal"
        class="p-button-secondary"
      />
    </template>
  </Card>
  <Sidebar v-model:visible="display" position="right" class="p-sidebar-md">
    <div class="px-3">
      <h3>Producto</h3>
      <form>
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
              name="brand"
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
              :label="t('form.value')"
              inputId="value"
              mode="currency"
              currency="COP"
              name="value"
              inputClasses="w-full"
              showButtons
              :min="100"
              :step="100"
            />
          </div>
          <div class="col-12">
            <div class="flex align-items-center">
              <Checkbox
                id="ageRestriction"
                v-model="ageRestriction"
                :binary="true"
                class="mr-2"
              ></Checkbox>
              <label for="ageRestriction">{{
                $t("form.ageRestriction")
              }}</label>
            </div>
          </div>
          <div class="col-12">
            <div class="flex justify-content-end">
              <Button
                :label="$t('form.buttons.createProduct')"
                @click="openModal"
                class="mt-3 p-button-success"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </Sidebar>
</template>

<style lang="scss"></style>
