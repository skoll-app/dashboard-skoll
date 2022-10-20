// Constants
import { SKOLL_MERCHANT, SKOLL_PARAMETER, SKOLL_SECURITY } from "@/constants";
// Interface
import type HttpResponse from "@/interfaces/http-response";
import type { BusinessBasicData } from "@/interfaces/business";
import type User from "@/interfaces/user";
import type Bank from "@/interfaces/bank";
import type Product from "@/interfaces/product";
// Axios
import { api, apiAuth } from "../axios";

const service = {
  utils: {
    getDepartments(): Promise<HttpResponse> {
      return new Promise((resolve, reject) => {
        try {
          const response = api.get(`${SKOLL_PARAMETER}/departments/`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    parameters(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = api.get(`${SKOLL_PARAMETER}/parameter/`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  seller: {
    signUp(user: Partial<User>, password: string): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = api.post(`${SKOLL_MERCHANT}/seller/create`, {
            ...user,
            password,
            prefixCellPhone: "+57",
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    login({
      user,
      password,
    }: {
      user: string;
      password: string;
    }): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = api.post(`${SKOLL_SECURITY}/oauth/seller/login`, {
            username: user,
            password,
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    associatedBusinesses(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.get(`${SKOLL_MERCHANT}/merchant/associated`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    uploadCoverOrLogo(cover: string, logo: string): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.put(`${SKOLL_MERCHANT}/merchant/logo`, {
            frontLogo: cover,
            logo,
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  business: {
    login(apiKey: string, apiLogin: string): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.post(`${SKOLL_MERCHANT}/merchant/login`, {
            apiKey,
            apiLogin,
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    detail(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.get(`${SKOLL_MERCHANT}/merchant/`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    signUp(businessData: Partial<BusinessBasicData>): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.post(
            `${SKOLL_MERCHANT}/merchant/`,
            parseBusiness(businessData)
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    createBankAccount(bank: Bank): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.post(
            `${SKOLL_MERCHANT}/bank/account`,
            parseBank(bank)
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    getBank(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.get(`${SKOLL_MERCHANT}/bank/account`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    update(businessData: Partial<BusinessBasicData>): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.put(
            `${SKOLL_MERCHANT}/merchant/`,
            parseBusiness(businessData)
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  product: {
    create(product: Product): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.post(
            `${SKOLL_MERCHANT}/product/`,
            parseProduct(product)
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    get(page = 0, perPage = 5): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.post(
            `${SKOLL_MERCHANT}/product/associated`,
            {
              index: page,
              limit: perPage,
              name: "",
            }
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    delete(id: string): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.delete(`${SKOLL_MERCHANT}/product/${id}`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  schedule: {
    save(schedule: any): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.post(`${SKOLL_MERCHANT}/horary/`, {
            horary: schedule,
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    get(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.get(`${SKOLL_MERCHANT}/horary/`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  multimedia: {
    upload(formdata: FormData): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const headers = { "Content-Type": "multipart/form-data" };
          const response = apiAuth.post(`/multimedia/posts`, formdata, {
            headers,
          });
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  documents: {
    get(): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.get(`${SKOLL_MERCHANT}/legal/document`);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
    save(documents: any): Promise<any> {
      return new Promise((resolve, reject) => {
        try {
          const response = apiAuth.post(
            `${SKOLL_MERCHANT}/legal/document`,
            documents
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};

const parseBusiness = (
  businessData: Partial<BusinessBasicData>
): Partial<BusinessBasicData> => {
  console.log(businessData);
  const business = {
    address: businessData.address,
    bussinesName: businessData.companyName,
    cellPhone: businessData.phone,
    cityId: businessData.city,
    documentNumber: businessData.documentNumber,
    documentType: businessData.documentType,
    email: businessData.email,
    kindOfPerson: businessData.kindOfPerson,
    legalRepresentative: businessData.legalRepresentative,
    category: businessData.category,
    name: businessData.name,
    taxRegime: businessData.taxRegime,
    numberOfReservation: businessData.allowedReservations,
    minimumReserve: businessData.minimumValue,
  };
  return business;
};

const parseBank = (bankData: Bank) => {
  const bank = {
    account: bankData.account,
    bank: bankData.bank,
    documentNumber: bankData.document,
    documentType: bankData.documentType,
    email: bankData.email,
    fullName: bankData.fullname,
    phone: bankData.phone,
    type: bankData.type,
  };
  return bank;
};

const parseProduct = (product: Product) => {
  const p = {
    ageRestriction: product.ageRestriction,
    amount: product.amount,
    price: product.price,
    brandId: product.brandId,
    description: product.description,
    name: product.name,
    productCategory: product.category,
  };
  return p;
};

export default service;
