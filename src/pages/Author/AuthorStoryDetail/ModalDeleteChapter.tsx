import React, { useEffect } from "react";
import { ModalDeleteChapterProps } from "../AllInterface/interface";
import apis from "@apis/index";
import useFetch from "@hooks/fetch.hook";
import { toast } from "react-toastify";
import styles from "./ModalDeleteChapter.module.scss";

const ModalDeleteChapter: React.FC<ModalDeleteChapterProps> = ({
    isOpen,
    onClose,
    chapterId,
    chapterName,
    setRefetchChapterList,
}) => {
    const {
        data: deleteChapter,
        setRefetch: setRefetchDeleteChapter,
        isLoading: isDeletingChapter,
        error: deleteChapterError,
    } = useFetch(
        apis.chapterApi.deleteChapter,
        {
            queries: { id: chapterId },
        },
        false
    );

    useEffect(() => {
        if (deleteChapter) {
            setRefetchChapterList({ value: true });
            toast.success("Xóa chương thành công.");
            onClose();
        }
    }, [deleteChapter, deleteChapterError, setRefetchChapterList]);

    const handleDeleteChapter = () => {
        setRefetchDeleteChapter({ value: true });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle}>Xóa chương</h2>
                <div className={styles.modalBody}>
                    <label>
                        Bạn có muốn xóa chương <span>{chapterName}</span> này không?
                    </label>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.btnSuccess} onClick={handleDeleteChapter}>
                        Lưu
                    </button>
                    <button className={styles.btnDanger} onClick={onClose}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteChapter;
