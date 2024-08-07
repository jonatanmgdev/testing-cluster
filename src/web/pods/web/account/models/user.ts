export interface UserSettings {
	user_id: number;
	market_code: string;
	language_code: string;
}

export interface User {
	auth_type: string;
	birthdate: string | Date;
	dial_code: string;
	email: string;
	first_surname: string;
	user_id: number;
	is_allowed_advertising: boolean;
	is_enabled: boolean;
	is_incomplete_account: boolean;
	is_linked_card: boolean;
	is_phone_verified: boolean;
	language_code: string;
	name: string;
	phone: string;
	refresh_token: string;
	token: string;
	second_surname: string;
	settings: UserSettings;
}

export interface AccountUserData extends Omit<User, "user_id" | "language_code" |  "auth_type" | ""> {
}

export const userSettingsInitialState: UserSettings = {
	user_id: 0,
	market_code: "",
	language_code: ""
}

export const accountUserDataInitialState: AccountUserData = {
	email: "",
	name: "",
	first_surname: "",
	second_surname: "",
	phone: "",
	dial_code: "",
	refresh_token: "",
	token: "",
	is_allowed_advertising: false,
	is_phone_verified: false,
	is_linked_card: false,
	birthdate: "",
	is_enabled: false,
	is_incomplete_account: false,
	settings: userSettingsInitialState
};

export interface AccountCommunicationPreferencesData {
	user_id?: string;
	crm_id: string;
	privacy_accepted: boolean;
	publicity_accepted: boolean;
	publicity_emailing: boolean;
	publicity_sms: boolean;
	publicity_mailing: boolean;
	publicity_phone: boolean;
	tags?: object;
}

export const accountCommunicationPreferencesInitialState: AccountCommunicationPreferencesData = {
	crm_id: "",
	privacy_accepted: false,
	publicity_accepted: false,
	publicity_emailing: false,
	publicity_sms: false,
	publicity_mailing: false,
	publicity_phone: false
};