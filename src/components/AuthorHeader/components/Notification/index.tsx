import IconButton from "@components/IconButton";
import notification from "@assets/icons/static/notifiction.png";
import styles from "./Notification.module.scss";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { NotificationUser } from "@pages/Author/AllInterface/interface";
import moment from "moment";
import { useSelector } from "react-redux";
import { AppRootState } from "@store/store.type";
import { useNavigate } from "react-router-dom";
import paths from "@routers/router.path";
import { ModerationStatusLabels } from "@pages/Author/AllEnum/enum";
import { ModerationStatus } from "@pages/Author/AllEnum/enum";
import ModalRejectStory from "@pages/ModeratorHomePage/ModalRejectStory";

function Notification() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [countNotificationUnseen, setCountNotificationUnseen] = useState<number | null>(null);
    const [notificationId, setNotificationId] = useState<number | null>(null);
    const [showModalReject, setShowModalReject] = useState(false);
    const [reason, setReason] = useState("");
    const webSocketService = useSelector((state: AppRootState) => state.webSocket.service);
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

    const { data: updatedNotification, setRefetch: setRefetchUpdateNotification } = useFetch(
        apis.notificationUserApi.updateNotificationUser,
        {
            body: { receiverId: profile?.id, status: 1, notificationId: notificationId },
        },
        false
    );

    useEffect(() => {
        // Lắng nghe
        const listenEvent = (mess: any) => {
            console.log("Trạng thái truyện mới nhận được:", mess);
            setRefetchNotification({ value: true });
        };

        // Gọi hàm để lắng nghe
        if (webSocketService) {
            webSocketService.listenStoryUpdateEventForAuthor(listenEvent);
        }

        // Cleanup listener nếu cần
        return () => {
            // Nếu bạn muốn dọn dẹp, bạn có thể thêm logic để tắt lắng nghe
            // Tuy nhiên, trong trường hợp này, socket.on không cần phải tắt
        };
    }, [webSocketService]);

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
    }, [profile, notificationId, updatedNotification]);

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

    const handleNotificationClick = (notificationId: number, storyId: number, reason: string, statusReq: number) => {
        navigate(paths.authorStoryDetail(storyId.toString()), { state: storyId });
        setNotificationId(notificationId);
        setReason(reason);
        setShowDropdown(false); // Đóng dropdown
        if (statusReq == 2) {
            setShowModalReject(true);
        }
    };
    return (
        <div className={styles.notificationWrapper}>
            <div className={styles.iconNotification}>
                <IconButton
                    icon={<img className={styles.customImage} src={notification} />}
                    width={48}
                    height={40}
                    borderRadius="50%"
                    onClick={toggleDropdown}
                />
                {countNotificationUnseen != 0 && (
                    <div className={styles.customCountNotification}>
                        {countNotificationUnseen && countNotificationUnseen > 999 ? "999+" : countNotificationUnseen}
                    </div>
                )}
            </div>
            {showDropdown && (
                <div className={styles.notificationDropdown}>
                    <h3 className={styles.title}>Thông báo</h3>
                    <div className={styles.list}>
                        {Array.isArray(notificationData) &&
                            notificationData.slice(0, 20).map((item, index) => (
                                <div
                                    key={`notification-${index}`}
                                    className={`${styles.item} ${item.status === 0 ? "font-bold" : "font-normal"}`}
                                    onClick={() =>
                                        handleNotificationClick(
                                            item.notificationId,
                                            item.notification.moderationRequest.storyId,
                                            item.notification.moderationRequest.reason,
                                            item.notification.moderationRequest.status
                                        )
                                    }
                                >
                                    <span className={styles.notificationTitle}>
                                        Truyện {item.notification.moderationRequest.story.title}
                                    </span>
                                    <span className={styles.notificationStatus}>
                                        {
                                            ModerationStatusLabels[
                                                item.notification.moderationRequest.status as ModerationStatus
                                            ]
                                        }
                                    </span>
                                    <span className={styles.notificationDate}>
                                        {moment(item.createdAt).format("DD/MM/YYYY")}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            <ModalRejectStory
                isOpenShow={showModalReject}
                onCloseShow={() => setShowModalReject(false)}
                reason={reason}
                setReason={setReason}
                handleReject={() => true}
                check={0}
            />
        </div>
    );
}

export default memo(Notification);
