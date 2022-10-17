<script setup lang="ts">
import { reactive, ref, watch } from "vue";

// VueCropper
import VueCropper from "@ballcat/vue-cropper";
import type { VueCropperInstance } from "@ballcat/vue-cropper";
import "cropperjs/dist/cropper.css";
import type Cropper from "cropperjs";
// Utils
import { useI18n } from "vue-i18n";
// Store
import { useBusinessStore } from "@/stores/business";
// Services
import service from "@/http/services";

const { t } = useI18n();

const data = ref<Cropper.SetDataOptions>({});
const inputFile = ref<HTMLInputElement>();
const showCropper = ref(false);
const imageSrc = ref();
const cover = ref();

const vueCropperRef = ref<VueCropperInstance>();
const businessStore = useBusinessStore();

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

// Watch
watch(
  () => businessStore.cover,
  (value) => {
    cover.value = value;
  },
  { deep: true }
);

// Methods
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
    const res = await service.multimedia.upload(formData);
    showCropper.value = false;
    cover.value = res.data.location;
    const response = await service.seller.uploadCoverOrLogo(
      cover.value,
      "logo"
    );
    console.log(response);
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
  cover.value = "";
  inputFile.value?.click();
};

const cancelUpload = () => {
  cover.value = businessStore.cover;
  showCropper.value = false;
  imageSrc.value = null;
};
</script>
<template>
  <Card class="mb-3">
    <template v-slot:title>{{ t("onboarding.steps.customization") }}</template>
    <template v-slot:content>
      <div class="flex">
        <section class="cropper-area mr-3">
          <template v-if="showCropper && !cover">
            <div class="img-cropper">
              <VueCropper
                ref="vueCropperRef"
                :src="imageSrc"
                v-bind="cropperOptions"
                preview=".preview"
                @crop="onCrop"
              />
            </div>
          </template>
        </section>
        <section v-if="showCropper && !cover" class="preview-area">
          <p>{{ t("customization.preview") }}</p>
          <div class="preview" />
        </section>
      </div>

      <template v-if="showCropper && !cover">
        <Button
          :disabled="!showCropper"
          :label="$t('form.buttons.cancel')"
          class="p-button-danger mr-2"
          type="button"
          @click="cancelUpload"
        />
        <Button
          class="mt-2 mr-2"
          :label="t('form.buttons.saveImage')"
          @click="cropImage({ maxWidth: 4096, maxHeight: 4096 })"
        ></Button>
      </template>
      <template v-if="!showCropper && cover">
        <img class="w-full mt-2" style="border: 1px solid #000" :src="cover" />
      </template>
      <Button
        class="p-button-info mt-2"
        :label="t('form.buttons.changeCover')"
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
  </Card>
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
</style>
