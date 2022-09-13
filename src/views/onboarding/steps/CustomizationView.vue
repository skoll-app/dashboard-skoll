<script setup lang="ts">
// Vue
import { reactive, ref } from "vue";
// import VueCropper from "@ballcat/vue-cropper";
// import type { VueCropperInstance } from "@ballcat/vue-cropper";
// import "cropperjs/dist/cropper.css";
// import type Cropper from "cropperjs";

// Components
import SKInputNumber from "@/components/ux/SKInputNumber.vue";
import SKSelect from "@/components/ux/SKSelect.vue";
// Utils
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
// Services
import service from "@/http/services";
// Constants
import { SCHEDULE_OPTIONS } from "@/constants";

const { t } = useI18n();
const hours = ref(SCHEDULE_OPTIONS);
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

const scheduleValues = reactive({
  monday: {
    opening: "",
    closing: "",
  },
  tuesday: {
    opening: "",
    closing: "",
  },
  wednesday: {
    opening: "",
    closing: "",
  },
  thursday: {
    opening: "",
    closing: "",
  },
  friday: {
    opening: "",
    closing: "",
  },
  saturday: {
    opening: "",
    closing: "",
  },
  sunday: {
    opening: "",
    closing: "",
  },
});

const scheduleFormRef = reactive(
  useForm({
    initialValues: scheduleValues,
  })
);

const resetHour = (day: string) => {
  console.log(day);
};

const saveSchedule = scheduleFormRef.handleSubmit(async (values) => {
  console.log(values);
});

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
  <Card class="mb-3">
    <template v-slot:title>{{ t("onboarding.steps.customization") }}</template>
    <template v-slot:content>
      <!-- <VueCropper
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
      ></Button> -->
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
      <div class="grid grid-nogutter justify-content-center">
        <Button
          type="submit"
          :label="$t('form.buttons.continue')"
          class="py-3 px-5 text-xl"
        />
      </div>
    </template>
  </Card>
  <form @submit="saveSchedule">
    <Card>
      <template v-slot:title>{{ t("onboarding.schedule.title") }}</template>
      <template v-slot:content>
        <div class="grid mb-3">
          <div class="col-12 md:col-2">{{ t("onboarding.schedule.day") }}</div>
          <div class="col-6 md:col-2">
            {{ t("onboarding.schedule.opening") }}
          </div>
          <div class="col-6 md:col-2">
            {{ t("onboarding.schedule.closing") }}
          </div>
          <div class="col-12 md:col-6"></div>
        </div>
        <hr />
        <div class="grid">
          <div class="col-12 md:col-2">
            {{ t("onboarding.schedule.weekDays.monday") }}
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="monday.opening"
              :options="hours"
              placeholder="08:00"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="monday.closing"
              :options="hours"
              placeholder="17:00"
            />
          </div>
          <div class="col-12 md:col-6">
            <Button
              class="p-button-danger"
              type="button"
              icon="pi pi-trash"
              @click="resetHour('monday')"
            ></Button>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-2">
            {{ t("onboarding.schedule.weekDays.tuesday") }}
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="tuesday.opening"
              :options="hours"
              placeholder="08:00"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="tuesday.closing"
              :options="hours"
              placeholder="17:00"
            />
          </div>
          <div class="col-12 md:col-6">
            <Button
              class="p-button-danger"
              type="button"
              icon="pi pi-trash"
              @click="resetHour('tuesday')"
            ></Button>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-2">
            {{ t("onboarding.schedule.weekDays.wednesday") }}
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="wednesday.opening"
              :options="hours"
              placeholder="08:00"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="wednesday.closing"
              :options="hours"
              placeholder="17:00"
            />
          </div>
          <div class="col-12 md:col-6">
            <Button
              class="p-button-danger"
              type="button"
              icon="pi pi-trash"
              @click="resetHour('wednesday')"
            ></Button>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-2">
            {{ t("onboarding.schedule.weekDays.thursday") }}
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="thursday.opening"
              :options="hours"
              placeholder="08:00"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="thursday.closing"
              :options="hours"
              placeholder="17:00"
            />
          </div>
          <div class="col-12 md:col-6">
            <Button
              class="p-button-danger"
              type="button"
              icon="pi pi-trash"
              @click="resetHour('thursday')"
            ></Button>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-2">
            {{ t("onboarding.schedule.weekDays.friday") }}
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="friday.opening"
              :options="hours"
              placeholder="08:00"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="friday.closing"
              :options="hours"
              placeholder="17:00"
            />
          </div>
          <div class="col-12 md:col-6">
            <Button
              class="p-button-danger"
              type="button"
              icon="pi pi-trash"
              @click="resetHour('friday')"
            ></Button>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-2">
            {{ t("onboarding.schedule.weekDays.saturday") }}
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="saturday.opening"
              :options="hours"
              placeholder="08:00"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="saturday.closing"
              :options="hours"
              placeholder="17:00"
            />
          </div>
          <div class="col-12 md:col-6">
            <Button
              class="p-button-danger"
              type="button"
              icon="pi pi-trash"
              @click="resetHour('saturday')"
            ></Button>
          </div>
        </div>
        <div class="grid">
          <div class="col-12 md:col-2">
            {{ t("onboarding.schedule.weekDays.sunday") }}
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="sunday.opening"
              :options="hours"
              placeholder="08:00"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="sunday.closing"
              :options="hours"
              placeholder="17:00"
            />
          </div>
          <div class="col-12 md:col-6">
            <div class="flex">
              <Button
                class="p-button-danger"
                type="button"
                icon="pi pi-trash"
                @click="resetHour('sunday')"
              ></Button>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-end">
          <Button
            type="submit"
            :label="$t('form.buttons.save')"
            class="py-3 px-5 text-xl"
          />
        </div>
      </template>
    </Card>
  </form>
</template>
<style scoped></style>
