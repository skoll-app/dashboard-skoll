import { SKOLL_MERCHANT, SKOLL_PARAMETER, SKOLL_SECURITY } from "@/constants";
import type HttpResponse from "@/interfaces/http-response";
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
  },
};

export default service;
