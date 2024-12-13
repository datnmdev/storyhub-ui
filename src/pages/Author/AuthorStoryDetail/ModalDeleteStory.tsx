import React, { useEffect } from "react";
import { Story } from "../AllInterface/interface";
import apis from "@apis/index";
import useFetch from "@hooks/fetch.hook";
import { toast } from "react-toastify";
import styles from "./ModalDeleteChapter.module.scss";
import { useNavigate } from "react-router-dom";
import paths from "@routers/router.path";

interface ModalDeleteStory {
    isOpen: boolean;
    onClose: () => void;
    story: any;
}

const ModalDeleteStory: React.FC<ModalDeleteStory> = ({ isOpen, onClose, story }) => {
    const navigate = useNavigate();
    const { data: deleteStory, setRefetch: setRefetchDeleteStory } = useFetch<string>(
        apis.storyApi.deleteStory,
        {
            queries: { id: story?.id },
        },
        false
    );
    useEffect(() => {
        if (deleteStory) {
            toast.success("Xóa truyện thành công.");
            navigate(paths.authorHomePage());
        }
    }, [deleteStory]);
    const handleDeleteStory = () => {
        if (story.status == 2) {
            toast.error("Truyện đang phát hành không thế xóa.");
            return;
        } else if (story.status == 3) {
            toast.error("Truyện đã hoàn thành không thể xóa");
            return;
        }
        setRefetchDeleteStory({ value: true });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle}>Xóa chương</h2>
                <div className={styles.modalBody}>
                    <label>
                        Bạn có muốn xóa truyện <span>{story?.title}</span> không?
                    </label>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.btnSuccess} onClick={handleDeleteStory}>
                        Xóa
                    </button>
                    <button className={styles.btnDanger} onClick={onClose}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteStory;
