export interface Business {
  id: number;
  apiKey: string;
  apiLogin: string;
  frontLogo?: string;
  logo?: string;
  status: boolean;
  name: string;
  dateCreate: string;
}

export interface BusinessBasicData {
  name: string;
  category: string;
  address: string;
  prefixCellPhone: string;
  cellPhone: string;
  email: string;
  taxRegime: string;
  kindOfPerson: string;
  documentNumber: string;
  documentType: string;
  bussinesName: string;
  cityId: string;
  legalRepresentative: LegalRepresentative;
}

export interface LegalRepresentative {
  documentNumber: string;
  documentType: string;
  lastName: string;
  firstName: string;
}
