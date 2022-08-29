// Constants
import { SKOLL_MERCHANT, SKOLL_PARAMETER, SKOLL_SECURITY } from "@/constants";
// Interface
import type HttpResponse from "@/interfaces/http-response";
import type { BusinessBasicData } from "@/interfaces/business";
import type User from "@/interfaces/user";
import type { Bank } from "@/interfaces/business";
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
  },
};

const parseBusiness = (
  businessData: Partial<BusinessBasicData>
): Partial<BusinessBasicData> => {
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

export default service;
