export interface Supplier {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  commands: Command[];
  lastCommandDate: Date | null;
}

export interface Command {
  id: string;
  date: Date;
  amount: number;
  status: string;
  description: string;
}
