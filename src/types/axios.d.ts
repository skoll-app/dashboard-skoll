import { AxiosInstance } from "axios";
// Works correctly
export {};

declare module "vue" {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
    $apiAuth: AxiosInstance;
  }
}
