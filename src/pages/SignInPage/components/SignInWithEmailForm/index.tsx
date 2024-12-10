import InputWithIcon from "@components/InputWithIcon";
import { memo, useEffect, useState } from "react";
import KeyIcon from "@assets/icons/static/key.png";
import { useTranslation } from "react-i18next";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import IconButton from "@components/IconButton";
import ErrorMessage from "@components/ErrorMessage";
import { generateValidateSchema } from "./SignInWithEmailForm.schema";
import useFetch from "@hooks/fetch.hook";
import { Token } from "@features/auth/auth.type";
import apis from "@apis/index";
import LoadingIcon from "@assets/icons/gifs/loading.gif";
import { useAppDispatch } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import toastFeature from "@features/toast";
import { ToastType } from "@constants/toast.constants";
import { LocationState } from "@type/reactRouterDom.type";
import { useFormValidation } from "@hooks/validate.hook";
import { InputData, InputError } from "./SignInWithEmailForm.type";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@type/jwt.type";
import { AccountStatus } from "@constants/oauth.constants";
import paths from "@routers/router.path";
import { OtpVerificationType } from "@constants/auth.constants";
import RouteUtils from "@routers/route.util";
import { RequestInit } from "@apis/api.type";

function SignInWithEmailForm() {
    const dispatch = useAppDispatch();
    const location: Location<LocationState> = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [defaultInputData] = useState({
        email: '',
        password: ''
    });
    const { values, handleChange, errors, validateAll } = useFormValidation<InputData, InputError>(defaultInputData, generateValidateSchema())
    const [signInRequest, setSignInRequest] = useState<RequestInit>();
    const { data, isLoading, error, setRefetch } = useFetch<Token>(apis.authApi.signInWithEmailPassword, signInRequest, false)

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                const payload: JwtPayload = jwtDecode(data.accessToken);
                switch (payload.status) {
                    case AccountStatus.ACTIVATED:
                        dispatch(authFeature.authAction.signIn(data))
                        dispatch(toastFeature.toastAction.add({
                            type: ToastType.SUCCESS,
                            title: t("notification.loginSuccess")
                        }))
                        navigate(RouteUtils.getRedirectUriBelongTo(data.accessToken, location), {
                            replace: true
                        });
                        break;

                    case AccountStatus.UNACTIVATED:
                        navigate(paths.otpVerificationPage(), {
                            state: {
                                type: OtpVerificationType.SIGN_IN,
                                prevData: values,
                                account: {
                                    ...payload,
                                    id: payload.accountId
                                }
                            }
                        })
                        dispatch(toastFeature.toastAction.add({
                            type: ToastType.INFO,
                            title: t("notification.needToVerifyAccount")
                        }))
                        break;
                }
            }
        }
    }, [isLoading])

    return (
        <div className="space-y-2">
            {error && <div className="bg-red-500 text-white p-4 rounded-[4px] animate-fadeIn">{t("notification.signInWithEmailPasswordFailure")}</div>}

            <div>
                <InputWithIcon
                    name="email"
                    type="email"
                    placeholder={t("reader.signInPage.email")}
                    value={values.email}
                    onChange={handleChange}
                />
                {errors.email && <ErrorMessage message={errors.email} />}
            </div>

            <div>
                <InputWithIcon
                    name="password"
                    type="password"
                    icon={(
                        <img
                            className="mx-auto"
                            width={22}
                            src={KeyIcon}
                            alt="Key Icon"
                        />
                    )}
                    placeholder={t("reader.signInPage.password")}
                    value={values.password}
                    onChange={handleChange}
                />
                {errors.password && <ErrorMessage message={errors.password} />}
            </div>

            <div className="flex justify-end">
                <Link
                    className="text-[var(--primary)] hover:opacity-60 py-1"
                    to={paths.forgotPasswordPage()}
                >
                    {t("reader.signInPage.forgotPassword")}
                </Link>
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
                            setSignInRequest(() => ({
                                body: {
                                    ...values
                                }
                            }))
                            setRefetch({
                                value: true
                            })
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default memo(SignInWithEmailForm);