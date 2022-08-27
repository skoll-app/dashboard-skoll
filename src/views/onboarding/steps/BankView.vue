<script setup lang="ts">
// Vue
import { ref } from "vue";
// Utils
import { useI18n } from "vue-i18n";
// Components
import SKInputText from "@/components/ux/SKInputText.vue";
import SKSelect from "@/components/ux/SKSelect.vue";
// Interfaces
import type SelectOption from "@/interfaces/select-option";

const { t } = useI18n();

const bankList = ref<SelectOption[]>([
  {
    code: "00001",
    name: "Bancolombia",
  },
]);

const documentTypeList = ref<SelectOption[]>([
  {
    name: t("form.documentTypeList.CC"),
    code: "CC",
  },
  {
    name: t("form.documentTypeList.NIT"),
    code: "NIT",
  },
  {
    name: t("form.documentTypeList.CE"),
    code: "CE",
  },
]);
const accountTypeList = ref<SelectOption[]>([
  {
    name: t("form.accountTypeList.savingAccount"),
    code: "SA",
  },
  {
    name: t("form.accountTypeList.currentAccount"),
    code: "CA",
  },
  {
    name: t("form.accountTypeList.virtualAccount"),
    code: "VA",
  },
]);
</script>
<template>
  <form>
    <Card>
      <template v-slot:title>
        {{ t("onboarding.steps.bankAccount") }}
      </template>
      <template v-slot:content>
        <div class="grid">
          <div class="col-12 md:col-6">
            <SKInputText
              name="businessName"
              :label="$t('form.accountHolderFullname')"
              labelClasses="block mb-2"
              :placeholder="$t('form.fullname')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="businessType"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="bankList"
              :label="$t('form.businessType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="manager.documentType"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="documentTypeList"
              :label="$t('form.documentType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="manager.document"
              :label="$t('form.accountHolderDocument')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="manager.documentType"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="accountTypeList"
              :label="$t('form.accountType')"
              labelClasses="block mb-2"
            />
          </div>
        </div>
      </template>
    </Card>
  </form>
</template>
<style scoped></style>
