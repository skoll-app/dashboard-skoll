import { SKOLL_PARAMETER } from "@/constants";
import type HttpResponse from "@/interfaces/http-response";
import { api } from "../axios";

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
};

export default service;
