import { defineStore } from "pinia";
// Utils
import moment from "moment";

type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

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
    activeDays: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ] as Day[],
  }),
  actions: {
    addDayToActiveList(day: Day, start: string, end: string): void {
      const index = this.activeDays.findIndex((item) => item === day);
      if (index < 0) {
        this.activeDays.push(day);
        this.setHours(day, start, end);
      }
    },
    removeDayFromActiveList(day: Day) {
      const index = this.activeDays.findIndex((item) => item === day);
      if (index > -1) {
        this.activeDays.splice(index, 1);
      }
    },
    setHours(day: Day, start: string, end: string) {
      this[day].opening = start;
      this[day].closing = end;
    },
    resetHours(day: Day) {
      this[day].opening = "00:00";
      this[day].closing = "00:00";
    },
    getHours(day: Day): number {
      return this.getHoursDiff(this[day].opening, this[day].closing);
    },
    getHoursDiff(start: string, end: string): number {
      const startTime = moment(start, "hh:mm");
      const endTime = moment(end, "hh:mm");
      let diff = endTime.diff(startTime, "hours");
      if (diff < 0) {
        diff = diff + 24;
      }
      return diff;
    },
  },
});
