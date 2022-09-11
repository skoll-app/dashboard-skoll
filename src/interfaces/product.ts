export default interface Product {
  name: string;
  description: string;
  category: string;
  brandId: number;
  amount: number;
  ageRestriction: boolean;
  stock: number;
  status: boolean;
  serialNumber: string;
  visibility: boolean;
}