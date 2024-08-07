export interface WebMapCompanyModel {
    code:                        number;
    name:                        string;
    logo:                        string;
    about:                       string;
    category_id:                 number;
    category_name:               string;
    total_branches:              number;
    financing:                   boolean;
    general_discount:            number;
    current_discount:            number;
    current_discount_start_date?: string;
    current_discount_end_date?:   string;
}