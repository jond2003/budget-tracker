export interface Category {
  _id?: string;
  user_id?: string;
  name: string;
  colour: string;
  payment_type: 'income' | 'transaction';
}
