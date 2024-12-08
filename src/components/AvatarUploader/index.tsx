import themeFeature from "@features/theme";
import { useAppSelector } from "@hooks/redux.hook";
import classNames from "classnames";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AvatarDefault from "@assets/avatars/user-default.png";
import Button from "@components/Button";
import { AvatarUploaderProps } from "./AvatarUploader.type";

function AvatarUploader({
    onChange
}: AvatarUploaderProps) {
    const { t } = useTranslation();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isClicked, setClicked] = useState({
        value: false
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (isClicked.value) {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }
    }, [isClicked])

    useEffect(() => {
        if (file && onChange) {
            onChange(file);
        }
    }, [file])

    return (
        <div className="space-y-4">
            <div className="flex justify-center items-center">
                <img
                    className={classNames(
                        "w-[128px] h-[158px] object-cover object-center",
                        themeValue === "light" ? "light__boxShadow" : "dark__boxShadow"
                    )}
                    src={file ? URL.createObjectURL(file) : AvatarDefault}
                    alt="Avatar"
                />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpg,image/jpeg,image/png,image/gif"
                    onChange={e => e.target.files && setFile(e.target.files[0])}
                    hidden
                />
            </div>

            <div className="flex justify-center items-center">
                <Button
                    onClick={() => setClicked({
                        value: true
                    })}
                >
                    {t("manager.employeeManagementPage.createEmployeePopup.changeAvatarBtn")}
                </Button>
            </div>

            <div className="flex justify-center items-center text-[0.9rem] italic px-10 text-center">
                {t("manager.employeeManagementPage.createEmployeePopup.uploadImageNote")}
            </div>
        </div>
    )
}

export default memo(AvatarUploader);