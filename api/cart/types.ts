export interface Service {
  id: string;
  name: string;
  description: string;
  benefit: string | null;
  compotition: string | null;
  contraIndication: string | null;
  indicationOfUse: string | null;
  postTreatmentCare: string | null;
  securityAndCertification: string | null;

  imageUrl: string;
  duration: number;
  durationOfResults: string | null;

  discountPercent: number;
  discountValue: string;
  normalPrice: string;
  finalPrice: string;

  isActive: boolean;
  locationId: string;

  createdAt: string;
  updatedAt: string;
}

export interface ServiceCartItem {
  id: string;
  customerId: string;
  serviceId: string;
  qty: number;
  isSelected: boolean;
  createdAt: string;
  updatedAt: string;
  service: Service;
}

export interface ProductImage {
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  attention: string;
  compotition: string;
  function: string;
  rulesOfUse: string;
  dose: string;
  packaging: string;
  sku: string;
  price: string;
  discountPercent: string;
  isActive: boolean;
  isPrescriptionRequired: boolean;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
}

export interface ProductCartItem {
  id: string;
  customerId: string;
  productId: string;
  qty: number;
  isSelected: boolean;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
