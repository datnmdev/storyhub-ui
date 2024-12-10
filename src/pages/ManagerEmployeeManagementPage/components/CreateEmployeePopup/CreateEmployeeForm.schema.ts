import { Gender } from "@constants/auth.constants";
import i18n from "@i18n/index";
import { date, number, object, string } from "yup";

export function generateValidateSchema() {
    return object({
        email: string()
            .email(i18n.t("validation.email"))
            .required(i18n.t("validation.required")),
        cccd: string()
            .matches(/^[0-9]{12}$/, i18n.t("validation.CCCD_INPUT_ERROR"))
            .required(i18n.t("validation.required")),
        name: string()
            .required(i18n.t("validation.NAME_INPUT_ERROR")),
        dob: date()
            .test("dob", i18n.t("validation.DOB_INPUT_ERROR"), value => {
                if (value instanceof Date) {
                    return value.getTime() < Date.now();
                }
                return false;
            })
            .required(i18n.t("validation.required")),
        gender: number()
            .oneOf([Gender.MALE, Gender.FEMALE, Gender.ORTHER], i18n.t("validation.gender"))
            .required(i18n.t("validation.required")),
        phone: string()
            .matches(/^[0-9]{10,11}$/, i18n.t("validation.PHONE_INPUT_ERROR"))
            .required(i18n.t("validation.required")),
        address: string()
            .required(i18n.t("validation.ADDRESS_INPUT_ERROR")),
        doj: date()
            .test("doj", i18n.t("validation.DOJ_INPUT_ERROR"), value => {
                if (value instanceof Date) {
                    return value.getTime() < Date.now();
                }
                return false;
            })
            .required(i18n.t("validation.required")),
    })
}