export interface Budget {
  _id?: string;
  category_id: string;
  name: string;
  start_date: Date;
  end_date?: Date | null;
  amount: number;
};
