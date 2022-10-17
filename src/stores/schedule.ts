import { defineStore } from "pinia";
// Utils
import moment from "moment";
// Service
import service from "@/http/services";
// Enums
import type { Day } from "@/enums/day";
// Interfaces
import type ScheduleDay from "@/interfaces/schedule-day";

export const useScheduleStore = defineStore({
  id: "schedule",
  state: () => ({
    monday: {} as ScheduleDay,
    tuesday: {} as ScheduleDay,
    wednesday: {} as ScheduleDay,
    thursday: {} as ScheduleDay,
    friday: {} as ScheduleDay,
    saturday: {} as ScheduleDay,
    sunday: {} as ScheduleDay,
    activeDays: [] as Day[],
    editableDaysList: [] as Day[],
    completed: false,
  }),
  actions: {
    addDayToActiveList(day: Day, start: string, end: string): void {
      const index = this.activeDays.findIndex((item) => item === day);
      if (index < 0) {
        this.activeDays.push(day);
      }
      this.setHours(day, start, end);
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
      this[day] = {};
    },
    addToEditList(day: Day) {
      this.editableDaysList.push(day);
    },
    removeFromEditList(day: Day) {
      const index = this.editableDaysList.findIndex((item) => item === day);
      this.editableDaysList.splice(index, 1);
    },
    async save() {
      try {
        const schedule: any = {
          monday: {} as ScheduleDay,
          tuesday: {} as ScheduleDay,
          wednesday: {} as ScheduleDay,
          thursday: {} as ScheduleDay,
          friday: {} as ScheduleDay,
          saturday: {} as ScheduleDay,
          sunday: {} as ScheduleDay,
        };
        for (let index = 0; index < this.activeDays.length; index++) {
          const day = this.activeDays[index];
          schedule[day] = {
            startDate: this[day].opening,
            endDate: this[day].closing,
          };
        }
        console.log(schedule);
        await service.schedule.save(schedule);
        this.getSchedule();
      } catch (error: any) {
        throw Error(error);
      }
    },
    async getSchedule() {
      try {
        const res = await service.schedule.get();
        const days: any = res.data.data;
        const daysKeys = Object.keys(days);
        if (daysKeys.length > 0) this.completed = true;
        for (let index = 0; index < daysKeys.length; index++) {
          const day: Day = daysKeys[index] as Day;
          if (days[day].startDate === "00:00" && days[day].endDate === "00:00")
            return;
          this.setHours(day, days[day].startDate, days[day].endDate);
          this.activeDays.push(day);
        }
      } catch (error: any) {
        throw Error(error);
      }
    },
  },
  getters: {
    mondayEnabled(): boolean {
      return this.editableDaysList.includes("monday");
    },
    tuesdayEnabled(): boolean {
      return this.editableDaysList.includes("tuesday");
    },
    wednesdayEnabled(): boolean {
      return this.editableDaysList.includes("wednesday");
    },
    thursdayEnabled(): boolean {
      return this.editableDaysList.includes("thursday");
    },
    fridayEnabled(): boolean {
      return this.editableDaysList.includes("friday");
    },
    saturdayEnabled(): boolean {
      return this.editableDaysList.includes("saturday");
    },
    sundayEnabled(): boolean {
      return this.editableDaysList.includes("sunday");
    },
    getHours: (state) => {
      return (day: Day) => {
        const startTime = moment(state[day].opening, "hh:mm");
        const endTime = moment(state[day].closing, "hh:mm");
        let diff = endTime.diff(startTime, "hours");
        if (diff < 0) {
          diff = diff + 24;
        }
        return diff;
      };
    },
    allowSave(): boolean {
      return this.activeDays.length > 0;
    },
    stepCompleted: (state) => {
      return state.completed;
    },
  },
});
