import Popup from "@components/Popup";
import { memo, useEffect, useState } from "react";
import { DepositePopupProps, InputData, InputError } from "./DepositePopup.type";
import InputWithIcon from "@components/InputWithIcon";
import ErrorMessage from "@components/ErrorMessage";
import { useAppDispatch } from "@hooks/redux.hook";
import { useTranslation } from "react-i18next";
import { useFormValidation } from "@hooks/validate.hook";
import { generateValidateSchema } from "./DepositePopup.schema";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import SelectWithIcon from "@components/SelectWithIcon";
import IconButton from "@components/IconButton";
import LoadingIcon from "@assets/icons/gifs/loading.gif";
import MenuItem from "@components/MenuItem";
import { BankCode, PaymentStatus } from "@constants/payment.constant";
import toastFeature from "@features/toast";
import { ToastType } from "@constants/toast.constants";
import LoadingWrapper from "@components/LoadingWrapper";

function DepositePopup({
    title,
    onClose,
    setReGetBalance
}: DepositePopupProps) {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { values, handleChange, errors, validateAll } = useFormValidation<InputData, InputError>({
        amount: "",
        bankCode: "-1"
    }, generateValidateSchema())
    const { data, isLoading, error, setRefetch } = useFetch<string>(apis.depositeTransactionApi.createPaymentUrl, { body: values }, false)
    const [isWaitingPayment, setWaitingPayment] = useState<boolean>(false);

    useEffect(() => {
        let intervalId: number;
        if (data !== null) {
            const vnpayWindow = window.open(data, "popupWindow");
            const params = new URLSearchParams(data);
            setWaitingPayment(true);
            intervalId = setInterval(async () => {
                try {
                    const paymentStatus = (await apis.depositeTransactionApi.getPaymentStatus({
                        queries: {
                            orderId: params.get('vnp_TxnRef')
                        }
                    })).data

                    switch (paymentStatus) {
                        case PaymentStatus.SUCCEED:
                            vnpayWindow?.close();
                            setWaitingPayment(false);
                            dispatch(toastFeature.toastAction.add({
                                type: ToastType.SUCCESS,
                                title: t("notification.paymentSuccess")
                            }))
                            setReGetBalance({
                                value: true
                            })
                            clearInterval(intervalId);
                            break;

                        case PaymentStatus.FAILED:
                            vnpayWindow?.close();
                            setWaitingPayment(false);
                            dispatch(toastFeature.toastAction.add({
                                type: ToastType.ERROR,
                                title: t("notification.paymentFailed")
                            }))
                            clearInterval(intervalId);
                            break;

                        case null:
                            vnpayWindow?.close();
                            setWaitingPayment(false);
                            dispatch(toastFeature.toastAction.add({
                                type: ToastType.ERROR,
                                title: t("notification.paymentExpired")
                            }))
                            clearInterval(intervalId);
                            break;
                    }
                } catch (error) {
                    vnpayWindow?.close();
                    setWaitingPayment(false);
                    dispatch(toastFeature.toastAction.add({
                        type: ToastType.ERROR,
                        title: t("notification.undefinedError")
                    }))
                    clearInterval(intervalId);
                }
            }, 1000)
        } else {
            if (error) {
                dispatch(toastFeature.toastAction.add({
                    type: ToastType.ERROR,
                    title: t("notification.undefinedError")
                }))
            }
        }
    }, [data])

    return (
        <LoadingWrapper
            isLoading={isWaitingPayment}
            message={t("reader.walletPage.content.depositePopup.waitingPayment")}
        >
            <Popup
                title={title}
                onClose={onClose}
            >
                <div className="space-y-2">
                    {error && <div className="bg-red-500 text-white p-4 rounded-[4px] animate-fadeIn">{t("notification.undefinedError")}</div>}

                    <div>
                        <InputWithIcon
                            name="amount"
                            type="text"
                            icon={(<i className="fa-solid fa-money-bill"></i>)}
                            placeholder={t("reader.walletPage.content.depositePopup.amount")}
                            value={values.amount}
                            onChange={handleChange}
                        />
                        {errors.amount && <ErrorMessage message={errors.amount} />}
                    </div>

                    <div>
                        <InputWithIcon
                            name="formatedMoney"
                            type="text"
                            icon={(<i className="fa fa-money-bill-wave"></i>)}
                            placeholder={t("reader.walletPage.content.depositePopup.formatedMoney")}
                            value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(values.amount))}
                            onFocus={e => e.target.blur()}
                            contentEditable={false}
                        />
                    </div>

                    <div>
                        <SelectWithIcon
                            name="bankCode"
                            icon={(<i className="fa-regular fa-credit-card"></i>)}
                            value={values.bankCode}
                            onChange={handleChange}
                            border="none"
                        >
                            <MenuItem value="-1" disabled>{t("reader.walletPage.content.depositePopup.bankCode.label")}</MenuItem>
                            <MenuItem value={String(BankCode.VNPAYQR)}>{t("reader.walletPage.content.depositePopup.bankCode.vnpayQl")}</MenuItem>
                            <MenuItem value={String(BankCode.VNBANK)}>{t("reader.walletPage.content.depositePopup.bankCode.vnBank")}</MenuItem>
                            <MenuItem value={String(BankCode.INTCARD)}>{t("reader.walletPage.content.depositePopup.bankCode.intCard")}</MenuItem>
                        </SelectWithIcon>
                        {errors.bankCode && <ErrorMessage message={errors.bankCode} />}
                    </div>


                    <div className="flex justify-center">
                        <IconButton
                            icon={
                                isLoading
                                    ? (<img src={LoadingIcon} />)
                                    : (<i className="fa-solid fa-arrow-right"></i>)
                            }
                            fontSize="1.4rem"
                            width={48}
                            height={48}
                            color="var(--white)"
                            bgColor="var(--primary)"
                            borderRadius="50%"
                            onClick={async () => {
                                if (await validateAll()) {
                                    setRefetch({
                                        value: true
                                    })
                                }
                            }}
                        />
                    </div>
                </div>
            </Popup>
        </LoadingWrapper>
    )
}

export default DepositePopup;