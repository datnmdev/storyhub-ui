import React, { useEffect, useState } from "react";
import { AuthorModalCreateAndUpdateChapterProps, Chapter } from "../AllInterface/interface";
import apis from "@apis/index";
import useFetch from "@hooks/fetch.hook";
import { toast } from "react-toastify";
import styles from "./ModalCreateAndUpdateChapter.module.scss";
const AuthorModalCreateAndUpdateChapter: React.FC<AuthorModalCreateAndUpdateChapterProps> = ({
    isOpen,
    onClose,
    storyId,
    chapterList,
    storyTitle,
    title,
    isUpdate,
    index,
    orderNew,
    setRefetchChapterList,
}) => {
    const [order, setOrder] = useState<number>(0);
    const [titleChapter, setTitleChapter] = useState<string>("");
    const [status, setStatus] = useState<number>(0);

    const {
        data: createChapter,
        setRefetch: setRefetchCreateChapter,
        isLoading: isCreatingChapter,
        error: createChapterError,
    } = useFetch<Chapter>(
        apis.chapterApi.createChapter,
        {
            body: {
                order: order,
                name: titleChapter,
                status: status,
                storyId: storyId,
            },
        },
        false
    );

    const {
        data: updateChapter,
        setRefetch: setRefetchUpdateChapter,
        isLoading: isUpdatingChapter,
        error: updateChapterError,
    } = useFetch<Chapter>(
        apis.chapterApi.updateChapter,
        {
            body: {
                id: chapterList?.[index ?? 0]?.node?.id,
                order: order,
                name: titleChapter,
                status: status,
                storyId: storyId,
            },
        },
        false
    );
    useEffect(() => {
        if (isUpdate && index != null) {
            setOrder(chapterList?.[index ?? 0]?.node?.order ?? 0);
            setTitleChapter(chapterList?.[index ?? 0]?.node?.name ?? "");
            setStatus(chapterList?.[index ?? 0]?.node?.status ?? 0);
        }
    }, [isUpdate, index]);

    useEffect(() => {
        if (orderNew && isUpdate == false) {
            setTitleChapter("");
            setStatus(0);
            setOrder(orderNew);
        }
    }, [orderNew, index]);
    const checkValid = () => {
        if (order < 1) {
            toast.error("Vui lòng điền số thứ tự.");
            return false;
        }
        const isOrderDuplicate = chapterList.some(
            (chapter, i) => chapter?.node?.order === order && (!isUpdate || i !== index)
        );
        if (isOrderDuplicate) {
            toast.error("Số thứ tự đã bị trùng. Vui lòng nhập một số thứ tự khác.");
            return;
        }
        if (!titleChapter) {
            toast.error("Vui lòng điền tên chương.");
            return false;
        }
        return true;
    };
    useEffect(() => {
        if (createChapter) {
            setRefetchChapterList({ value: true });
            toast.success("Tạo chương thành công.");
            onClose();
            setOrder(0);
            setTitleChapter("");
            setStatus(0);
        }
    }, [createChapter, createChapterError, setRefetchChapterList]);

    useEffect(() => {
        if (updateChapter) {
            setRefetchChapterList({ value: true });
            toast.success("Cập nhật chương thành công.");
            onClose();
        }
    }, [updateChapter, updateChapterError, setRefetchChapterList]);

    const handleRefetchData = () => {
        onClose();
    };
    const handleSubmit = () => {
        if (!checkValid()) {
            return;
        }
        if (isUpdate && index != null) {
            setRefetchUpdateChapter({ value: true });
        } else {
            setRefetchCreateChapter({ value: true });
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>{title}</h2>
                    <button
                        className={styles.closeButton}
                        onClick={() => {
                            handleRefetchData();
                        }}
                    >
                        &times;
                    </button>
                </header>
                <div className={styles.modalBody}>
                    <label>
                        Số thứ tự
                        <input type="text" value={order} disabled />
                    </label>
                    <label>
                        Tên chương
                        <input type="text" value={titleChapter} onChange={(e) => setTitleChapter(e.target.value)} />
                    </label>
                    <label>
                        Trạng thái
                        <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
                            {status === 0 && <option value="0">Chưa phát hành</option>}
                            <option value="2">Phát hành</option>
                            {status === 0 && <option value="3">Xóa</option>}
                        </select>
                    </label>
                    <label>
                        Tên truyện
                        <input type="text" value={storyTitle} disabled />
                    </label>
                </div>
                <footer className={styles.modalFooter}>
                    <button className={styles.btnSuccess} onClick={handleSubmit} disabled={isCreatingChapter}>
                        Lưu
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AuthorModalCreateAndUpdateChapter;
