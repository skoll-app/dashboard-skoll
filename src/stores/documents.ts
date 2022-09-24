import { defineStore } from "pinia";
import service from "@/http/services";

export const useDocumentsStore = defineStore({
  id: "documents",
  state: () => ({
    documents: {},
  }),
  getters: {
    documentsAdded(state): string[] {
      return Object.keys(state.documents);
    },
  },
  actions: {
    async getDocuments() {
      try {
        const response = await service.documents.get();
        this.documents = response.data.data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
});
