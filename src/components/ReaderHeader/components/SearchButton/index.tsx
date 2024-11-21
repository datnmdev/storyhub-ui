import IconButton from "@components/IconButton";
import DarkSearchIcon from "@assets/icons/static/dark-search.png";
import LightSearchIcon from "@assets/icons/static/light-search.png";
import { useSelector } from "react-redux";
import themeFeature from "@features/theme";
import { memo } from "react";

function SearchButton() {
    const themeValue = useSelector(themeFeature.themeSelector.selectValue);

    return (
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
        />
    );
}

export default memo(SearchButton);