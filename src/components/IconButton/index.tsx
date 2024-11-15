import { IconButtonProps } from "./type";

function IconButton({
    icon,
    children,
    color,
    bgColor,
    fontSize,
    width,
    height,
    border,
    borderRadius,
    boxShadow,
    padding,
    onClick
}: IconButtonProps) {
    return (
        <div
            className="flex justify-center items-center space-x-1 hover:opacity-60 cursor-pointer"
            style={{
                width,
                height,
                fontSize,
                color,
                backgroundColor: bgColor,
                border,
                borderRadius,
                boxShadow,
                padding
            }}
            onClick={onClick}
        >
            <span>{icon}</span>
            {children && <span>{children}</span>}
        </div>
    );
}

export default IconButton;