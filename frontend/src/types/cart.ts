export interface ICart {
  id: number;
  customer_id: null | number;
  cartObj: string;
  is_active: boolean;
}

export interface ILocalCart {
  cartObj: { [key: string]: number };
}
