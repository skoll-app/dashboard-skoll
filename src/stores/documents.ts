import { defineStore } from "pinia";
import service from "@/http/services";
import { BusinessSteps } from "@/enums/business-steps";
import { useBusinessStore } from "./business";

export const useDocumentsStore = defineStore({
  id: "documents",
  state: () => ({
    documents: {},
    requiredDocuments: [] as any,
  }),
  getters: {
    documentsAdded(state): string[] {
      return Object.keys(state.documents);
    },
    stepCompleted(): boolean {
      return this.documentsAdded.length === this.requiredDocuments.length;
    },
  },
  actions: {
    async getDocuments() {
      try {
        const response = await service.documents.get();
        this.documents = response.data.data;
        this.getRequiredDocuments();
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async getRequiredDocuments() {
      const businessStore = useBusinessStore();
      try {
        const response = await service.utils.parameters();
        this.requiredDocuments =
          response.data.data.documentsRequiredForMerchant;
        this.stepCompleted && businessStore.setStep(BusinessSteps.DOCUMENTS);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
});
