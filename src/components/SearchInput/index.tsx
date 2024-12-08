import { memo } from "react";
import { SearchInputProps } from "./SearchInput.type";

function SearchInput({
    placeholder,
    onChange
}: SearchInputProps) {
    return (
        <div className="relative min-w-[240px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[1.2rem] text-[var(--gray)]">
                <i className="fa-solid fa-magnifying-glass"></i>
            </span>

            <input
                className="block w-full px-4 py-2 border-[2px] pl-9 border-solid border-[var(--gray)] rounded-[4px] focus:outline-[var(--primary)] bg-inherit text-inherit"
                type="text"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default memo(SearchInput);