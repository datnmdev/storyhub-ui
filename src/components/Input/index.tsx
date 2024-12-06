import { memo } from "react";
import { InputProps } from "./Input.type";
import { useAppSelector } from "@hooks/redux.hook";
import themeFeature from "@features/theme";

function Input({
    type = "email",
    placeholder = "Email",
    value = '',
    name,
    max,
    maxLength,
    minLength,
    contentEditable = true,
    onChange = () => {},
    onFocus,
    onBlur,
}: InputProps) {
    const themeValue = useAppSelector(themeFeature.themeSelector.selectValue);

    return (
        <input
            className="block w-full px-4 py-3 focus:outline-[var(--primary)] bg-inherit text-[#9CA3AF] border-[1px] border-solid border-[var(--gray)]"
            style={{
                colorScheme: themeValue === "light" ? "light" : "dark"
            }}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            max={max}
            maxLength={maxLength}
            minLength={minLength}
            contentEditable={contentEditable}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    )
}

export default memo(Input);