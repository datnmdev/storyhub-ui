import colors from "@assets/colors";
import IconButton from "@components/IconButton";
import themeFeature from "@features/themes";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import VietnameseFlagIcon from "@assets/imgs/flags/vietnamese.png";
import EnglishFlagIcon from "@assets/imgs/flags/english.png";
import classNames from "classnames";
import styles from "./ChangeLangButton.module.scss"

function ChangeLangButton() {
    const themeValue = useSelector(themeFeature.themeSelector.selectValue);
    const { t, i18n } = useTranslation();
    const [hiddenBox, setHiddenBox] = useState<boolean>(true);
    const boxRef = useRef<HTMLUListElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
            setHiddenBox(true);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <IconButton
                icon={(
                    <div className="relative">
                        <span className="flex items-center">
                            <i className="fa-solid fa-globe text-[1.8rem]"></i>
                        </span>
                        <span
                            className="absolute top-0 -right-2 leading-none text-[0.8rem] px-1.5 py-0.5 rounded-[4px]"
                            style={{
                                color: themeValue === "light" ? colors.white : colors.black,
                                backgroundColor: themeValue === "light" ? colors.black : colors.white,
                                border: `1px solid ${colors.black}`
                            }}
                        >
                            {i18n.language}
                        </span>
                    </div>
                )}
                width={48}
                height={48}
                borderRadius="50%"
                onClick={() => setHiddenBox(!hiddenBox)}
            />

            {!hiddenBox
                && (
                    <ul
                        className={classNames("absolute top-full right-0 w-40 leading-none p-2 cursor-pointer rounded-[4px] animate-fadeIn",
                            themeValue === "light" ? [styles.light__boxShadow, styles.light__bg] : [styles.dark__boxShadow, styles.dark__bg],
                        )}
                        ref={boxRef}
                    >
                        <li
                            className={classNames("flex items-center py-2 space-x-2 hover:bg-[var(--primary)] hover:text-[var(--white)] px-2",
                                i18n.language === "vi" && "text-[var(--primary)]"
                            )}
                            onClick={() => i18n.changeLanguage("vi")}
                        >
                            <img
                                className="w-8 h-8 object-cover object-center"
                                src={VietnameseFlagIcon}
                                alt="Icon"
                            />

                            <span className="grow">{t(`reader.header.language.vi`)}</span>
                        </li>

                        <li
                            className={classNames("flex items-center py-2 space-x-2 hover:bg-[var(--primary)] hover:text-[var(--white)] px-2",
                                i18n.language === "en" && "text-[var(--primary)]"
                            )}
                            onClick={() => i18n.changeLanguage("en")}
                        >
                            <img
                                className="w-8 h-8 object-cover object-center"
                                src={EnglishFlagIcon}
                                alt="Icon"
                            />

                            <span className="grow">{t(`reader.header.language.en`)}</span>
                        </li>
                    </ul>
                )}
        </div>
    );
}

export default memo(ChangeLangButton);