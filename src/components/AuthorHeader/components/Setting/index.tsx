import { memo, useState } from "react";
import shape from "@assets/icons/static/shape.png";
import { useNavigate } from "react-router-dom";
import "./Setting.scss";
import paths from "@routers/router.path";

function Setting() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState); // Toggle trạng thái
    };

    const closeDropdown = () => {
        setShowDropdown(false); // Đóng dropdown
    };

    const handleLogOut = async () => {
        navigate(paths.signInPage());
    };

    return (
        <div className="custom-dropdown-wrapper" style={{ position: "relative" }}>
            {/* Khi click vào img sẽ mở/ẩn dropdown */}
            <img
                className="inline-block w-[3rem] h-[3rem] object-cover object-center rounded-full"
                src={shape}
                onClick={toggleDropdown} // Toggle trạng thái khi click
                style={{
                    cursor: "pointer",
                    transform: "translateY(-2px)", // Di chuyển hình ảnh lên cao 2px
                }}
                alt="profile"
            />

            {showDropdown && (
                <div
                    className="custom-dropdown-menu"
                    style={{
                        position: "absolute",
                        top: "60px", // Đặt vị trí dropdown
                        right: "0",
                        backgroundColor: "white",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "4px",
                        zIndex: 1000,
                    }}
                >
                    <div
                        className="custom-dropdown-item"
                        onClick={() => {
                            navigate(paths.authorProfile());
                            closeDropdown();
                        }}
                    >
                        Name sfdsfs
                    </div>
                    <div
                        className="custom-dropdown-item"
                        onClick={() => {
                            handleLogOut();
                            closeDropdown();
                        }}
                    >
                        Đăng xuất
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(Setting);
