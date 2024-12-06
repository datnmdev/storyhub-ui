import IconButton from "@components/IconButton";
import notification from "@assets/icons/static/notifiction.png";
import styles from "./Notification.module.scss";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { NotificationUser, Story } from "@pages/Author/AllInterface/interface";
import moment from "moment";
import ModalApproveStory from "@pages/ModeratorHomePage/ModalApproveStory";
import { useSelector } from "react-redux";
import { AppRootState } from "@store/store.type";
interface NotificationProps {
    setRefetch: (value: { value: boolean }) => void; // Định nghĩa kiểu cho prop
}

function Notification({ setRefetch }: NotificationProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [countNotificationUnseen, setCountNotificationUnseen] = useState<number | null>(null);
    const [notificationId, setNotificationId] = useState<number | null>(null);
    const [storyId, setStoryId] = useState<number | null>(null);
    const [showModalApprove, setShowModalApprove] = useState(false);
    const webSocketService = useSelector((state: AppRootState) => state.webSocket.service);
    const profile = useAppSelector(authFeature.authSelector.selectUser);

    const { data: storyDetail, setRefetch: setRefetchStoryDetail } = useFetch<Story>(
        apis.storyApi.getStoryDetail,
        {
            queries: {
                id: storyId,
            },
        },
        false
    );

    const { data: notificationData, setRefetch: setRefetchNotification } = useFetch<NotificationUser[]>(
        apis.notificationUserApi.getAllNotificationUser,
        {
            queries: {
                id: profile?.id,
            },
        },
        false
    );

    const { data: updatedNotification, setRefetch: setRefetchUpdateNotification } = useFetch(
        apis.notificationUserApi.updateNotificationUser,
        {
            body: { receiverId: profile?.id, status: 1, notificationId: notificationId },
        },
        false
    );

    useEffect(() => {
        // Lắng nghe yêu cầu kiểm duyệt
        const listenEvent = (mess: any) => {
            console.log("Yêu cầu kiểm duyệt mới nhận được:", mess);
            setRefetchNotification({ value: true });
        };

        // Gọi hàm để lắng nghe yêu cầu kiểm duyệt
        if (webSocketService) {
            webSocketService.listenNewReviewRequestForModerator(listenEvent);
        }

        // Cleanup listener nếu cần
        return () => {
            // Nếu bạn muốn dọn dẹp, bạn có thể thêm logic để tắt lắng nghe
            // Tuy nhiên, trong trường hợp này, socket.on không cần phải tắt
        };
    }, [webSocketService]);

    useEffect(() => {
        if (profile && storyId != null) {
            setRefetchStoryDetail({ value: true });
        }
    }, [storyId]);

    useEffect(() => {
        if (profile) {
            setRefetchNotification({ value: true });
        }
        if (notificationId !== undefined && notificationId !== null) {
            setRefetchUpdateNotification({ value: true });
        }
        if (updatedNotification) {
            setRefetchNotification({ value: true });
        }
    }, [profile, notificationId, updatedNotification, storyId]);

    useEffect(() => {
        if (notificationData) {
            const unreadNotificationsCount = notificationData.filter(
                (notification) => notification.status === 0
            ).length;
            setCountNotificationUnseen(unreadNotificationsCount);
        }
    }, [notificationData]);

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState); // Toggle trạng thái
    };

    const handleNotificationClick = (notificationId: number, storyId: number) => {
        setNotificationId(notificationId);
        setStoryId(storyId);
        setShowModalApprove(true);
        setShowDropdown(false); // Đóng dropdown
    };
    return (
        <div className={styles.notificationWrapper} style={{ position: "relative" }}>
            <div className={styles.dropdownMenu}>
                <div style={{ position: "relative" }}>
                    <IconButton
                        icon={<img className="w-[3rem] h-[3rem] object-cover object-center" src={notification} />}
                        width={48}
                        height={40}
                        borderRadius="50%"
                        onClick={toggleDropdown}
                    />
                    {countNotificationUnseen != 0 && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {countNotificationUnseen}
                        </div>
                    )}
                </div>
                {showDropdown && (
                    <div
                        style={{
                            position: "absolute",
                            top: "60px", // Đặt vị trí dropdown
                            right: "0",
                            backgroundColor: "white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            borderRadius: "4px",
                            zIndex: 1000,
                            overflowY: "auto",
                            height: "400px",
                        }}
                    >
                        <div className={styles.customDropdownItemTitle}>
                            {" "}
                            <span style={{ fontWeight: 600, fontSize: "20px", height: "20px" }}> Thông báo</span>
                            <span style={{ fontWeight: 600, fontSize: "12px", height: "40px" }}>Xem tất cả</span>
                        </div>
                        {Array.isArray(notificationData) &&
                            notificationData.map((item, index) => (
                                <div
                                    key={`notification-${index}`}
                                    className={`${styles.customDropdownItem} ${
                                        item.status === 0 ? "font-bold" : "font-normal"
                                    }`}
                                    onClick={() =>
                                        handleNotificationClick(
                                            item.notificationId,
                                            item.notification.moderationRequest.storyId
                                        )
                                    }
                                >
                                    <span className={styles.notificationConnect}>
                                        {item.notification.moderationRequest.reason &&
                                        item.notification.moderationRequest.reason.length > 25
                                            ? `${item.notification.moderationRequest.reason.substring(0, 25)}...`
                                            : item.notification.moderationRequest.reason || ""}
                                    </span>
                                    <span className={styles.notificationDate}>
                                        {moment(item.createdAt).format("DD/MM/YYYY")}
                                    </span>
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <ModalApproveStory
                show={showModalApprove}
                handleClose={() => setShowModalApprove(false)}
                story={storyDetail ?? ({} as Story)}
                setRefetch={() => setRefetch({ value: true })}
            />
        </div>
    );
}

export default memo(Notification);
