import { defineStore } from "pinia";
import type {
  BusinessBasicData,
  LegalRepresentative,
} from "@/interfaces/business";
import { BusinessSteps } from "@/enums/business-steps";
import type Bank from "@/interfaces/bank";

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
    banks: [] as Bank[],
    stepsCompleted: [] as Array<BusinessSteps>,
    allowedReservations: 1,
    minimumValue: 1000,
    cover: "",
    logo: "",
  }),
  getters: {
    getFirstBank(): Bank {
      return this.banks[0];
    },
    basicStepCompleted(): boolean {
      return this.stepsCompleted.includes(BusinessSteps.BASIC_DATA);
    },
    customizationStepCompleted(): boolean {
      return this.stepsCompleted.includes(BusinessSteps.CUSTOMIZATION);
    },
    bankStepCompleted(): boolean {
      return this.stepsCompleted.includes(BusinessSteps.BANK);
    },
    documentsStepCompleted(): boolean {
      return this.stepsCompleted.includes(BusinessSteps.DOCUMENTS);
    },
    photoAndCoverCompleted(): boolean {
      return this.cover !== "" && this.logo !== "";
    },
  },
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
      this.allowedReservations = business.allowedReservations || 1;
      this.minimumValue = business.minimumValue || 1000;
      this.cover = business.frontLogo || "";
      this.logo = business.logo || "";
      this.setStep(BusinessSteps.BASIC_DATA);
    },
    setBank(bank: Bank) {
      const index = this.banks.findIndex((item) => item.id === bank.id);
      if (index < 0) {
        this.banks.push(bank);
      }
      this.setStep(BusinessSteps.BANK);
    },
    setStep(step: BusinessSteps) {
      this.stepsCompleted.push(step);
    },
  },
});
