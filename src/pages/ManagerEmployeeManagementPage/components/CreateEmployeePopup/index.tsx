import Popup from "@components/Popup";
import { useFormValidation } from "@hooks/validate.hook";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { InputData, InputError } from "./CreateEmployeeForm.type";
import { generateValidateSchema } from "./CreateEmployeeForm.schema";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import Input from "@components/Input";
import ErrorMessage from "@components/ErrorMessage";
import MenuItem from "@components/MenuItem";
import moment from "moment";
import { Gender } from "@constants/auth.constants";
import Button from "@components/Button";
import Select from "@components/Select";
import AvatarDefault from "@assets/avatars/user-default.png";
import classNames from "classnames";
import themeFeature from "@features/theme";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import { ModeratorStatus } from "@constants/moderator.constants";
import toastFeature from "@features/toast";
import { ToastType } from "@constants/toast.constants";
import { PopupProps } from "@components/Popup/Popup.type";
import { RequestInit } from "@apis/api.type";

function CreateEmployeePopup({
    onClose
}: PopupProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const { values, handleChange, errors, validateAll } = useFormValidation<InputData, InputError>({
        cccd: "",
        name: "",
        dob: undefined,
        gender: String(Gender.MALE),
        phone: "",
        address: "",
        status: String(ModeratorStatus.WORKING),
        doj: undefined,
        avatar: undefined
    }, generateValidateSchema())
    const [requestInit, setRequestInit] = useState<RequestInit>({});
    const { data: createEmployeeResponseData, isLoading: isCreatingEmployee, error: createEmployeeError, setRefetch: setReCreateEmployee } = useFetch(apis.moderatorApi.createModerator, requestInit, false);

    useEffect(() => {
        console.log(requestInit);
        
        if (requestInit) {
            setReCreateEmployee({
                value: true
            })
        }
    }, [requestInit])

    useEffect(() => {
        if (!isCreatingEmployee) {
            if (createEmployeeResponseData) {
                dispatch(toastFeature.toastAction.add({
                    type: ToastType.SUCCESS,
                    title: t("notification.createEmployeeSuccess")
                }))
            } else {
                if (createEmployeeError) {
                    dispatch(toastFeature.toastAction.add({
                        type: ToastType.ERROR,
                        title: t("notification.createEmployeeFailed")
                    }))
                }
            }
        }
    }, [isCreatingEmployee])

    return (
        <Popup
            width={720}
            title={t("manager.employeeManagementPage.createEmployeePopup.title")}
            onClose={onClose}
        >
            <div>
                <div className="flex justify-between space-x-8">
                    <div className="grow space-y-2">
                        {createEmployeeError && <div className="bg-red-500 text-white p-4 rounded-[4px] animate-fadeIn">{t("notification.undefinedError")}</div>}

                        <div className="flex items-start w-full">
                            <div className="w-[180px] h-[42px] flex items-center">
                                {t("manager.employeeManagementPage.createEmployeePopup.cccd")}
                            </div>

                            <div className="w-full">
                                <Input
                                    name="cccd"
                                    type="text"
                                    placeholder=""
                                    value={values.cccd}
                                    onChange={handleChange}
                                />
                                {errors.cccd && <ErrorMessage message={errors.cccd} />}
                            </div>
                        </div>

                        <div className="flex items-center w-full">
                            <div className="w-[180px]">
                                {t("manager.employeeManagementPage.createEmployeePopup.name")}
                            </div>

                            <div className="w-full">
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder=""
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <ErrorMessage message={errors.name} />}
                            </div>
                        </div>

                        <div className="flex items-center w-full">
                            <div className="w-[180px]">
                                {t("manager.employeeManagementPage.createEmployeePopup.dob")}
                            </div>

                            <div className="w-full">
                                <Input
                                    name="dob"
                                    type="text"
                                    placeholder=""
                                    value={values.dob}
                                    max={moment(Date.now(), "YYYY-MM-DD").toString()}
                                    onChange={handleChange}
                                    onFocus={e => e.target.type = "date"}
                                    onBlur={e => e.target.type = "text"}
                                />
                                {errors.dob && <ErrorMessage message={errors.dob} />}
                            </div>

                        </div>

                        <div className="flex items-center w-full">
                            <div className="w-[180px]">
                                {t("manager.employeeManagementPage.createEmployeePopup.gender")}
                            </div>

                            <div className="w-full">
                                <Select
                                    name="gender"
                                    value={values.gender}
                                    onChange={e => handleChange(e)}
                                    border="1px solid var(--gray)"
                                >
                                    <MenuItem value={String(Gender.MALE)}>{t("reader.signUpPage.gender.male")}</MenuItem>
                                    <MenuItem value={String(Gender.FEMALE)}>{t("reader.signUpPage.gender.female")}</MenuItem>
                                    <MenuItem value={String(Gender.ORTHER)}>{t("reader.signUpPage.gender.other")}</MenuItem>
                                </Select>
                                {errors.gender && <ErrorMessage message={errors.gender} />}
                            </div>

                        </div>

                        <div className="flex items-center w-full">
                            <div className="w-[180px]">
                                {t("manager.employeeManagementPage.createEmployeePopup.phone")}
                            </div>

                            <div className="w-full">
                                <Input
                                    name="phone"
                                    type="text"
                                    placeholder=""
                                    value={values.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && <ErrorMessage message={errors.phone} />}
                            </div>

                        </div>

                        <div className="flex items-center w-full">
                            <div className="w-[180px]">
                                {t("manager.employeeManagementPage.createEmployeePopup.address")}
                            </div>

                            <div className="w-full">
                                <Input
                                    name="address"
                                    type="text"
                                    placeholder=""
                                    value={values.address}
                                    onChange={handleChange}
                                />
                                {errors.address && <ErrorMessage message={errors.address} />}
                            </div>
                        </div>

                        <div className="flex items-center w-full">
                            <div className="w-[180px]">
                                {t("manager.employeeManagementPage.createEmployeePopup.status.label")}
                            </div>

                            <div className="w-full">
                                <Select
                                    name="status"
                                    value={values.status}
                                    onChange={e => handleChange(e)}
                                    border="1px solid var(--gray)"
                                >
                                    <MenuItem value={String(ModeratorStatus.WORKING)}>{t("manager.employeeManagementPage.createEmployeePopup.status.working")}</MenuItem>
                                </Select>
                                {errors.status && <ErrorMessage message={errors.status} />}
                            </div>
                        </div>

                        <div className="flex items-center w-full">
                            <div className="w-[180px]">
                                {t("manager.employeeManagementPage.createEmployeePopup.doj")}
                            </div>

                            <div className="w-full">
                                <Input
                                    name="doj"
                                    type="text"
                                    placeholder=""
                                    value={values.doj}
                                    max={moment(Date.now(), "YYYY-MM-DD").toString()}
                                    onChange={handleChange}
                                    onFocus={e => e.target.type = "date"}
                                    onBlur={e => e.target.type = "text"}
                                />
                                {errors.doj && <ErrorMessage message={errors.doj} />}
                            </div>
                        </div>
                    </div>

                    <div className="w-[40%] space-y-4">
                        <div className="flex justify-center items-center">
                            <img
                                className={classNames(
                                    "w-[128px] h-[158px] object-cover object-center",
                                    themeValue === "light" ? "light__boxShadow" : "dark__boxShadow"
                                )}
                                src={AvatarDefault}
                                alt="Avatar"
                            />
                        </div>

                        <div className="flex justify-center items-center">
                            <Button>
                                {t("manager.employeeManagementPage.createEmployeePopup.changeAvatarBtn")}
                            </Button>
                        </div>

                        <div className="flex justify-center items-center text-[0.9rem] italic px-10 text-center">
                            {t("manager.employeeManagementPage.createEmployeePopup.uploadImageNote")}
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        bgColor="var(--primary)"
                        color="var(--white)"
                        onClick={async () => {
                            if (await validateAll()) {
                                console.log(1111);
                                
                                setRequestInit({
                                    ...requestInit,
                                    body: {
                                        ...values
                                    }
                                })
                            }
                        }}
                    >
                        {t("manager.employeeManagementPage.createEmployeePopup.submitBtn")}
                    </Button>
                </div>
            </div>
        </Popup>
    )
}

export default memo(CreateEmployeePopup);