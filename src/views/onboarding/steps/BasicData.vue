<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
// Components
import SKInputText from "@/components/ux/SKInputText.vue";
import SKSelect from "@/components/ux/SKSelect.vue";
import SKInputMask from "@/components/ux/SKInputMask.vue";
// Enums
import KindOfPerson from "@/enums/person";

const { t } = useI18n();

const businessTypes = ref([
  { name: "Bar", code: "Bar" },
  { name: "Discoteca", code: "Discoteca" },
  { name: "Restaurante", code: "Restaurante" },
]);

const kindOfperson = ref([
  {
    name: KindOfPerson.NATURAL.toLowerCase(),
    code: KindOfPerson.NATURAL,
  },
  {
    name: KindOfPerson.JURIDICAL.toLowerCase(),
    code: KindOfPerson.JURIDICAL,
  },
]);

const documentTypeBusiness = ref([
  {
    name: t("form.documentTypeList.CC"),
    code: "CC",
  },
  {
    name: t("form.documentTypeList.NIT"),
    code: "NIT",
  },
]);

const documentTypeManager = ref([
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

const emit = defineEmits(["next-page"]);

function nextPage() {
  emit("next-page", {
    formData: {},
    pageIndex: 0,
  });
}
</script>
<template>
  <Card>
    <template v-slot:title> {{ t("onboarding.steps.basicData") }} </template>
    <template v-slot:content>
      <VeeForm>
        <div class="grid">
          <div class="col-12 md:col-8">
            <SKInputText
              name="businessName"
              :label="$t('form.businessName')"
              labelClasses="block mb-2"
              :placeholder="$t('form.businessName')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-4">
            <SKSelect
              name="country"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="businessTypes"
              :label="$t('form.businessType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-4">
            <SKInputText
              name="email"
              :label="$t('form.email')"
              labelClasses="block mb-2"
              :placeholder="$t('form.email')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-4">
            <SKInputMask
              name="phone"
              :label="$t('form.phone')"
              labelClasses="block mb-2"
              inputClasses="w-full"
              mask="(999) 999 9999"
              placeholder="(999) 999 9999"
            />
          </div>
          <div class="col-12 md:col-4">
            <SKInputText
              name="businessAddress"
              :label="$t('form.businessAddress')"
              labelClasses="block mb-2"
              :placeholder="$t('form.businessAddress')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="kindOfperson"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="kindOfperson"
              :label="$t('form.kindOfperson')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="taxation"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="businessTypes"
              :label="$t('form.taxation')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="documentTypeBusiness"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="documentTypeBusiness"
              :label="$t('form.documentType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="document"
              :label="$t('form.document')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="companyName"
              :label="$t('form.companyName')"
              labelClasses="block mb-2"
              :placeholder="$t('form.companyName')"
              inputClasses="w-full"
            />
          </div>
        </div>

        <h5 class="p-card-title">{{ t("onboarding.managerLegalInfo") }}</h5>
        <div class="grid">
          <div class="col-12 md:col-6">
            <SKInputText
              name="name"
              :label="$t('form.name')"
              labelClasses="block mb-2"
              :placeholder="$t('form.name')"
              inputClasses="w-full"
              inputStyle="padding: 1rem"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="lastname"
              :label="$t('form.lastname')"
              labelClasses="block mb-2"
              :placeholder="$t('form.lastname')"
              inputClasses="w-full"
              inputStyle="padding: 1rem"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKSelect
              name="documentTypeManager"
              placeholder="Seleccione"
              select-classes="w-full p-1"
              :options="documentTypeManager"
              :label="$t('form.documentType')"
              labelClasses="block mb-2"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputText
              name="document"
              :label="$t('form.document')"
              labelClasses="block mb-2"
              :placeholder="$t('form.document')"
              inputClasses="w-full"
            />
          </div>
        </div>
      </VeeForm>
    </template>
    <template v-slot:footer>
      <div class="grid grid-nogutter justify-content-between">
        <i></i>
        <Button
          label="Next"
          @click="nextPage()"
          icon="pi pi-angle-right"
          iconPos="right"
        />
      </div>
    </template>
  </Card>
</template>
<style scoped></style>
