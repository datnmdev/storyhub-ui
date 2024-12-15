import React, { useEffect, useState } from "react";
import styles from "./ModalAppoveStory.module.scss";
import { FaInfoCircle } from "react-icons/fa";
import { StoryStatus, StoryStatusLabels, StoryType, StoryTypeLabels } from "@pages/Author/AllEnum/enum";
import { toast } from "react-toastify";
import WebSocketService from "@components/AuthorHeader/Socket/socket";
import ModalRejectStory from "./ModalRejectStory";

interface ModalApproveStoryProps {
    isOpen: boolean;
    onClose: () => void;
    chapter: any;
    moderationReq: any | null;
    webSocketService: WebSocketService;
}

const ModalApproveStory: React.FC<ModalApproveStoryProps> = ({
    isOpen,
    onClose,
    chapter,
    moderationReq,
    webSocketService,
}) => {
    const [showModalReject, setShowModalReject] = useState(false);
    const [reason, setReason] = useState("");
    if (!isOpen) return null;

    const handleApprove = () => {
        const reqId = moderationReq ? moderationReq.id : 0;
        const reqStatus = 1;
        const storyId = chapter?.story?.id ?? 0;
        const storyStatus = 2;
        const chapterId = chapter?.id;
        const chapterStatus = 2;

        if (webSocketService) {
            webSocketService.handleModerationRequest(
                reqId,
                reqStatus,
                storyId,
                storyStatus,
                chapterId,
                chapterStatus,
                reason
            );
        }
        toast.success("Phê duyệt truyện thành công");
        onClose();
    };

    const handleReject = () => {
        const reqId = moderationReq ? moderationReq.id : 0;
        const reqStatus = 2;
        const storyId = chapter?.story?.id ?? 0;

        let storyStatus = null;
        if (chapter.story.status == 2) {
            storyStatus = 2;
        } else {
            storyStatus = 0;
        }
        const chapterId = chapter?.id;
        const chapterStatus = 0;

        if (webSocketService) {
            webSocketService.handleModerationRequest(
                reqId,
                reqStatus,
                storyId,
                storyStatus,
                chapterId,
                chapterStatus,
                reason
            );
        }
        toast.success("Truyện đã bị từ chối.");
        setShowModalReject(false);
        onClose();
    };

    return (
        <div className={styles.container}>
            {/* Left Side - Story Details */}
            <div className={styles.modalApproveStory}>
                <header className={styles.modalHeaderStoryDetail}>
                    <span className={styles.customHeader}>Chi tiết truyện</span>
                </header>
                <div className={styles.storyDetails} style={{ overflowY: "auto", height: "500px" }}>
                    <div className={styles.infoTop}>
                        <img
                            src={`${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${
                                chapter?.story.coverImage
                            }`}
                            alt={chapter?.story.title}
                            className={styles.storyImage}
                        />
                        <div className={styles.approveStoryInfo}>
                            <span className={styles.customstotyTitle}>{chapter?.story.title}</span>
                            {chapter?.story.aliases && chapter?.story.aliases.length > 0 && (
                                <span className={styles.customspan}>
                                    Tên khác:{" "}
                                    {chapter?.story?.aliases &&
                                        chapter?.story.aliases.map((alias: { name: string }) => alias.name).join(", ")}
                                </span>
                            )}
                            <span className={styles.customspan}>Tác giả: {chapter?.story?.author?.user.name}</span>
                            <span className={styles.customspan}>
                                Giá:
                                {chapter?.story?.prices &&
                                    chapter?.story?.prices[chapter?.story?.prices?.length - 1]?.amount
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                đ
                            </span>
                            <span className={styles.customspan}>
                                Loại truyện: {StoryTypeLabels[chapter?.story?.type as StoryType]}
                            </span>
                            <span className={styles.customspan}>Quốc gia: {chapter?.story?.country?.name}</span>
                        </div>
                    </div>
                    <div className={styles.actionSpanApproveStory}>
                        {chapter?.story?.genres &&
                            chapter?.story?.genres.slice(0, 5).map((genre: { name: string }) => (
                                <span key={genre.name} className={styles.customSpanApproveStory}>
                                    {genre.name}
                                </span>
                            ))}
                        {chapter?.story?.genres && chapter?.story?.genres.length > 5 && <span>.....</span>}
                    </div>
                    {/* {story?.note && <div className={styles.storyNote}>Ghi chú: {story?.note}</div>} */}
                    <div className={styles.storyDescription}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <FaInfoCircle style={{ fontSize: "20px", color: "var(--primary)" }} />
                            <strong style={{ marginLeft: "8px" }}>Tóm tắt nội dung</strong>
                        </div>
                        <div
                            className={styles.customDesc}
                            dangerouslySetInnerHTML={{
                                __html: chapter?.story?.description ? chapter?.story?.description : "",
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Right Side - Chapter Form */}
            <div className={styles.modalChapter}>
                <header className={styles.modalHeader}>
                    <span className={styles.customHeader}>{chapter.name}</span>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </header>
                <div className={styles.modalBody}>
                    <div className={styles.customdiv}>
                        <label className={styles.customlabel}>
                            Trạng thái: {StoryStatusLabels[chapter.status as StoryStatus]}
                        </label>
                    </div>
                    <div className={styles.customTextEditor}>
                        <label className={styles.customlabel}>Nội dung</label>
                        {chapter?.story?.type === 0 ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: chapter?.content ? chapter?.content : "Không có nội dung chương",
                                }}
                            ></div>
                        ) : (
                            <div className={styles.customListImage}>
                                {chapter?.chapterImages?.map((image: any) => (
                                    <img
                                        key={`${image.id}-chapter-image`}
                                        src={`${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${
                                            image.path
                                        }`}
                                        alt="Chapter Image"
                                        className={styles.customImage}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {moderationReq && moderationReq.status == 0 ? (
                    <footer className={styles.modalFooter}>
                        <button className={styles.btnPrimary} onClick={handleApprove} disabled={showModalReject}>
                            Phê duyệt
                        </button>
                        <button
                            className={styles.btnDanger}
                            onClick={() => setShowModalReject(true)}
                            disabled={showModalReject}
                        >
                            Từ chối
                        </button>
                    </footer>
                ) : (
                    <></>
                )}
                <ModalRejectStory
                    isOpenShow={showModalReject}
                    onCloseShow={() => setShowModalReject(false)}
                    reason={reason}
                    setReason={setReason}
                    handleReject={() => handleReject()}
                    check={1}
                />
            </div>
        </div>
    );
};

export default ModalApproveStory;
