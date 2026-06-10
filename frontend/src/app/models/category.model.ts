export interface Category {
  _id?: string;
  user_id?: string;
  name: string;
  colour?: string;
  primary_colour?: string;
  secondary_colour?: string;
  payment_type: 'income' | 'transaction';
}
