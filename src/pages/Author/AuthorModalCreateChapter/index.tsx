import React, { useState } from "react";
import styles from "./AuthorModalCreateChapter.module.scss";
import { AuthorModalCreateChapterProps } from "../AllInterface/interface";


const AuthorModalCreateChapter: React.FC<AuthorModalCreateChapterProps> = ({
    isOpen,
    onClose,
}) => {
    const [order, setOrder] = useState<number>(101);
    const [title, setTitle] = useState<string>("Chương 101");
    const [status, setStatus] = useState<string>("Tạo mới");
    const [storyTitle, setStoryTitle] = useState<string>("Yêu thần ký");

    const handleSubmit = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>Tạo chương mới</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </header>
                <div className={styles.modalBody}>
                    <label>
                        Số thứ tự
                        <input
                            type="text"
                            value={order}
                            disabled
                        />
                    </label>
                    <label>
                        Tên chương
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label>
                        Trạng thái
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Tạo mới">Tạo mới</option>
                            <option value="Đang phát hành">Đang phát hành</option>
                            <option value="Hoàn thành">Hoàn thành</option>
                        </select>
                    </label>
                    <label>
                        Tên truyện
                        <input
                            type="text"
                            value={storyTitle}
                            onChange={(e) => setStoryTitle(e.target.value)}
                        />
                    </label>
                </div>
                <footer className={styles.modalFooter}>
                    <button className="btn btn-success" onClick={handleSubmit}>
                        Lưu
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AuthorModalCreateChapter;