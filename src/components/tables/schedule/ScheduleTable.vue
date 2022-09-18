<script lang="ts" setup>
// Vue
import { computed, reactive, ref } from "vue";
// Components
import SKSelect from "@/components/ux/SKSelect.vue";
import ScheduleRowButtons from "./ScheduleRowButtons.vue";
// Utils
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";
import { useToast } from "primevue/usetoast";
// Constants
import { SCHEDULE_OPTIONS } from "@/constants";
// Store
import { useScheduleStore } from "@/stores/schedule";

const scheduleStore = useScheduleStore();
type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

const hours = ref(SCHEDULE_OPTIONS);
const { t } = useI18n();
const scheduleValues = ref({
  monday: scheduleStore.monday,
  tuesday: scheduleStore.tuesday,
  wednesday: scheduleStore.wednesday,
  thursday: scheduleStore.thursday,
  friday: scheduleStore.friday,
  saturday: scheduleStore.saturday,
  sunday: scheduleStore.sunday,
});
const toast = useToast();

const scheduleFormRef = reactive(
  useForm({
    initialValues: scheduleValues,
  })
);

// Computed
const mondayEnabled = computed(() => {
  return scheduleStore.mondayEnabled;
});
const tuesdayEnabled = computed(() => {
  return scheduleStore.tuesdayEnabled;
});
const wednesdayEnabled = computed(() => {
  return scheduleStore.wednesdayEnabled;
});
const thursdayEnabled = computed(() => {
  return scheduleStore.thursdayEnabled;
});
const fridayEnabled = computed(() => {
  return scheduleStore.fridayEnabled;
});
const saturdayEnabled = computed(() => {
  return scheduleStore.saturdayEnabled;
});
const sundayEnabled = computed(() => {
  return scheduleStore.sundayEnabled;
});

// Methods
const getHours = (day: Day): number => {
  return scheduleStore.getHours(day);
};

const resetHour = (day: Day) => {
  if (scheduleStore.activeDays.length <= 1) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t("onboarding.schedule.messages.error.minimumDays"),
      life: 5000,
    });
    return;
  }
  scheduleFormRef.setFieldValue(day, {
    opening: "00:00",
    closing: "00:00",
  });
  scheduleStore.resetHours(day);
  removeDayFromActiveList(day);
};

const saveSchedule = scheduleFormRef.handleSubmit(async () => {
  try {
    scheduleStore.save();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t("onboarding.schedule.messages.error.couldntSave"),
      life: 5000,
    });
  }
});

const addToEditList = (day: Day) => {
  scheduleStore.addToEditList(day);
};

const removeFromEditList = (day: Day) => {
  scheduleStore.removeFromEditList(day);
};

const addDayToActiveList = (day: Day) => {
  const currentDay = scheduleFormRef.values[day];
  if (currentDay.opening === currentDay.closing) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: t("onboarding.schedule.messages.error.differentHours"),
      life: 10000,
    });
    removeDayFromActiveList(day);
    removeFromEditList(day);
    return;
  }
  scheduleStore.addDayToActiveList(day, currentDay.opening, currentDay.closing);
  removeFromEditList(day);
};

const removeDayFromActiveList = (day: Day) => {
  scheduleStore.removeDayFromActiveList(day);
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
          <ScheduleRowButtons
            day="monday"
            :totalHours="getHours('monday')"
            @allow-edit="addToEditList"
            @reset-hour="resetHour"
            @save-hour="addDayToActiveList"
          />
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
          <ScheduleRowButtons
            day="tuesday"
            :totalHours="getHours('tuesday')"
            @allow-edit="addToEditList"
            @reset-hour="resetHour"
            @save-hour="addDayToActiveList"
          />
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
          <ScheduleRowButtons
            day="wednesday"
            :totalHours="getHours('wednesday')"
            @allow-edit="addToEditList"
            @reset-hour="resetHour"
            @save-hour="addDayToActiveList"
          />
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
          <ScheduleRowButtons
            day="thursday"
            :totalHours="getHours('thursday')"
            @allow-edit="addToEditList"
            @reset-hour="resetHour"
            @save-hour="addDayToActiveList"
          />
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
          <ScheduleRowButtons
            day="friday"
            :totalHours="getHours('friday')"
            @allow-edit="addToEditList"
            @reset-hour="resetHour"
            @save-hour="addDayToActiveList"
          />
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
          <ScheduleRowButtons
            day="saturday"
            :totalHours="getHours('saturday')"
            @allow-edit="addToEditList"
            @reset-hour="resetHour"
            @save-hour="addDayToActiveList"
          />
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
          <ScheduleRowButtons
            day="sunday"
            :totalHours="getHours('sunday')"
            @allow-edit="addToEditList"
            @reset-hour="resetHour"
            @save-hour="addDayToActiveList"
          />
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
