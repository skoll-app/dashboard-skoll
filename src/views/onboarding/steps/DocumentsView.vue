<script setup lang="ts">
// Vue
import { onMounted, ref } from "vue";
// Components
import service from "@/http/services";
import type { FileUploadRemoveEvent } from "primevue/fileupload";
// Utils
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";

const { t } = useI18n();
const requiredDocuments = ref<any>([]);
const display = ref(false);
const imgExample = ref("");
const toast = useToast();

onMounted(() => {
  getParameters();
});

// Methods
const myUploader = async (event: FileUploadRemoveEvent, id: string) => {
  console.log(event.files);
  console.log(id);
  const formData = new FormData();
  formData.append("file", event.files[0]);
  try {
    const res = await service.multimedia.upload(formData);
    console.log(res);
    toast.add({
      severity: "success",
      summary: t("onboarding.documents.messages.success.title"),
      detail: t("onboarding.documents.messages.success.saved"),
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t("onboarding.documents.messages.error.couldntSave"),
      life: 3000,
    });
  }
};

const getParameters = async () => {
  try {
    const response = await service.utils.parameters();
    requiredDocuments.value = response.data.data.documentsRequiredForMerchant;
  } catch (error) {
    console.error(error);
  }
};

const openHelpModal = (img: string) => {
  display.value = true;
  imgExample.value = img;
};
</script>
<template>
  <Card class="mb-4">
    <template v-slot:title>
      {{ t("onboarding.documents.important.title") }}
    </template>
    <template v-slot:content>
      <ul>
        <li>
          {{ t("onboarding.documents.important.first") }}
        </li>
        <li>
          {{ t("onboarding.documents.important.second") }}
        </li>
        <li v-html="t('onboarding.documents.important.third')"></li>
        <li v-html="t('onboarding.documents.important.fourth')"></li>
      </ul>
    </template>
  </Card>
  <Card v-for="document in requiredDocuments" :key="document.name" class="mb-4">
    <template v-slot:title>
      {{ document.name }}
    </template>
    <template v-slot:subtitle>
      {{ document.description }}
    </template>
    <template v-slot:content>
      <FileUpload
        :name="document.id.toString()"
        customUpload
        accept=".pdf,image/*"
        :maxFileSize="1000000"
        :upload-label="t('form.buttons.upload')"
        :cancel-label="t('form.buttons.cancel')"
        :choose-label="t('form.buttons.select')"
        :multiple="false"
        :fileLimit="1"
        @uploader="myUploader($event, document.id)"
      >
        <template #empty>
          <p>{{ t("form.dragAndDrop") }}</p>
        </template>
      </FileUpload>
      <Button
        label="Ver ejemplo"
        icon="pi pi-question-circle"
        class="p-button-info mt-2"
        @click="openHelpModal(document.example)"
      />
    </template>
  </Card>
  <Dialog v-model:visible="display" modal>
    <img :src="imgExample" alt="Document" />
  </Dialog>
</template>

<style scoped></style>
