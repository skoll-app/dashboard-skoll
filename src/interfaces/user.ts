export default interface User {
  about?: string;
  address?: Address;
  amountAvailable?: number;
  archivementsAvailable?: Array<any>;
  cards?: Array<any>;
  cellPhone?: string;
  cityName?: string;
  cityId?: string;
  defaultCard?: null;
  email: string;
  firstName: string;
  gender: string;
  identification?: Identification;
  interesGender: string;
  isVerify?: boolean;
  lastName: string;
  logo?: string;
  totalArchievements?: number;
  totalSusbscriberMerchant?: number;
  totalpublications?: number;
  age?: number;
  userName?: string;
  urlFacebook?: string;
  urlInstagram?: string;
  urlOnlyfans?: string;
  urlTikTok?: string;
}

export interface Identification {
  type: string;
  number: string;
}

export interface Address {
  id?: string;
  zip_code?: string;
  street_name?: string;
  street_number?: string;
}
