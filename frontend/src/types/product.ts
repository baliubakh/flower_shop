export interface IProduct {
  id: number;
  user_id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  photo: string;
  is_active: boolean;
}

export interface IProductBody {
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
}

export interface IUpdateProduct {
  body: IProductBody;
  id: string;
}

export interface ICreateProduct extends IProductBody {}
