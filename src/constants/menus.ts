import { BusinessSteps } from "@/enums/business-steps";

export const ONBOARDING_MENU = [
  {
    label: "onboarding.steps.basicData",
    to: "/onboarding/basic-data",
    icon: "pi-building",
    step: BusinessSteps.BASIC_DATA,
  },
  {
    label: "onboarding.steps.customization",
    to: "/onboarding/customization",
    icon: "pi-cog",
    step: BusinessSteps.CUSTOMIZATION,
  },
  {
    label: "onboarding.steps.products",
    to: "/onboarding/products",
    icon: "pi-database",
    step: BusinessSteps.PRODUCTS,
  },
  {
    label: "onboarding.steps.bankAccount",
    to: "/onboarding/bank",
    icon: "pi-dollar",
    step: BusinessSteps.BANK,
  },
  {
    label: "onboarding.steps.documents",
    to: "/onboarding/documents",
    icon: "pi-file",
    step: BusinessSteps.DOCUMENTS,
  },
  {
    label: "onboarding.steps.summary",
    to: "/onboarding/summary",
    icon: "pi-list",
    step: BusinessSteps.SUMMARY,
  },
];

export const DASHBOARD_MENU = [
  {
    label: "onboarding.steps.basicData",
    to: "/dashboard",
    icon: "pi-building",
  },
];
