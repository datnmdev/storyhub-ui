import React from "react";
import styles from "./ModalRejectStory.module.scss";
import { toast } from "react-toastify";
import TextEditor from "@components/TextEditorforAuthor";
interface ModalRejectStoryProps {
    isOpenShow: boolean;
    onCloseShow: () => void;
    reason: string;
    setReason: (reason: string) => void;
    handleReject: () => void;
    check: number;
}

const ModalRejectStory: React.FC<ModalRejectStoryProps> = ({
    isOpenShow,
    onCloseShow,
    reason,
    setReason,
    handleReject,
    check,
}) => {
    if (!isOpenShow) return null;

    const handleSubmit = () => {
        if (!reason) {
            toast.error("Vui lòng nhập lý do từ chối truyện.");
            return;
        }
        handleReject();
    };

    return (
        <div className={styles.ModalRejectStory}>
            <header className={styles.modalHeader}>
                <span className={styles.customHeader}>Lí do từ chối duyệt truyện</span>
                <button className={styles.closeButton} onClick={onCloseShow}>
                    &times;
                </button>
            </header>

            <TextEditor
                value={reason}
                height={240}
                placeholder="Nhập lý do từ chối duyệt truyện"
                disabled={check !== 1}
                onChange={(value) => setReason(value)}
            />

            <footer className={styles.modalFooter}>
                {check && check == 1 && (
                    <button className={styles.btnPrimary} onClick={handleSubmit}>
                        Lưu
                    </button>
                )}
            </footer>
        </div>
    );
};

export default ModalRejectStory;