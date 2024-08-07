export interface NotificationFCM {
    id?: string;
    notificationId?: string;
    title?: string;
    body?: string;
    icon?: string;
    image?: string;
    ongoing: boolean;
    silent: boolean;
    data?: any;
    tag?: 'ventajon_api'
}