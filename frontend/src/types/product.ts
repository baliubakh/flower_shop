export interface IProduct {
  id: number;
  user_id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  photos: string[];
  is_active: boolean;
}

export interface IProductWithAmount extends IProduct {
  amount: number;
}

export interface IProductBody {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  photos: any;
}

export interface IEditProductBody {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  photos: string[];
  newPhotos: any;
}
export interface IEditProductForm {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  photos: { value: string }[];
  newPhotos: any;
}

export interface IUpdateProduct {
  body: FormData;
  id: string;
}

export interface ICreateProduct extends IProductBody {}
