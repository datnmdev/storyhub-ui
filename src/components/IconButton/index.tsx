import { IconButtonProps } from "./type";

function IconButton({
    icon,
    children,
    width,
    height,
    borderRadius,
    padding,
    onClick
}: IconButtonProps) {
    return (
        <div
            className="flex justify-center items-center space-x-1 hover:opacity-60 cursor-pointer"
            style={{
                width,
                height,
                borderRadius,
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