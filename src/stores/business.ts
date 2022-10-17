import { defineStore } from "pinia";
import type {
  BusinessBasicData,
  LegalRepresentative,
} from "@/interfaces/business";
import { Steps } from "@/interfaces/business-steps";
import type Bank from "@/interfaces/bank";

type StepsCompleted =
  | Steps.BASIC_DATA
  | Steps.BANK
  | Steps.CUSTOMIZATION
  | Steps.DOCUMENTS
  | Steps.PRODUCTS;

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
    stepsCompleted: [] as Array<StepsCompleted>,
    allowedReservations: 1,
    minimumValue: 1000,
    cover: "",
  }),
  getters: {
    getFirstBank(): Bank {
      return this.banks[0];
    },
    basicStepCompleted(): boolean {
      return this.stepsCompleted.includes(Steps.BASIC_DATA);
    },
    customizationStepCompleted(): boolean {
      return this.stepsCompleted.includes(Steps.CUSTOMIZATION);
    },
    bankStepCompleted(): boolean {
      return this.stepsCompleted.includes(Steps.BANK);
    },
    documentsStepCompleted(): boolean {
      return this.stepsCompleted.includes(Steps.DOCUMENTS);
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
      this.setStep(Steps.BASIC_DATA);
    },
    setBank(bank: Bank) {
      const index = this.banks.findIndex((item) => item.id === bank.id);
      if (index < 0) {
        this.banks.push(bank);
      }
      this.setStep(Steps.BANK);
    },
    setStep(step: StepsCompleted) {
      this.stepsCompleted.push(step);
    },
  },
});
