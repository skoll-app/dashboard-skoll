<script setup lang="ts">
import { reactive, ref } from "vue";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";

import VueCropper from "@ballcat/vue-cropper";
import type { VueCropperInstance } from "@ballcat/vue-cropper";
import "cropperjs/dist/cropper.css";
import type Cropper from "cropperjs";

// Components
import SKInputNumber from "@/components/ux/SKInputNumber.vue";

import * as yup from "yup";

const { t } = useI18n();

// Form
const validationSchema = yup.object({
  allowedReservations: yup.number().min(1).required(),
  minimumValue: yup.number().min(1000).required(),
});

const formRef = reactive(
  useForm({
    validationSchema,
    initialValues: {
      allowedReservations: 1,
      minimumValue: 1000,
    },
  })
);
// Emit
const emit = defineEmits(["next-page", "prev-page"]);
// Functions
const nextPage = () => {
  emit("next-page", {
    formData: formRef.values,
    pageIndex: 1,
  });
};

const prevPage = () => {
  emit("prev-page", {
    pageIndex: 1,
  });
};

const imageSrc = ref(
  new URL("../../../assets/img/paisaje.jpg", import.meta.url).href
);

const vueCropperRef = ref<VueCropperInstance>();

const cropperOptions: Cropper.Options = reactive({
  aspectRatio: 16 / 9,
  viewMode: 1,
  responsive: true,
  restore: true,
  cropBoxMovable: false,
  cropBoxResizable: false,
  toggleDragModeOnDblclick: true,
  dragMode: "move",
});

const data = ref<Cropper.SetDataOptions>({});

const onCrop = (e: CustomEvent) => {
  data.value = e.detail;
};
</script>
<template>
  <Card>
    <template v-slot:title>{{ t("onboarding.steps.customization") }}</template>
    <template v-slot:content>
      <VueCropper
        ref="vueCropperRef"
        class="img-container"
        :src="imageSrc"
        preview=".img-preview"
        v-bind="cropperOptions"
        @crop="onCrop"
        :imgStyle="{ maxHeight: '300px', width: 'auto' }"
      />
      <Divider />
      <h5 class="p-card-title">{{ t("onboarding.bookings") }}</h5>
      <form>
        <div class="grid">
          <div class="col-12 md:col-6">
            <SKInputNumber
              labelClasses="block mb-2"
              :label="t('form.allowedReservations')"
              inputId="allowedReservations"
              name="allowedReservations"
              mode="decimal"
              showButtons
              :min="1"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">
            <SKInputNumber
              labelClasses="block mb-2"
              :label="t('form.minimumBookingValue')"
              inputId="minimumBookingValue"
              mode="currency"
              currency="COP"
              name="minimumValue"
              inputClasses="w-full"
              showButtons
              :min="1000"
              :step="1000"
            />
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <div class="grid grid-nogutter justify-content-between">
        <Button
          :label="$t('form.buttons.back')"
          @click="prevPage()"
          icon="pi pi-angle-left"
          iconPos="left"
          class="p-button-secondary"
        />
        <Button
          :disabled="!formRef.meta.valid"
          :label="$t('form.buttons.next')"
          @click="nextPage()"
          icon="pi pi-angle-right"
          iconPos="right"
        />
      </div>
    </template>
  </Card>
</template>
<style scoped></style>
