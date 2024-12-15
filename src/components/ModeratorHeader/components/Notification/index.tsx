import IconButton from "@components/IconButton";
import notification from "@assets/icons/static/notifiction.png";
import styles from "./Notification.module.scss";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { NotificationUser, Story } from "@pages/Author/AllInterface/interface";
import moment from "moment";
import { useSelector } from "react-redux";
import { AppRootState } from "@store/store.type";
import ModalApproveStory from "@pages/ModeratorHomePage/ModalApprpveStory";

function Notification() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [countNotificationUnseen, setCountNotificationUnseen] = useState<number | null>(null);
    const [notificationId, setNotificationId] = useState<number | null>(null);
    const [showModalApprove, setShowModalApprove] = useState(false);
    const [moderationReqDetail, setModerationReqDetail] = useState<any | null>(null);
    const webSocketService = useSelector((state: AppRootState) => state.webSocket.service);
    const profile = useAppSelector(authFeature.authSelector.selectUser);
    const [chapterDetail, setChapterDeatil] = useState<any | null>(null);

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
        const listenEvent = (mess: any) => {
            console.log("Yêu cầu kiểm duyệt mới nhận được:", mess);
            setRefetchNotification({ value: true });
        };

        if (webSocketService) {
            webSocketService.listenNewReviewRequestForModerator(listenEvent);
            webSocketService.listenStoryUpdateEventforModerator(listenEvent);
        }

        // Cleanup listener nếu cần
        return () => {
            // Logic để tắt lắng nghe nếu cần thiết
        };
    }, [webSocketService]);

    useEffect(() => {
        if (profile) {
            setRefetchNotification({ value: true });
        }
    }, [profile]);

    useEffect(() => {
        if (notificationId !== null) {
            setRefetchUpdateNotification({ value: true });
        }
    }, [notificationId]);

    useEffect(() => {
        if (updatedNotification) {
            setRefetchNotification({ value: true });
        }
    }, [updatedNotification]);

    const handleNotificationClick = (notificationId: number, chapter: any, moderationReq: any) => {
        setNotificationId(notificationId);
        setModerationReqDetail(moderationReq);
        setChapterDeatil(chapter);
        setShowModalApprove(true);
        setShowDropdown(false); // Đóng dropdown
    };

    useEffect(() => {
        if (notificationData) {
            const unreadNotificationsCount = notificationData.filter(
                (notification) => notification.status === 0
            ).length;
            setCountNotificationUnseen(unreadNotificationsCount != 0 ? unreadNotificationsCount : null);
        }
    }, [notificationData]);

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState); // Toggle trạng thái
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
                {countNotificationUnseen && countNotificationUnseen != 0 && (
                    <div className={styles.customCountNotification}>
                        {countNotificationUnseen && countNotificationUnseen > 999 ? "999+" : countNotificationUnseen}
                    </div>
                )}
            </div>
            {showDropdown && (
                <div className={styles.notificationDropdown}>
                    <h3 className={styles.title}>Thông báo</h3>
                    <div className={styles.list}>
                        {Array.isArray(notificationData) && notificationData.length > 0 ? (
                            notificationData.map((item, index) => (
                                <div
                                    key={`notification-${index}`}
                                    className={`${styles.item} ${item.status === 0 ? "font-bold" : "font-normal"}`}
                                    onClick={() =>
                                        handleNotificationClick(
                                            item.notificationId,
                                            item.notification.moderationRequest.chapter,
                                            item.notification.moderationRequest
                                        )
                                    }
                                >
                                    <span className={styles.mess}>
                                        {item.notification.moderationRequest.chapterId
                                            ? `Yêu cầu kiểm duyệt `
                                            : "Yêu cầu kiểm duyệt "}
                                    </span>
                                    <div>
                                        <span className={styles.mess} style={{ color: "blueviolet" }}>
                                            {item.notification.moderationRequest.chapterId
                                                ? `${item.notification.moderationRequest.chapter.name} truyện `
                                                : "chương mới"}
                                        </span>
                                        <span className={styles.mess} style={{ color: "blueviolet" }}>
                                            {item.notification.moderationRequest.chapterId
                                                ? `${item.notification.moderationRequest.chapter.story.title}`
                                                : ""}
                                        </span>
                                    </div>

                                    <span className={item.status === 0 ? "font-bold" : "font-normal"}>
                                        {moment(item.createdAt).format("DD/MM/YYYY")}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noNotification}>Không có thông báo nào.</div>
                        )}
                    </div>
                </div>
            )}
            <ModalApproveStory
                isOpen={showModalApprove}
                onClose={() => setShowModalApprove(false)}
                chapter={chapterDetail ?? {}}
                webSocketService={webSocketService}
                moderationReq={moderationReqDetail ?? null}
            />
        </div>
    );
}

export default memo(Notification);
