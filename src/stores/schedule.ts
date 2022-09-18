import { defineStore } from "pinia";

export const useScheduleStore = defineStore({
  id: "schedule",
  state: () => ({
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
  }),
});
