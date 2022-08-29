import type {
  BusinessBasicData,
  LegalRepresentative,
} from "./../interfaces/business";
import { defineStore } from "pinia";

export const useBusinessStore = defineStore({
  id: "business",
  state: () => ({
    name: "",
    category: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    kindOfperson: "",
    documentType: "",
    documentNumber: "",
    companyName: "",
    taxation: "",
    legalRepresentative: {
      firstName: "",
      lastName: "",
      documentNumber: "",
      documentType: "",
    } as LegalRepresentative,
    exists: false,
  }),
  getters: {},
  actions: {
    setBasicData(business: Partial<BusinessBasicData>) {
      this.name = business.name || "";
      this.category = business.category || "";
      this.email = business.email || "";
      this.phone = business.phone || "";
      this.city = business.city || "";
      this.address = business.address || "";
      this.kindOfperson = business.kindOfPerson || "";
      this.documentType = business.documentType || "";
      this.documentNumber = business.documentNumber || "";
      this.companyName = business.companyName || "";
      this.taxation = business.taxRegime || "";
      this.legalRepresentative = {
        firstName: business.legalRepresentative?.firstName || "",
        lastName: business.legalRepresentative?.lastName || "",
        documentNumber: business.legalRepresentative?.documentNumber || "",
        documentType: business.legalRepresentative?.documentType || "",
      };
      this.exists = true;
    },
  },
});
