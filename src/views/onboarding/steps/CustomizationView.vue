<script setup lang="ts">
import { reactive, ref } from "vue";
// VueCropper
import VueCropper from "@ballcat/vue-cropper";
import type { VueCropperInstance } from "@ballcat/vue-cropper";
import "cropperjs/dist/cropper.css";
import type Cropper from "cropperjs";
// Services
import service from "@/http/services";
// Components
import ScheduleTable from "@/components/tables/schedule/ScheduleTable.vue";
// Utils
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
const inputFile = ref<HTMLInputElement>();
const showCropper = ref(false);
const logo = ref("");

const onCrop = (e: CustomEvent) => {
  data.value = e.detail;
};

const cropImage = (options: Cropper.GetCroppedCanvasOptions) => {
  const croppedCanvas = vueCropperRef.value?.getCroppedCanvas(
    options
  ) as HTMLCanvasElement;

  croppedCanvas?.toBlob((blob: any) => {
    const formData = new FormData();
    formData.append("file", blob, `cover-page-${Date.now()}.png`);
    formData.append("description", "avatar");
    submitProfilePic(formData);
  }, "image/png");
};

const submitProfilePic = async (formData: any) => {
  try {
    const res = await service.multimedia.uploadLogo(formData);
    console.log(res);
    logo.value = res.data.location;
  } catch (error: any) {
    console.log(error);
  }
};

const setImage = (e: any) => {
  const file = e.target.files[0];
  if (file.type.indexOf("image/") === -1) {
    alert("Please select an image file");
    return;
  }
  if (typeof FileReader === "function") {
    showCropper.value = true;
    const reader = new FileReader();
    reader.onload = (event) => {
      imageSrc.value = event.target?.result as string;
      // rebuild cropperjs with the updated source
      vueCropperRef.value?.replace(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  } else {
    showCropper.value = false;
    alert("Sorry, FileReader API not supported");
  }
};

const showFileChooser = () => {
  inputFile.value?.click();
};
</script>
<template>
  <Card class="mb-3">
    <template v-slot:title>{{ t("onboarding.steps.customization") }}</template>
    <template v-slot:content>
      <div v-show="showCropper">
        <VueCropper
          ref="vueCropperRef"
          class="img-container"
          :src="imageSrc"
          preview=".img-preview"
          v-bind="cropperOptions"
          @crop="onCrop"
          :imgStyle="{ maxHeight: '300px', width: 'auto' }"
        />
        <Button
          class="btn btn-primary mt-2"
          label="Cortar"
          @click="cropImage({ maxWidth: 4096, maxHeight: 4096 })"
        ></Button>
      </div>

      <Button
        class="btn btn-primary mt-2"
        label="Subir imagen"
        @click.prevent="showFileChooser"
      ></Button>

      <input
        class="hidden"
        ref="inputFile"
        type="file"
        name="image"
        accept="image/*"
        @change="setImage"
      />
    </template>
    <template v-slot:footer>
      <div class="grid grid-nogutter justify-content-end">
        <Button type="submit" :label="$t('form.buttons.save')" />
      </div>
    </template>
  </Card>

  <ScheduleTable />
</template>
<style scoped></style>
