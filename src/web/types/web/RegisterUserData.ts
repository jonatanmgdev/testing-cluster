export type RegisterUserData = {
  name: string;
  first_surname: string;
  second_surname: string;
  email: string;
  phone: string;
  dial_code: string;
  sms_code: string;
  phone_Verified?: boolean;
  password: string;
  birthdate: string;
  auth_type: string;
  is_allowed_ads: boolean;
  promotional_code?: string;
};
