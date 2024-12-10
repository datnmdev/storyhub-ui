import Popup from "@components/Popup";
import { useFormValidation } from "@hooks/validate.hook";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UpdateEmployeePopupProps, InputData, InputError } from "./UpdateEmployeeForm.type";
import { generateValidateSchema } from "./UpdateEmployeeForm.schema";
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
import UrlUtils from "@utilities/url.util";
import LoadingWrapper from "@components/LoadingWrapper";

function UpdateEmployeePopup({
    onClose,
    setReGetEmployeeList,
    employee
}: UpdateEmployeePopupProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [inputDataInit] = useState({
        id: String(employee.id),
        email: employee.email,
        cccd: employee.cccd,
        name: employee.name,
        dob: moment(employee.dob).format("YYYY-MM-DD"),
        gender: String(employee.gender),
        phone: employee.phone,
        address: employee.address ?? "",
        status: String(employee.status),
        doj: moment(employee.doj).format("YYYY-MM-DD")
    });
    const [inputData, setInputData] = useState<InputData>(inputDataInit);
    const { values, handleChange, errors, validateAll } = useFormValidation<InputData, InputError>(inputData, generateValidateSchema())
    const [requestInit, setRequestInit] = useState<RequestInit>();
    const { data: updateEmployeeResponseData, isLoading: isUpdatingEmployee, error: updateEmployeeError, setRefetch: setReUpdateEmployee } = useFetch(apis.moderatorApi.updateModerator, requestInit, false);
    const [checkCccdRequest, setCheckCccdRequest] = useState<RequestInit>();
    const { data: isCccdExisted, setRefetch: setReCheckCccd } = useFetch(apis.moderatorApi.checkCccd, checkCccdRequest, false);
    const [avatarfile, setAvatarFile] = useState<File | null>(null);
    const [getPreUploadUrlRequest, setGetPreUploadUrlRequest] = useState<RequestInit>();
    const { data: getPreUploadAvatarUrlResData, isLoading: isGetingPreUploadAvatarUrl, setRefetch: setReGetPreUploadAvatarUrl } = useFetch(apis.fileUploadApi.getPreUploadUrl, getPreUploadUrlRequest, false);
    const [uploadAvatarRequest, setUploadAvatarRequest] = useState<RequestInit>();
    const { setRefetch: setReUploadAvatar } = useFetch(apis.fileUploadApi.upload, uploadAvatarRequest, false);

    useEffect(() => {
        if (values && values !== inputDataInit) {
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
            setReUpdateEmployee({
                value: true
            })
        }
    }, [requestInit])

    useEffect(() => {
        if (!isUpdatingEmployee) {
            if (updateEmployeeResponseData) {
                dispatch(toastFeature.toastAction.add({
                    type: ToastType.SUCCESS,
                    title: t("notification.POST_SUCCESS")
                }))
                if (onClose) {
                    onClose(1);
                }
                setReGetEmployeeList({
                    value: true
                })
            } else {
                if (updateEmployeeError) {
                    dispatch(toastFeature.toastAction.add({
                        type: ToastType.ERROR,
                        title: t("notification.FAILED")
                    }))
                }
            }
        }
    }, [isUpdatingEmployee])

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
            isLoading={isUpdatingEmployee}
            message={t("manager.employeeManagementPage.updateEmployeePopup.loading.message")}
        >
            <Popup
                width={720}
                title={t("manager.employeeManagementPage.updateEmployeePopup.title")}
                onClose={onClose}
            >
                <div>
                    <div className="flex justify-between space-x-8">
                        <div className="grow space-y-2">
                            {updateEmployeeError && <div className="bg-red-500 text-white p-4 rounded-[4px] animate-fadeIn">{t("notification.undefinedError")}</div>}

                            <div className="flex items-start w-full">
                                <div className="w-[180px] h-[42px] flex items-center">
                                    {t("manager.employeeManagementPage.updateEmployeePopup.id")}
                                </div>

                                <div className="w-full">
                                    <Input
                                        name="id"
                                        type="text"
                                        placeholder=""
                                        value={values.id}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="flex items-start w-full">
                                <div className="w-[180px] h-[42px] flex items-center">
                                    {t("manager.employeeManagementPage.updateEmployeePopup.email")}
                                </div>

                                <div className="w-full">
                                    <Input
                                        name="email"
                                        type="text"
                                        placeholder=""
                                        value={values.email}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="flex items-start w-full">
                                <div className="w-[180px] h-[42px] flex items-center">
                                    {t("manager.employeeManagementPage.updateEmployeePopup.cccd")}
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
                                    {isCccdExisted !== null && isCccdExisted && values.cccd != employee.cccd && <ErrorMessage message={t("validation.CCCD_EXISTED_INPUT_ERROR")} />}
                                </div>
                            </div>

                            <div className="flex items-center w-full">
                                <div className="w-[180px]">
                                    {t("manager.employeeManagementPage.updateEmployeePopup.name")}
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
                                    {t("manager.employeeManagementPage.updateEmployeePopup.dob")}
                                </div>

                                <div className="w-full">
                                    <Input
                                        name="dob"
                                        type="date"
                                        placeholder=""
                                        value={values.dob}
                                        max={moment(Date.now(), "YYYY-MM-DD").toString()}
                                        onChange={handleChange}
                                    />
                                    {errors.dob && <ErrorMessage message={errors.dob} />}
                                </div>

                            </div>

                            <div className="flex items-center w-full">
                                <div className="w-[180px]">
                                    {t("manager.employeeManagementPage.updateEmployeePopup.gender")}
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
                                    {t("manager.employeeManagementPage.updateEmployeePopup.phone")}
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
                                    {t("manager.employeeManagementPage.updateEmployeePopup.address")}
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
                                    {t("manager.employeeManagementPage.updateEmployeePopup.status.label")}
                                </div>

                                <div className="w-full">
                                    <Select
                                        name="status"
                                        value={values.status}
                                        onChange={e => handleChange(e)}
                                        border="1px solid var(--gray)"
                                    >
                                        <MenuItem value={String(ModeratorStatus.WORKING)}>{t("manager.employeeManagementPage.updateEmployeePopup.status.working")}</MenuItem>
                                        <MenuItem value={String(ModeratorStatus.RESIGNED)}>{t("manager.employeeManagementPage.updateEmployeePopup.status.resigned")}</MenuItem>
                                    </Select>
                                    {errors.status && <ErrorMessage message={errors.status} />}
                                </div>
                            </div>

                            <div className="flex items-center w-full">
                                <div className="w-[180px]">
                                    {t("manager.employeeManagementPage.updateEmployeePopup.doj")}
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
                                previewUrl={employee.avatar !== null ? UrlUtils.generateUrl(employee.avatar) : undefined}
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
                                            avatar: avatarfile ? getPreUploadAvatarUrlResData?.fileKey : undefined
                                        }
                                    })
                                }
                            }}
                        >
                            {t("manager.employeeManagementPage.updateEmployeePopup.submitBtn")}
                        </Button>

                        <Button
                            bgColor="red"
                            color="var(--white)"
                            onClick={() => {
                                setAvatarFile(() => null);
                                setInputData({
                                    ...inputDataInit
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

export default memo(UpdateEmployeePopup);