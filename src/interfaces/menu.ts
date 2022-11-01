import type { BusinessSteps } from "@/enums/business-steps";

export default interface Menu {
  label: string;
  to: string;
  icon: string;
  step: BusinessSteps;
}
