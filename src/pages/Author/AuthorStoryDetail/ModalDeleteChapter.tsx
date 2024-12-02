import React, { useEffect, useState } from "react";
import { ModalDeleteChapterProps } from "../AllInterface/interface";
import apis from "@apis/index";
import useFetch from "@hooks/fetch.hook";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

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
        <Modal show={isOpen} onHide={onClose} animation={false} backdrop="static">
            <Modal.Header>
                <Modal.Title>Xóa chương</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>
                    Bạn có muốn xóa chương <span>{chapterName}</span> này không?
                </label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleDeleteChapter}>
                    Lưu
                </Button>
                <Button variant="danger" onClick={onClose}>
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDeleteChapter;
