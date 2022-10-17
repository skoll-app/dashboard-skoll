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
const vueCropperRef = ref<VueCropperInstance>();

const cropperOptions: Cropper.Options = reactive({
  aspectRatio: 16 / 5,
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
const imageSrc = ref(
  new URL("../../../assets/img/default-cover.jpeg", import.meta.url).href
);

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

const submitProfilePic = async (formData: FormData) => {
  try {
    const res = await service.multimedia.uploadLogo(formData);
    console.log(res);
    showCropper.value = false;
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
      <div v-if="showCropper && !logo" class="flex">
        <section class="cropper-area mr-3">
          <div class="img-cropper">
            <VueCropper
              ref="vueCropperRef"
              :src="imageSrc"
              v-bind="cropperOptions"
              preview=".preview"
              @crop="onCrop"
            />
          </div>
          <Button
            class="mt-2"
            label="Subir imagen"
            @click="cropImage({ maxWidth: 4096, maxHeight: 4096 })"
          ></Button>
        </section>
        <section class="preview-area">
          <p>Previsualización</p>
          <div class="preview" />
        </section>
      </div>

      <template v-if="!showCropper && !logo">
        <Button
          class="p-button-info mt-2"
          label="Agregar foto portada"
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
      <template v-if="!showCropper && logo">
        <img class="w-full mt-2" style="border: 1px solid #000" :src="logo" />
      </template>
    </template>
    <template v-slot:footer>
      <div class="grid grid-nogutter justify-content-end">
        <Button
          :disabled="!showCropper"
          class="p-button-danger mr-2"
          type="button"
          :label="$t('form.buttons.cancel')"
        />
        <Button
          :disabled="!logo"
          type="submit"
          :label="$t('form.buttons.save')"
        />
      </div>
    </template>
  </Card>

  <ScheduleTable />
</template>
<style scoped>
.cropper-area {
  width: 500px;
}

.preview {
  width: 100%;
  height: calc(372px * (5 / 16));
  overflow: hidden;
  border: 1px solid #000;
}

.preview-area {
  width: 421px;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
</style>
