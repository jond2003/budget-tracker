export interface Payment {
  _id?: string;
  label: string;
  category_id: string;
  amount: number;
  payment_date: Date | number;
}
