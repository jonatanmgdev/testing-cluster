import { WebMapCompanyModel, WebMapSocialMediaModel } from './index';

export interface WebMapBranchModel {
    code:             string;
    name:             string;
    postal_code:      string;
    address:          string;
    locality:         string;
    province:         string;
    show_map:         string;
    latitude:         number;
    longitude:        number;
    is_novelty:       boolean;
    landline_phone_1: string;
    landline_phone_2: string;
    mobile_phone_1:   string;
    mobile_phone_2:   string;
    email:            string;
    website_1:        string;
    website_2:        string;
    official_hours:   string;
    company:          WebMapCompanyModel;
    distanceInMeters: number;
    social_media?:    WebMapSocialMediaModel[];
}