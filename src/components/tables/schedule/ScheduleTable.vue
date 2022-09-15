<script lang="ts" setup>
// Vue
import { computed, reactive, ref } from "vue";
// Components
import SKSelect from "@/components/ux/SKSelect.vue";
// Utils
import moment from "moment";
import { useI18n } from "vue-i18n";
// Constants
import { SCHEDULE_OPTIONS } from "@/constants";
import { useForm } from "vee-validate";

type Days =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

const hours = ref(SCHEDULE_OPTIONS);
const { t } = useI18n();
const scheduleValues = reactive({
  monday: {
    opening: "09:00",
    closing: "18:00",
  },
  tuesday: {
    opening: "09:00",
    closing: "18:00",
  },
  wednesday: {
    opening: "09:00",
    closing: "18:00",
  },
  thursday: {
    opening: "09:00",
    closing: "18:00",
  },
  friday: {
    opening: "09:00",
    closing: "18:00",
  },
  saturday: {
    opening: "09:00",
    closing: "18:00",
  },
  sunday: {
    opening: "09:00",
    closing: "18:00",
  },
});

const scheduleFormRef = reactive(
  useForm({
    initialValues: scheduleValues,
  })
);
const editableDaysList = reactive<Days[]>([]);

// Computed
const mondayEnabled = computed(() => {
  return editableDaysList.includes("monday");
});
const tuesdayEnabled = computed(() => {
  return editableDaysList.includes("tuesday");
});
const wednesdayEnabled = computed(() => {
  return editableDaysList.includes("wednesday");
});
const thursdayEnabled = computed(() => {
  return editableDaysList.includes("thursday");
});
const fridayEnabled = computed(() => {
  return editableDaysList.includes("friday");
});
const saturdayEnabled = computed(() => {
  return editableDaysList.includes("saturday");
});
const sundayEnabled = computed(() => {
  return editableDaysList.includes("sunday");
});

// Methods
const getHours = (day: Days) => {
  return getHoursDiff(
    scheduleFormRef.values[day].opening,
    scheduleFormRef.values[day].closing
  );
};

const getHoursDiff = (start: string, end: string) => {
  const startTime = moment(start, "hh:mm");
  const endTime = moment(end, "hh:mm");
  return endTime.diff(startTime, "hours");
};

const resetHour = (day: Days) => {
  scheduleFormRef.setFieldValue(day, {
    opening: "00:00",
    closing: "00:00",
  });
};

const saveSchedule = scheduleFormRef.handleSubmit(async (values) => {
  console.log(values);
});

const addToEditList = (day: Days) => {
  editableDaysList.push(day);
};
</script>

