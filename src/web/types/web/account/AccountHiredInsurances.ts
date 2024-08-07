export interface AccountHiredInsurance {
  policy_number: string;
  insurance_type: string;
  insurance_premium: number;
  emission_date: string;
  start_date: string;
  insurance_number: number;
  type_product: string;
  name: string;
}

export const accountHiredInsuranceInitialState: AccountHiredInsurance = {
  policy_number: "",
  insurance_type: "",
  insurance_premium: 0,
  emission_date: "",
  start_date: "",
  insurance_number: 0,
  type_product: "",
  name: "",
};
