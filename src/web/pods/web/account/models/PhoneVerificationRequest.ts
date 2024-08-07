export type PhoneVerificationRequest = {
    phone: string;
    dial_code: string;
    signature?: string;
    code?: string;
    nif?: string;
}

export const phoneVerificationRequestInitialState: PhoneVerificationRequest = {
    phone: '',
    dial_code: ''
};