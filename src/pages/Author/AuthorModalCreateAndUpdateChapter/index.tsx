import React, { useEffect, useState } from "react";
import { AuthorModalCreateAndUpdateChapterProps, Chapter } from "../AllInterface/interface";
import apis from "@apis/index";
import useFetch from "@hooks/fetch.hook";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
    } = useFetch<Chapter>(apis.chapterApi.updateChapter, {
        body: {
            id: chapterList?.[index ?? 0]?.node?.id,
            order: order,
            name: titleChapter,
            status: status,
            storyId: storyId,
        },
    }, false);
    useEffect(() => {
        if (isUpdate && index != null) {
            setOrder(chapterList?.[index ?? 0]?.node?.order ?? 0);
            setTitleChapter(chapterList?.[index ?? 0]?.node?.name ?? "");
            setStatus(chapterList?.[index ?? 0]?.node?.status ?? 0);
        }
    }, [isUpdate, index]);
    useEffect(() => {
        setOrder(orderNew);
    }, [orderNew]);
    const checkValid = () => {
        if (order < 1) {
            toast.error("Vui lòng điền số thứ tự.");
            return false;
        }
        const isOrderDuplicate = chapterList.some((chapter, i) => chapter?.node?.order === order && (!isUpdate || i !== index));
        if (isOrderDuplicate) {
            toast.error("Số thứ tự đã bị trùng. Vui lòng nhập một số thứ tự khác.");
            return;
        }
        if (title.trim() === "") {
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
        <Modal show={isOpen} onHide={onClose} centered animation={false} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicOrder">
                        <Form.Label>Số thứ tự</Form.Label>
                        <Form.Control
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(+e.target.value.replace(/^0+/, ""))}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Tên chương</Form.Label>
                        <Form.Control
                            type="text"
                            value={titleChapter}
                            onChange={(e) => setTitleChapter(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicStatus">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Control as="select" value={status} onChange={(e) => setStatus(+e.target.value)}>
                            <option value="0">Chưa phát hành</option>
                            <option value="1">Yêu cầu phát hành</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicStoryTitle">
                        <Form.Label>Tên truyện</Form.Label>
                        <Form.Control type="text" value={storyTitle} disabled />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={isCreatingChapter}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AuthorModalCreateAndUpdateChapter;
