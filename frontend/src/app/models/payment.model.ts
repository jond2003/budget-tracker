export interface Payment {
  label: string;
  category_id: string;
  amount: number;
  payment_date: Date | number;
}