<template>
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
              :disabled="!mondayEnabled"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="monday.closing"
              :options="hours"
              placeholder="17:00"
              :disabled="!mondayEnabled"
            />
          </div>
          <div class="col-12 md:col-6">
            <div class="flex align-items-center">
              <Button
                class="p-button-info mr-2"
                type="button"
                icon="pi pi-pencil"
                @click="addToEditList('monday')"
              ></Button>
              <Button
                class="p-button-danger mr-2"
                type="button"
                icon="pi pi-trash"
                @click="resetHour('monday')"
              ></Button>
              <div>
                <Tag
                  :value="getHours('monday') + ' Horas'"
                  icon="pi pi-clock"
                  rounded
                ></Tag>
              </div>
            </div>
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
              :disabled="!tuesdayEnabled"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="tuesday.closing"
              :options="hours"
              placeholder="17:00"
              :disabled="!tuesdayEnabled"
            />
          </div>
          <div class="col-12 md:col-6">
            <div class="flex align-items-center">
              <Button
                class="p-button-info mr-2"
                type="button"
                icon="pi pi-pencil"
                @click="addToEditList('tuesday')"
              ></Button>
              <Button
                class="p-button-danger mr-2"
                type="button"
                icon="pi pi-trash"
                @click="resetHour('tuesday')"
              ></Button>
              <div>
                <Tag
                  :value="getHours('tuesday') + ' Horas'"
                  icon="pi pi-clock"
                  rounded
                ></Tag>
              </div>
            </div>
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
              :disabled="!wednesdayEnabled"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="wednesday.closing"
              :options="hours"
              placeholder="17:00"
              :disabled="!wednesdayEnabled"
            />
          </div>
          <div class="col-12 md:col-6">
            <div class="flex align-items-center">
              <Button
                class="p-button-info mr-2"
                type="button"
                icon="pi pi-pencil"
                @click="addToEditList('wednesday')"
              ></Button>
              <Button
                class="p-button-danger mr-2"
                type="button"
                icon="pi pi-trash"
                @click="resetHour('wednesday')"
              ></Button>
              <div>
                <Tag
                  :value="getHours('wednesday') + ' Horas'"
                  icon="pi pi-clock"
                  rounded
                ></Tag>
              </div>
            </div>
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
              :disabled="!thursdayEnabled"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="thursday.closing"
              :options="hours"
              placeholder="17:00"
              :disabled="!thursdayEnabled"
            />
          </div>
          <div class="col-12 md:col-6">
            <div class="flex align-items-center">
              <Button
                class="p-button-info mr-2"
                type="button"
                icon="pi pi-pencil"
                @click="addToEditList('thursday')"
              ></Button>
              <Button
                class="p-button-danger mr-2"
                type="button"
                icon="pi pi-trash"
                @click="resetHour('thursday')"
              ></Button>
              <div>
                <Tag
                  :value="getHours('thursday') + ' Horas'"
                  icon="pi pi-clock"
                  rounded
                ></Tag>
              </div>
            </div>
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
              :disabled="!fridayEnabled"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="friday.closing"
              :options="hours"
              placeholder="17:00"
              :disabled="!fridayEnabled"
            />
          </div>
          <div class="col-12 md:col-6">
            <div class="flex align-items-center">
              <Button
                class="p-button-info mr-2"
                type="button"
                icon="pi pi-pencil"
                @click="addToEditList('friday')"
              ></Button>
              <Button
                class="p-button-danger mr-2"
                type="button"
                icon="pi pi-trash"
                @click="resetHour('friday')"
              ></Button>
              <div>
                <Tag
                  :value="getHours('friday') + ' Horas'"
                  icon="pi pi-clock"
                  rounded
                ></Tag>
              </div>
            </div>
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
              :disabled="!saturdayEnabled"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="saturday.closing"
              :options="hours"
              placeholder="17:00"
              :disabled="!saturdayEnabled"
            />
          </div>
          <div class="col-12 md:col-6">
            <div class="flex align-items-center">
              <Button
                class="p-button-info mr-2"
                type="button"
                icon="pi pi-pencil"
                @click="addToEditList('saturday')"
              ></Button>
              <Button
                class="p-button-danger mr-2"
                type="button"
                icon="pi pi-trash"
                @click="resetHour('saturday')"
              ></Button>
              <div>
                <Tag
                  :value="getHours('saturday') + ' Horas'"
                  icon="pi pi-clock"
                  rounded
                ></Tag>
              </div>
            </div>
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
              :disabled="!sundayEnabled"
            />
          </div>
          <div class="col-6 md:col-2">
            <SKSelect
              name="sunday.closing"
              :options="hours"
              placeholder="17:00"
              :disabled="!sundayEnabled"
            />
          </div>
          <div class="col-12 md:col-6">
            <div class="flex align-items-center">
              <Button
                class="p-button-info mr-2"
                type="button"
                icon="pi pi-pencil"
                @click="addToEditList('sunday')"
              ></Button>
              <Button
                class="p-button-danger mr-2"
                type="button"
                icon="pi pi-trash"
                @click="resetHour('sunday')"
              ></Button>
              <div>
                <Tag
                  :value="getHours('sunday') + ' Horas'"
                  icon="pi pi-clock"
                  rounded
                ></Tag>
              </div>
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
