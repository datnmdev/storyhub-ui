import { Gender } from "@constants/auth.constants";
import i18n from "@i18n/index";
import { date, number, object, string } from "yup";

export function generateValidateSchema() {
    return object({
        cccd: string()
            .matches(/^[0-9]{12}$/, i18n.t("validation.cccd"))
            .required(i18n.t("validation.required")),
        name: string()
            .required(i18n.t("validation.required")),
        dob: date()
            .test("dob", i18n.t("validation.dob"), value => {
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
            .matches(/^[0-9]{10,11}$/, i18n.t("validation.phone"))
            .required(i18n.t("validation.required")),
        address: string()
            .required(i18n.t("validation.required")),
        doj: date()
            .test("doj", i18n.t("validation.doj"), value => {
                if (value instanceof Date) {
                    return value.getTime() < Date.now();
                }
                return false;
            })
            .required(i18n.t("validation.required")),
    })
}