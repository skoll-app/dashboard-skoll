<script setup lang="ts">
import { reactive } from "vue";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";

// Components
import SKInputNumber from "@/components/ux/SKInputNumber.vue";

import * as yup from "yup";

const { t } = useI18n();

// Form
const validationSchema = yup.object({
  allowedReservations: yup.number().min(1).required(),
  minimumValue: yup.number().min(1).required(),
});

const formRef = reactive(
  useForm({
    validationSchema,
    initialValues: {
      allowedReservations: "",
      minimumValue: "",
    },
  })
);
// Emit
const emit = defineEmits(["next-page"]);
// Functions
function nextPage() {
  emit("next-page", {
    formData: formRef.values,
    pageIndex: 0,
  });
}
</script>
<template>
  <Card>
    <template v-slot:title>{{ t("onboarding.steps.customization") }}</template>
    <template v-slot:content>
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
              :min="0"
              :max="100"
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
            />
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <div class="grid grid-nogutter justify-content-between">
        <i></i>
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
