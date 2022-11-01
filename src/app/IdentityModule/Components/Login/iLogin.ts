export interface ILoginUser {
    emailOrEmiratesIdOrPassportOrUnifiedIdOrPhone: string;
    password: string;
    fcmToken?: string;
}
