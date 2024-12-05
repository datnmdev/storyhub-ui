import IconButton from "@components/IconButton";
import DarkSearchIcon from "@assets/icons/static/dark-search.png";
import LightSearchIcon from "@assets/icons/static/light-search.png";
import { useSelector } from "react-redux";
import themeFeature from "@features/theme";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import Item from "./components/Item";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { RequestInit } from "@apis/api.type";

function SearchButton() {
    const { t } = useTranslation();
    const themeValue = useSelector(themeFeature.themeSelector.selectValue);
    const [isOpen, setOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const [isShrinking, setShrinking] = useState(false);
    const [requestInit, setRequestInit] = useState<RequestInit>();
    const { data, setRefetch } = useFetch(apis.storyApi.search, requestInit, false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            if (searchRef.current) {
                searchRef.current.focus();
            }
        }
    }, [isOpen])

    useEffect(() => {
        if (requestInit) {
            setRefetch({
                value: true
            })
        }
    }, [requestInit])

    useEffect(() => {
        const handleClickedOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShrinking(true);
                setTimeout(() => {
                    setOpen(false);
                    setShrinking(false);
                }, 900);
            }
        };

        document.addEventListener("mousedown", handleClickedOutside);

        return () => {
            removeEventListener("click", handleClickedOutside);
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="flex items-center justify-end"
        >
            {isOpen
                && (
                    <div className="relative leading-none min-w-[320px] flex justify-end">
                        <input
                            ref={searchRef}
                            className={classNames(
                                "block w-full border-[2px] border-solid border-[var(--gray)] px-4 py-2.5 rounded-[4px] focus:outline-[var(--primary)] bg-inherit text-inherit",
                                !isShrinking ? "animate-expandWidth" : "animate-shrinkWidth"
                            )}
                            type="text"
                            placeholder={t("reader.header.searchSection.placeholder")}
                            onChange={e => setRequestInit({
                                queries: {
                                    keyword: e.target.value
                                }
                            })}
                        />

                        {data
                            && (
                                <div
                                    className={classNames(
                                        "shrink-0 absolute top-full left-0 w-full space-y-2 mt-2 max-h-[420px] overflow-y-auto z-[1] rounded-[4px]",
                                        themeValue === "light" ? "light__boxShadow bg-[var(--white)]" : "dark__boxShadow bg-[var(--black)]"
                                    )}
                                >
                                    <div className="p-4 space-x-2">
                                        <span className="font-[450]">{t("reader.header.searchSection.resultTitle")}</span>
                                        <span className="text-[var(--primary)]">{data[1]}</span>
                                    </div>

                                    {data[0].map((story: any) => {
                                        return (
                                            <Item
                                                key={story.id}
                                                data={story}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                    </div>
                )}

            {!isOpen
                && (
                    <IconButton
                        icon={(
                            <img
                                className="w-[28px] h-[28px] object-cover object-center"
                                src={(themeValue === "light" ? LightSearchIcon : DarkSearchIcon)}
                            />
                        )}
                        width={48}
                        height={48}
                        borderRadius="50%"
                        onClick={() => setOpen(true)}
                    />
                )}
        </div>
    );
}

export default memo(SearchButton);