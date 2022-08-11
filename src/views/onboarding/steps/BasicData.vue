<script setup lang="ts">
import { ref } from "vue";
import SKInputText from "@/components/ux/SKInputText.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const firstname = ref("");
const lastname = ref("");
const age = ref(null);

const emit = defineEmits(["next-page"]);

function nextPage() {
  emit("next-page", {
    formData: { firstname: firstname, lastname: lastname, age: age },
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
          <div class="col-12 md:col-6">
            <SKInputText
              name="businessName"
              :label="$t('form.businessName')"
              labelClasses="block mb-2"
              :placeholder="$t('form.businessName')"
              inputClasses="w-full"
            />
          </div>
          <div class="col-12 md:col-6">2</div>
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
