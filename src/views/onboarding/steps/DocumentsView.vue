<script setup lang="ts">
import type { FileUploadRemoveEvent } from "primevue/fileupload";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const myUploader = (event: FileUploadRemoveEvent) => {
  console.log(event.files);
};
</script>
<template>
  <Card class="mb-4">
    <template v-slot:title>
      {{ t("onboarding.managerLegalInfo") }}
    </template>
    <template v-slot:subtitle>
      {{ t("onboarding.bank.document") }}
    </template>
    <template v-slot:content>
      <FileUpload
        name="demo[]"
        url="./upload.php"
        customUpload
        accept="image/*"
        :maxFileSize="1000000"
        :upload-label="t('form.buttons.upload')"
        :cancel-label="t('form.buttons.cancel')"
        :choose-label="t('form.buttons.select')"
        :multiple="false"
        :fileLimit="1"
        @uploader="myUploader"
      >
        <template #empty>
          <p>{{ t("form.dragAndDrop") }}</p>
        </template>
      </FileUpload>
    </template>
  </Card>
  <Card class="mb-4">
    <template v-slot:title>
      {{ t("onboarding.bank.certificate.title") }}
    </template>
    <template v-slot:subtitle>
      {{ t("onboarding.bank.certificate.subtitle") }}
    </template>
    <template v-slot:content>
      <FileUpload
        name="demo[]"
        url="./upload.php"
        customUpload
        accept="image/*"
        :maxFileSize="1000000"
        :upload-label="t('form.buttons.upload')"
        :cancel-label="t('form.buttons.cancel')"
        :choose-label="t('form.buttons.select')"
        :multiple="false"
        :fileLimit="1"
        @uploader="myUploader"
      >
        <template #empty>
          <p>{{ t("form.dragAndDrop") }}</p>
        </template>
      </FileUpload>
    </template>
  </Card>
  <Card>
    <template v-slot:title>
      {{ t("onboarding.bank.rut.title") }}
    </template>
    <template v-slot:subtitle>
      <div v-html="t('onboarding.bank.rut.subtitle')"></div>
    </template>
    <template v-slot:content>
      <FileUpload
        name="demo[]"
        url="./upload.php"
        customUpload
        accept="image/*"
        :maxFileSize="1000000"
        :upload-label="t('form.buttons.upload')"
        :cancel-label="t('form.buttons.cancel')"
        :choose-label="t('form.buttons.select')"
        :multiple="false"
        :fileLimit="1"
        @uploader="myUploader"
      >
        <template #empty>
          <p>{{ t("form.dragAndDrop") }}</p>
        </template>
      </FileUpload>
    </template>
  </Card>
</template>

<style scoped></style>
