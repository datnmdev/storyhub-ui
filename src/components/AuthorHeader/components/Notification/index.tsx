import IconButton from "@components/IconButton";
import notification from "@assets/icons/static/notifiction.png";
import styles from "./Notification.module.scss";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { NotificationUser } from "@pages/Author/AllInterface/interface";

function Notification() {
    const [showDropdown, setShowDropdown] = useState(false);
    const profile = useAppSelector(authFeature.authSelector.selectUser);
    const { data: notificationData, setRefetch: setRefetchNotification } = useFetch<NotificationUser[]>(
        apis.notificationUserApi.getAllNotificationUser,
        {
            queries: {
                id: profile?.id,
            },
        },
        false
    );

    useEffect(() => {
        if (profile) {
            setRefetchNotification({ value: true });
        }
    }, [profile]);

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState); // Toggle trạng thái
    };

    const closeDropdown = () => {
        setShowDropdown(false); // Đóng dropdown
    };
    return (
        <div className={styles.notificationWrapper} style={{ position: "relative" }}>
            <div className={styles.dropdownMenu}>
                <IconButton
                    icon={<img className="w-[3rem] h-[3rem] object-cover object-center" src={notification} />}
                    width={48}
                    height={40}
                    borderRadius="50%"
                    onClick={toggleDropdown}
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
                        <div className={styles.customDropdownItemTitle}>Thông báo</div>
                        {Array.isArray(notificationData) &&
                            notificationData.slice(0, 3).map((item, index) => (
                                <div
                                    key={`notification-${index}`}
                                    className={styles.customDropdownItem}
                                    onClick={() => {
                                        closeDropdown();
                                    }}
                                >
                                    {item.notification.moderationRequest.reason.length > 22
                                        ? `${item.notification.moderationRequest.reason.substring(0, 22)}...`
                                        : item.notification.moderationRequest.reason || "Bạn chưa có thông báo nào"}
                                </div>
                            ))}
                        <div className={styles.customDropdownItemViewAll}>Xem tất cả</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Notification);
