import IconButton from "@components/IconButton";
import DarkSearchIcon from "@assets/imgs/icons/dark-search.png";
import LightSearchIcon from "@assets/imgs/icons/light-search.png";
import { useSelector } from "react-redux";
import themeFeature from "@features/themes";
import { memo } from "react";

function SearchButton() {
    const themeValue = useSelector(themeFeature.themeSelector.selectValue);

    return (
        <IconButton
            icon={(
                <img
                    className="w-[1.8rem] h-[1.8rem] object-cover object-center"
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