import IconButton from "@components/IconButton";
import { Gender } from "@constants/auth.constants";
import { ModeratorStatus } from "@constants/moderator.constants";
import themeFeature from "@features/theme";
import { useAppSelector } from "@hooks/redux.hook";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import classNames from "classnames";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EmployeeFilterData, EmployeeFilterProps } from "./EmployeeFilter.type";

function EmployeeFilter({
    onChange
}: EmployeeFilterProps) {
    const { t } = useTranslation();
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);
    const [inputData, setInputData] = useState<EmployeeFilterData>({
        gender: [],
        status: []
    });
    const [hiddenFilter, setHiddenFilter] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setInputData((prev) => ({
                ...prev,
                gender: [
                    ...prev.gender,
                    Number(value)
                ]
            }));
        } else {
            setInputData((prev) => ({
                ...prev,
                gender: prev.gender.filter((item) => item !== Number(value))
            }));
        }
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setInputData((prev) => ({
                ...prev,
                status: [
                    ...prev.status,
                    Number(value)
                ]
            }));
        } else {
            setInputData((prev) => ({
                ...prev,
                status: prev.status.filter((item) => item !== Number(value))
            }));
        }
    };

    useEffect(() => {
        if (inputData && onChange) {
            onChange(inputData);
        }
    }, [inputData])

    useEffect(() => {
        function handleMousedown(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setHiddenFilter(true);
            }
        }

        document.addEventListener("mousedown", handleMousedown)
        return () => {
            removeEventListener("mousedown", handleMousedown);
        }
    }, [])

    return (
        <div 
            className="relative"
            ref={containerRef}
        >
            <IconButton
                icon={(<i className="fa-solid fa-filter text-[1.2rem]"></i>)}
                bgColor="var(--primary)"
                padding="8px 24px"
                color="var(--white)"
                borderRadius="4px"
                onClick={() => setHiddenFilter(!hiddenFilter)}
            >
                {t("manager.employeeManagementPage.btn.filterBtn")}
            </IconButton>

            {!hiddenFilter
                && (
                    <div
                        className={classNames(
                            "absolute top-[calc(100%+8px)] right-0 min-w-[240px] p-2 z-[1] rounded-[4px] animate-fadeIn",
                            themeValue === "light" ? "light__boxShadow bg-[var(--white)]" : "dark__boxShadow bg-[var(--dark)]"
                        )}
                    >
                        <div className="font-[600] text-[1.15rem] flex items-center space-x-2 leading-10">
                            <span className="text-[1.2rem]">
                                <i className="fa-solid fa-filter"></i>
                            </span>

                            <span>
                                {t("manager.employeeManagementPage.filter.title")}
                            </span>
                        </div>

                        <div className="mt-2 space-y-1">
                            <div>
                                <div className="font-[600]">
                                    {t("manager.employeeManagementPage.filter.gender.label")}
                                </div>

                                <div className="px-2 -mt-1">
                                    <FormGroup>
                                        <div className="flex flex-col -space-y-2">
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontWeight: 400,
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 20
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        value={String(Gender.MALE)}
                                                        sx={{
                                                            color: "var(--gray)",
                                                            '&.Mui-checked': {
                                                                color: "var(--primary)",
                                                            },
                                                        }}
                                                        checked={inputData.gender.includes(Gender.MALE)}
                                                        onChange={handleGenderChange}
                                                    />
                                                }
                                                label={t("manager.employeeManagementPage.filter.gender.male")}
                                            />
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontWeight: 400,
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 20
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        value={String(Gender.FEMALE)}
                                                        sx={{
                                                            color: "var(--gray)",
                                                            '&.Mui-checked': {
                                                                color: "var(--primary)",
                                                            },
                                                        }}
                                                        checked={inputData.gender.includes(Gender.FEMALE)}
                                                        onChange={handleGenderChange}
                                                    />
                                                }
                                                label={t("manager.employeeManagementPage.filter.gender.female")}
                                            />

                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontWeight: 400,
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 20
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        value={String(Gender.ORTHER)}
                                                        sx={{
                                                            color: "var(--gray)",
                                                            '&.Mui-checked': {
                                                                color: "var(--primary)",
                                                            },
                                                        }}
                                                        checked={inputData.gender.includes(Gender.ORTHER)}
                                                        onChange={handleGenderChange}
                                                    />
                                                }
                                                label={t("manager.employeeManagementPage.filter.gender.orther")}
                                            />
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>

                            <div>
                                <div className="font-[600]">
                                    {t("manager.employeeManagementPage.filter.status.label")}
                                </div>

                                <div className="px-2 -mt-1">
                                    <FormGroup>
                                        <div className="flex flex-col -space-y-2">
                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontWeight: 400,
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 20
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        value={String(ModeratorStatus.WORKING)}
                                                        sx={{
                                                            color: "var(--gray)",
                                                            '&.Mui-checked': {
                                                                color: "var(--primary)",
                                                            },
                                                        }}
                                                        checked={inputData.status.includes(ModeratorStatus.WORKING)}
                                                        onChange={handleStatusChange}
                                                    />
                                                }
                                                label={t("manager.employeeManagementPage.filter.status.working")}
                                            />

                                            <FormControlLabel
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontWeight: 400,
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 20
                                                    }
                                                }}
                                                control={
                                                    <Checkbox
                                                        value={String(ModeratorStatus.RESIGNED)}
                                                        sx={{
                                                            color: "var(--gray)",
                                                            '&.Mui-checked': {
                                                                color: "var(--primary)",
                                                            },
                                                        }}
                                                        checked={inputData.status.includes(ModeratorStatus.RESIGNED)}
                                                        onChange={handleStatusChange}
                                                    />
                                                }
                                                label={t("manager.employeeManagementPage.filter.status.resigned")}
                                            />
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default memo(EmployeeFilter);