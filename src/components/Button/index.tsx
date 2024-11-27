import colors from "@assets/colors";
import { ButtonProps } from "./Button.type";

function Button({
    width = 120,
    height = 38,
    color = colors.white,
    bgColor = colors.primary,
    borderRadius = "4px",
    padding = "0",
    children,
    onClick,
}: ButtonProps) {
    return (
        <div
            className="flex justify-center items-center hover:opacity-60 cursor-pointer select-none"
            style={{
                width,
                height,
                color,
                backgroundColor: bgColor,
                borderRadius,
                padding
            }}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default Button;