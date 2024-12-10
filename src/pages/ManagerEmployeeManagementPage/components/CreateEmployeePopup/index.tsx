import Popup from "@components/Popup";
import { useFormValidation } from "@hooks/validate.hook";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateEmployeePopupProps, InputData, InputError } from "./CreateEmployeeForm.type";
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
import { useAppDispatch } from "@hooks/redux.hook";
import { ModeratorStatus } from "@constants/moderator.constants";
import toastFeature from "@features/toast";
import { ToastType } from "@constants/toast.constants";
import { RequestInit } from "@apis/api.type";
import AvatarUploader from "@components/AvatarUploader";
import LoadingWrapper from "@components/LoadingWrapper";

const defaultInputData: InputData = {
    email: "",
    cccd: "",
    name: "",
    dob: undefined,
    gender: String(Gender.MALE),
    phone: "",
    address: "",
    status: String(ModeratorStatus.WORKING),
    doj: undefined
}

function CreateEmployeePopup({
    onClose,
    setReGetEmployeeList
}: CreateEmployeePopupProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [inputData, setInputData] = useState<InputData>(defaultInputData);
    const { values, handleChange, errors, validateAll } = useFormValidation<InputData, InputError>(inputData, generateValidateSchema())
    const [requestInit, setRequestInit] = useState<RequestInit>();
    const { data: createEmployeeResponseData, isLoading: isCreatingEmployee, error: createEmployeeError, setRefetch: setReCreateEmployee } = useFetch(apis.moderatorApi.createModerator, requestInit, false);
    const [checkEmailRequest, setCheckEmailRequest] = useState<RequestInit>();
    const { data: isEmailExisted, setRefetch: setReCheckEmail } = useFetch(apis.authApi.validateEmail, checkEmailRequest, false);
    const [checkCccdRequest, setCheckCccdRequest] = useState<RequestInit>();
    const { data: isCccdExisted, setRefetch: setReCheckCccd } = useFetch(apis.moderatorApi.checkCccd, checkCccdRequest, false);
    const [avatarfile, setAvatarFile] = useState<File | null>(null);
    const [getPreUploadUrlRequest, setGetPreUploadUrlRequest] = useState<RequestInit>();
    const { data: getPreUploadAvatarUrlResData, isLoading: isGetingPreUploadAvatarUrl, setRefetch: setReGetPreUploadAvatarUrl } = useFetch(apis.fileUploadApi.getPreUploadUrl, getPreUploadUrlRequest, false);
    const [uploadAvatarRequest, setUploadAvatarRequest] = useState<RequestInit>();
    const { setRefetch: setReUploadAvatar } = useFetch(apis.fileUploadApi.upload, uploadAvatarRequest, false);

    useEffect(() => {
        if (values.email) {
            setCheckEmailRequest({
                queries: {
                    email: values.email
                }
            })
        }
    }, [values.email])

    useEffect(() => {
        if (checkEmailRequest) {
            setReCheckEmail({
                value: true
            })
        }
    }, [checkEmailRequest])

    useEffect(() => {
        if (values.cccd) {
            setCheckCccdRequest({
                queries: {
                    cccd: values.cccd
                }
            })
        }
    }, [values.cccd])

    useEffect(() => {
        if (checkCccdRequest) {
            setReCheckCccd({
                value: true
            })
        }
    }, [checkCccdRequest])

    useEffect(() => {
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
                if (onClose) {
                    onClose(1);
                }
                setReGetEmployeeList({
                    value: true
                })
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

    useEffect(() => {
        if (avatarfile) {
            setGetPreUploadUrlRequest({
                queries: {
                    fileType: avatarfile.type
                }
            })
        }
    }, [avatarfile])

    useEffect(() => {
        if (getPreUploadUrlRequest) {
            setReGetPreUploadAvatarUrl({
                value: true
            })
        }
    }, [getPreUploadUrlRequest])

    useEffect(() => {
        if (!isGetingPreUploadAvatarUrl) {
            if (getPreUploadAvatarUrlResData) {
                setUploadAvatarRequest({
                    uri: getPreUploadAvatarUrlResData.preUploadUrl,
                    body: avatarfile
                })
            }
        }
    }, [isGetingPreUploadAvatarUrl])

    useEffect(() => {
        if (uploadAvatarRequest) {
            setReUploadAvatar({
                value: true
            })
        }
    }, [uploadAvatarRequest])

    return (
        <LoadingWrapper
            isLoading={isCreatingEmployee}
            message={t("manager.employeeManagementPage.createEmployeePopup.loading.message")}
        >
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
                                    {t("manager.employeeManagementPage.createEmployeePopup.email")}
                                </div>

                                <div className="w-full">
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder=""
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <ErrorMessage message={errors.email} />}
                                    {isEmailExisted !== null && isEmailExisted && values.email && <ErrorMessage message={t("validation.EMAIL_EXISTED_INPUT_ERROR")} />}
                                </div>
                            </div>

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
                                    {isCccdExisted !== null && isCccdExisted && values.cccd && <ErrorMessage message={t("validation.CCCD_EXISTED_INPUT_ERROR")} />}
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
                                        type="date"
                                        placeholder=""
                                        value={values.dob}
                                        max={moment(Date.now(), "DD-MM-YYYY").toString()}
                                        onChange={handleChange}
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
                                        type="date"
                                        placeholder=""
                                        value={values.doj}
                                        max={moment(Date.now(), "YYYY-MM-DD").toString()}
                                        onChange={handleChange}
                                    />
                                    {errors.doj && <ErrorMessage message={errors.doj} />}
                                </div>
                            </div>
                        </div>

                        <div className="w-[40%] shrink-0">
                            <AvatarUploader
                                value={avatarfile}
                                onChange={file => setAvatarFile(file)}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center space-x-2">
                        <Button
                            bgColor="var(--primary)"
                            color="var(--white)"
                            onClick={async () => {
                                if (await validateAll()) {
                                    setRequestInit({
                                        body: {
                                            ...values,
                                            avatar: getPreUploadAvatarUrlResData?.fileKey
                                        }
                                    })
                                }
                            }}
                        >
                            {t("manager.employeeManagementPage.createEmployeePopup.submitBtn")}
                        </Button>

                        <Button
                            bgColor="red"
                            color="var(--white)"
                            onClick={() => {
                                setAvatarFile(() => null);
                                setInputData({
                                    ...defaultInputData
                                })
                            }}
                        >
                            {t("manager.employeeManagementPage.updateEmployeePopup.resetBtn")}
                        </Button>
                    </div>
                </div>
            </Popup>
        </LoadingWrapper>
    )
}

export default memo(CreateEmployeePopup);