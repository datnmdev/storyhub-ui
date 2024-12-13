import { Gender } from "@constants/auth.constants";
import i18n from "@i18n/index";
import { date, number, object, string } from "yup";

export function generateValidateSchema() {
    return object({
        name: string()
            .required(i18n.t("validation.NAME_INPUT_ERROR")),
        dob: date()
            .test("dob", i18n.t("validation.DOB_INPUT_ERROR"), value => {
                if (value === undefined) {
                    return true;
                }
                if (value instanceof Date) {
                    return value.getTime() < Date.now();
                }
                return false;
            })
            .optional(),
        gender: number()
            .oneOf([Gender.MALE, Gender.FEMALE, Gender.ORTHER, -1], i18n.t("validation.gender"))
            .optional(),
        phone: string()
        .optional()
        .test("phone-validation", i18n.t("validation.PHONE_INPUT_ERROR"), function (value) {
          if (!value || value.trim() === "") {
            return true;
          }
          return /^[0-9]{10,11}$/.test(value);
        }),
    })
}