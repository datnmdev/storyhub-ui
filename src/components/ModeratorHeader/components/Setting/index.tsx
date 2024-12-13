import { memo, useEffect, useState } from "react";
import DefaultAvatar from "@assets/avatars/user-default.png";
import { useNavigate } from "react-router-dom";
import styles from "./Setting.module.scss";
import paths from "@routers/router.path";
import { TOKEN_KEY } from "@constants/auth.constants";
import apis from "@apis/index";
import useFetch from "@hooks/fetch.hook";
import { useAppDispatch, useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import { setWebSocketService } from "@store/webSocketSlice";
import WebSocketService from "@components/AuthorHeader/Socket/socket";
function Setting() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data: profileData, isLoading: isGettingProfile } = useFetch(apis.userApi.getProfile);
    const profile = useAppSelector(authFeature.authSelector.selectUser);
    const [checkConnent, setCheckConnet] = useState<number>(1);

    useEffect(() => {
        if (profile && checkConnent == 1) {
            setCheckConnet(2);
            const webSocketService = new WebSocketService(profile.id.toString());
            dispatch(setWebSocketService(webSocketService));
        }
    }, [profile, dispatch]);
    const {
        data: isSignedOut,
        isLoading: isSigningOut,
        setRefetch: setSignOut,
    } = useFetch(apis.authApi.signOut, { body: JSON.parse(localStorage.getItem(TOKEN_KEY) as string) }, false);
    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState); // Toggle trạng thái
    };

    const closeDropdown = () => {
        setShowDropdown(false); // Đóng dropdown
    };

    useEffect(() => {
        if (profileData !== null) {
            dispatch(authFeature.authAction.setUser(profileData));
        }
    }, [profileData]);

    useEffect(() => {
        if (isSignedOut !== null && isSignedOut != false) {
            dispatch(authFeature.authAction.signOut());
            navigate(paths.signInPage());
        }
    }, [isSignedOut]);

    return (
        <div className={styles.settingWrapper} style={{ position: "relative" }}>
            {/* Khi click vào img sẽ mở/ẩn dropdown */}
            <img
                className="inline-block w-[3rem] h-[3rem] object-cover object-center rounded-full"
                src={
                    profile?.avatar
                        ? `${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${profile.avatar}`
                        : DefaultAvatar
                }
                onClick={toggleDropdown} // Toggle trạng thái khi click
                style={{
                    cursor: "pointer",
                    transform: "translateY(-2px)", // Di chuyển hình ảnh lên cao 2px
                }}
                alt="profile"
            />

            {showDropdown && (
                <div
                    className={styles.dropdownMenu}
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
                        className={styles.customDropdownItem}
                        onClick={() => {
                            navigate(paths.moderatorProfile());
                            closeDropdown();
                        }}
                    >
                        {profile.name}
                    </div>
                    <div
                        className={styles.customDropdownItem}
                        onClick={() => {
                            setSignOut({ value: true });
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
