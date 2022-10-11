<script setup lang="ts">
// import VueCropper from "@ballcat/vue-cropper";
// import type { VueCropperInstance } from "@ballcat/vue-cropper";
// import "cropperjs/dist/cropper.css";
// import type Cropper from "cropperjs";

// Services
import ScheduleTable from "@/components/tables/schedule/ScheduleTable.vue";

// Form
// const validationSchema = yup.object({
//   allowedReservations: yup.number().min(1).required(),
//   minimumValue: yup.number().min(1000).required(),
// });

// const formRef = reactive(
//   useForm({
//     validationSchema,
//     initialValues: {
//       allowedReservations: 1,
//       minimumValue: 1000,
//     },
//   })
// );

// const imageSrc = ref(
//   new URL("../../../assets/img/paisaje.jpg", import.meta.url).href
// );

// const vueCropperRef = ref<VueCropperInstance>();

// const cropperOptions: Cropper.Options = reactive({
//   aspectRatio: 16 / 9,
//   viewMode: 1,
//   responsive: true,
//   restore: true,
//   cropBoxMovable: false,
//   cropBoxResizable: false,
//   toggleDragModeOnDblclick: true,
//   dragMode: "move",
// });

// const data = ref<Cropper.SetDataOptions>({});

// const onCrop = (e: CustomEvent) => {
//   data.value = e.detail;
// };

// const cropImage = (options: Cropper.GetCroppedCanvasOptions) => {
//   const croppedCanvas = vueCropperRef.value?.getCroppedCanvas(
//     options
//   ) as HTMLCanvasElement;

//   croppedCanvas?.toBlob((blob: any) => {
//     const formData = new FormData();
//     formData.append("file", blob, `cover-page-${Date.now()}.png`);
//     formData.append("description", "avatar");
//     submitProfilePic(formData);
//   }, "image/png");
// };

// const submitProfilePic = async (formData: any) => {
//   try {
//     await service.utils.updateLogo(formData);
//     location.reload();
//   } catch (error: any) {
//     console.log(error);
//   }
// };
</script>
<template>
  <ScheduleTable />
</template>
<style scoped></style>
