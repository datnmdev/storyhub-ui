import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./ModalApproveStory.module.scss";
import { Story, Alias } from "@pages/Author/AllInterface/interface";
import { StoryType, StoryTypeLabels } from "@pages/Author/AllEnum/enum";
import { FaInfoCircle } from "react-icons/fa";
import TextEditor from "@components/TextEditorforAuthor";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AppRootState } from "@store/store.type";
interface ModalApproveStoryProps {
    show: boolean;
    handleClose: () => void;
    story: Story;
    setRefetch: () => void;
}

const ModalApproveStory: React.FC<ModalApproveStoryProps> = ({ show, handleClose, story, setRefetch }) => {
    const [showModalReject, setShowModalReject] = useState(false);
    const [storyTemp, setStoryTemp] = useState<Story>();
    const [reason, setReason] = useState("");
    const webSocketService = useSelector((state: AppRootState) => state.webSocket.service);
    useEffect(() => {
        if (story) {
            setStoryTemp(story);
        }
    }, [story]);

    const handleApprove = () => {
        const reqId =
            story != undefined && story?.moderationRequests?.length > 0
                ? story.moderationRequests[story.moderationRequests.length - 1].id
                : 0;
        const reqStatus = 1;
        const storyId = story?.id ?? 0;
        const storyStatus = 2;

        if (webSocketService) {
            webSocketService.handleModerationRequest(reqId, reqStatus, storyId, storyStatus, reason);
        }
        toast.success("Phê duyệt truyện thành công");
        handleClose();
    };

    const handleReject = () => {
        if (reason === "") {
            toast.error("Vui lòng nhập lý do từ chối duyệt truyện");
            return;
        }
        const reqId =
            storyTemp != undefined && storyTemp?.moderationRequests?.length > 0
                ? storyTemp.moderationRequests[storyTemp.moderationRequests.length - 1].id
                : 0;
        const reqStatus = 2;
        const storyId = story?.id ?? 0;
        const storyStatus = 0;

        if (webSocketService) {
            webSocketService.handleModerationRequest(reqId, reqStatus, storyId, storyStatus, reason);
        }
        toast.success("Truyện đã bị từ chối.");
        setShowModalReject(false);
    };

    useEffect(() => {
        // Lắng nghe yêu cầu kiểm duyệt
        const listenEvent = (mess: any) => {
            console.log("Yêu cầu kiểm duyệt mới nhận được:", mess);
            setRefetch();
        };

        // Gọi hàm để lắng nghe yêu cầu kiểm duyệt
        if (webSocketService) {
            webSocketService.listenStoryUpdateEventforModerator(listenEvent);
        }

        // Cleanup listener nếu cần
        return () => {
            // Nếu bạn muốn dọn dẹp, bạn có thể thêm logic để tắt lắng nghe
            // Tuy nhiên, trong trường hợp này, socket.on không cần phải tắt
        };
    }, [webSocketService]);

    const handleShowReject = () => {
        setShowModalReject(true);
        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                className={styles.modalApproveStory}
                animation={false}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Phê duyệt truyện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.storyDetails} style={{ overflowY: "auto", height: "400px" }}>
                        <div className={styles.infoTop}>
                            <img
                                src={`${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${
                                    story.coverImage
                                }`}
                                alt={story.title}
                                className={styles.storyImage}
                            />
                            <div className={styles.approveStoryInfo}>
                                <span style={{ fontSize: "20px", fontWeight: "bold" }}>{story.title}</span>
                                <span>
                                    <strong>Tên khác: </strong>
                                    {story?.aliases && story?.aliases?.map((alias: Alias) => alias.name).join(", ")}
                                </span>
                                <span>
                                    <strong>Tác giả:</strong> {story?.author?.user.name}
                                </span>
                                <span>
                                    <strong>Giá:</strong>{" "}
                                    {story?.prices &&
                                        story?.prices[story?.prices?.length - 1]?.amount
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    đ
                                </span>
                                <span>
                                    <strong>Loại truyện:</strong> {StoryTypeLabels[story?.type as StoryType]}
                                </span>
                                <span>
                                    <strong>Quốc gia:</strong> {story?.country?.name}
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
                        <div className={styles.storyNote}>
                            <strong>Ghi chú:</strong> {story?.note}
                        </div>
                        <div className={styles.storyDescription}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FaInfoCircle style={{ fontSize: "20px", color: "var(--primary)" }} />
                                <strong style={{ marginLeft: "8px" }}>Tóm tắt nội dung</strong>
                            </div>
                            <p>{story?.description}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {story && story.status === 1 && (
                        <>
                            <Button variant="primary" onClick={handleApprove}>
                                Phê duyệt
                            </Button>
                            <Button variant="danger" onClick={handleShowReject}>
                                Từ chối
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
            <Modal
                show={showModalReject}
                onHide={() => setShowModalReject(false)}
                className={styles.modalRejectStory}
                animation={false}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Từ chối duyệt truyện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                        Lý do:
                        <TextEditor
                            value={reason}
                            height={240}
                            placeholder="Nhập lý do từ chối duyệt truyện"
                            disabled={false}
                            onChange={(value) => setReason(value)}
                        />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleReject}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalApproveStory;
