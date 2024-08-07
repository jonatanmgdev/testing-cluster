import { IPagination } from '@/lib/interfaces/IPagination';


export interface Invoice {
  code: string;
  invoice_code: string;
  description: string;
  invoice_date: string;
  invoice_start_date: Date;
  invoice_end_date: Date;
}

export const companyInvoiceInitialState: Invoice = {
  code: "",
  invoice_code: "",
  description: "",
  invoice_date: "",
  invoice_start_date: new Date(),
  invoice_end_date: new Date(),
};

export const paginatedInvoicesInitialState: IPagination<Invoice> = {
  content: [],
  page: 0,
  pageSize: 0,
  totalElements: 0,
  totalPages: 0,
  isLast: false,
  empty: true,
};
