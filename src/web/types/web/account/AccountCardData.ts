export interface AccountCardData {
  pan_md5: string;
  account: string;
  via: string;
  address: string;
  province: string;
  postal_code: string;
  pan14: string;
  pan14_md5: string;
  external_code: string;
}

export const accountCardDataInitialState: AccountCardData = {
  pan_md5: "",
  account: "",
  via: "",
  address: "",
  province: "",
  postal_code: "",
  pan14: "",
  pan14_md5: "",
  external_code: "",
};
