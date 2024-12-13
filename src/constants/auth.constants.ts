export enum Gender {
    MALE = 0,
    FEMALE = 1,
    ORTHER = 2
}

export enum Role {
    MANAGER = 1,
    AUTHOR = 2,
    MODERATOR = 3,
    READER =4
}

export enum OtpVerificationType {
    SIGN_IN = 0,
    SIGN_UP = 1,
    FORGOT_PASSWORD = 2,
    CHANGE_PASSWORD = 3
}

export const AUTH_KEY = "user";
export const TOKEN_KEY = "token";