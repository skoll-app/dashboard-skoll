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
    page: 0,
    perPage: 5,
    loading: false,
  }),
  getters: {},
  actions: {
    async getProducts() {
      const businessStore = useBusinessStore();

      try {
        this.loading = true;
        const res = await service.product.get(this.page, this.perPage);
        this.loading = false;
        this.products = res.data.data.products;
        this.total = res.data.data.total;
        this.page += 1;
        businessStore.setStep(Steps.PRODUCTS);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
});
