import { StringSchema } from "yup";

declare module "yup" {
  interface StringSchema {
    onlyLetters(msg?: string): StringSchema;
  }
}
