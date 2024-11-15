import InputWithIcon from "@components/InputWithIcon";
import { memo } from "react";
import KeyIcon from "@assets/imgs/icons/key.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import IconButton from "@components/IconButton";

function SignInWithEmailForm() {
    const { t } = useTranslation();

    return (
        <div className="space-y-2">
            <InputWithIcon
                type="email"
                placeholder={t("reader.signInPage.email")}
            />

            <InputWithIcon
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
            />

            <div className="flex justify-end">
                <Link 
                    className="text-[var(--primary)] hover:opacity-60 py-1"
                    to="#"
                >
                    {t("reader.signInPage.forgotPassword")}
                </Link>
            </div>

            <div className="flex justify-center">
                <IconButton 
                    icon={(<i className="fa-solid fa-arrow-right"></i>)}
                    fontSize="1.4rem"
                    width={48}
                    height={48}
                    color="var(--white)"
                    bgColor="var(--primary)"
                    borderRadius="50%"
                />
            </div>
        </div>
    );
}

export default memo(SignInWithEmailForm);