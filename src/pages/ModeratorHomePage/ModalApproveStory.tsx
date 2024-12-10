import React, { useEffect, useState } from "react";
import styles from "./ModalApproveStory.module.scss";
import { Story } from "@pages/Author/AllInterface/interface";
import { StoryStatus, StoryStatusLabels, StoryType, StoryTypeLabels } from "@pages/Author/AllEnum/enum";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import WebSocketService from "@components/AuthorHeader/Socket/socket";
import ModalRejectStory from "./ModalRejectStory";
import TextEditor from "@components/TextEditorforAuthor";
interface ModalApproveStoryProps {
    isOpen: boolean;
    onClose: () => void;
    story: Story;
    moderationReq: any | null;
    webSocketService: WebSocketService;
}

const ModalApproveStory: React.FC<ModalApproveStoryProps> = ({
    isOpen,
    onClose,
    story,
    moderationReq,
    webSocketService,
}) => {
    const [showModalReject, setShowModalReject] = useState(false);
    const [reason, setReason] = useState("");
    if (!isOpen) return null;

    const handleApprove = () => {
        const reqId = moderationReq ? moderationReq.id : 0;
        const reqStatus = 1;
        const storyId = story?.id ?? 0;
        const storyStatus = 2;

        if (webSocketService) {
            webSocketService.handleModerationRequest(reqId, reqStatus, storyId, storyStatus, reason);
        }
        toast.success("Phê duyệt truyện thành công");
        onClose();
    };

    const handleReject = () => {
        const reqId = moderationReq ? moderationReq.id : 0;

        const reqStatus = 2;
        const storyId = story?.id ?? 0;
        const storyStatus = 0;

        if (webSocketService) {
            webSocketService.handleModerationRequest(reqId, reqStatus, storyId, storyStatus, reason);
        }
        toast.success("Truyện đã bị từ chối.");
        setShowModalReject(false);
        onClose();
    };
    return (
        <div className={styles.modalApproveStory}>
            <header className={styles.modalHeaderStoryDetail}>
                <span className={styles.customHeader}>Chi tiết truyện</span>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
            </header>
            <div className={styles.storyDetails} style={{ overflowY: "auto", height: "500px" }}>
                <div className={styles.infoTop}>
                    <img
                        src={`${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${story.coverImage}`}
                        alt={story.title}
                        className={styles.storyImage}
                    />
                    <div className={styles.approveStoryInfo}>
                        <span className={styles.customstotyTitle}>{story.title}</span>
                        {story.aliases && story.aliases.length > 0 && (
                            <span className={styles.customspan}>
                                Tên khác: {story.aliases.map((alias) => alias.name).join(", ")}
                            </span>
                        )}
                        <span className={styles.customspan}>Tác giả: {story?.author?.user.name}</span>
                        <span className={styles.customspan}>
                            Giá:
                            {story?.prices &&
                                story?.prices[story?.prices?.length - 1]?.amount
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            đ
                        </span>
                        <span className={styles.customspan}>
                            Loại truyện:{StoryTypeLabels[story?.type as StoryType]}
                        </span>
                        <span className={styles.customspan}>Quốc gia: {story?.country?.name}</span>
                        <span className={styles.customspan}>
                            Trạng thái: {StoryStatusLabels[story.status as StoryStatus]}
                        </span>
                    </div>
                </div>
                <div className={styles.actionSpanApproveStory}>
                    {story?.genres &&
                        story?.genres.slice(0, 5).map((genre) => (
                            <span key={`genre-${genre.id}`} className={styles.customSpanApproveStory}>
                                {genre.name}
                            </span>
                        ))}
                    {story?.genres && story?.genres.length > 5 && <span>.....</span>}
                </div>
                {story?.note && <div className={styles.storyNote}>Ghi chú: {story?.note}</div>}
                <div className={styles.storyDescription}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaInfoCircle style={{ fontSize: "20px", color: "var(--primary)" }} />
                        <strong style={{ marginLeft: "8px" }}>Tóm tắt nội dung</strong>
                    </div>
                    <TextEditor
                        value={story?.description}
                        height={240}
                        disabled={true}
                        placeholder=""
                        onChange={() => true}
                    />
                </div>
            </div>

            <footer className={styles.modalFooterStoryDetail}>
                {moderationReq && moderationReq.status == 0 ? (
                    <>
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
                    </>
                ) : (
                    <></>
                )}
            </footer>
            <ModalRejectStory
                isOpenShow={showModalReject}
                onCloseShow={() => setShowModalReject(false)}
                reason={reason}
                setReason={setReason}
                handleReject={() => handleReject()}
                check={1}
            />
        </div>
    );
};

export default ModalApproveStory;
