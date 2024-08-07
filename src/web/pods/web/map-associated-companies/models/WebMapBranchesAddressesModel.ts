type address = {
    official_hours: string,
    observation: string,
    landline_phone_1: string,
    landline_phone_2: string,
    latitude: number,
    longitude: number,
    postal_code: string,
    locality: string,
    province: string,
    mobile_phone_1: string,
    mobile_phone_2: string,
    address: string
} 
export interface WebMapBranchesAddressesModel {
    associate_name: string,
    addresses: address[]
}