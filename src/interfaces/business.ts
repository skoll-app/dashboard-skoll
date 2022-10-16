export interface Business {
  id: number;
  apiKey: string;
  apiLogin: string;
  frontLogo: string;
  logo: string;
  status: boolean;
  name: string;
  dateCreate: string;
}

export interface BusinessBasicData extends Business {
  category: string;
  address: string;
  prefixCellPhone: string;
  phone: string;
  email: string;
  taxRegime: string;
  kindOfPerson: string;
  documentNumber: string;
  documentType: string;
  companyName: string;
  city: string;
  legalRepresentative: LegalRepresentative;
  allowedReservations: number;
  minimumValue: number;
}

export interface LegalRepresentative {
  documentNumber: string;
  documentType: string;
  lastName: string;
  firstName: string;
}
