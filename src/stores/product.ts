import { defineStore } from "pinia";
// Service
import service from "@/http/services";
import { useBusinessStore } from "./business";
import { Steps } from "@/interfaces/business-steps";

export const useProductStore = defineStore({
  id: "product",
  state: () => ({
    products: [],
    total: 0,
    loading: false,
  }),
  getters: {},
  actions: {
    async getProducts(page = 0, perPage = 5) {
      const businessStore = useBusinessStore();
      try {
        this.loading = true;
        const res = await service.product.get(page, perPage);
        this.loading = false;
        this.products = res.data.data.products;
        this.total = res.data.data.total;
        businessStore.setStep(Steps.PRODUCTS);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
});
