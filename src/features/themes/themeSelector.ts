import { RootState } from "@store/type";

const themeSelector = {
    selectValue: (state: RootState) => state.theme.value
};

export default themeSelector;