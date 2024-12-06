import React, { useEffect, useState } from "react";
import styles from "./ModalChapterImageDetail.module.scss";
import { Chapter, ChapterImage } from "../AllInterface/interface";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
    useFetchCreateImage,
    useFetchDeleteImage,
    useFetchListUrlUploadFileForChapter,
    useFetchUpdateOrderImage,
} from "./useFetch";
import "bootstrap/dist/css/bootstrap.min.css";
export interface ModalChapterImageDetailProps {
    isOpen: boolean;
    onClose: () => void;
    index: number | null;
    setIndex: (value: number | null) => void;
    chapter: Chapter;
    imageList: ChapterImage[];
    setRefetchImageList: () => void;
}
const ModalChapterImageDetail: React.FC<ModalChapterImageDetailProps> = ({
    isOpen,
    onClose,
    chapter,
    imageList,
    setIndex,
    setRefetchImageList,
}) => {
    const [selectedImage, setSelectedImage] = useState<ChapterImage | null>(null);
    const [imageOldList, setImageOldList] = useState<ChapterImage[]>([]);
    const [imageNewList, setImageNewList] = useState<any[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);
    const [dataForFileUploads, setDataForFileUploads] = useState<any[]>([]);
    const [dataDeleteImage, setDataDeleteImage] = useState<any>({});
    const {
        data: createImage,
        setRefetch: setRefetchCreateImage,
        isLoading: isCreatingImage,
        error: createImageError,
    } = useFetchCreateImage(imageNewList);

    const {
        data: listUrlUploadFileForChapter,
        setRefetch: setRefetchListUrlUploadFileForChapter,
        isLoading: isLoadingListUrlUploadFileForChapter,
        error: listUrlUploadFileForChapterError,
    } = useFetchListUrlUploadFileForChapter(dataForFileUploads);

    const {
        data: deleteImage,
        setRefetch: setRefetchDeleteImage,
        isLoading: isLoadingDeleteImage,
        error: deleteImageError,
    } = useFetchDeleteImage(dataDeleteImage);

    const {
        data: updateOrderImage,
        setRefetch: setRefetchUpdateOrderImage,
        isLoading: isLoadingUpdateOrderImage,
        error: updateOrderImageError,
    } = useFetchUpdateOrderImage(selectedImage as ChapterImage);

    useEffect(() => {
        if (createImage) {
            setRefetchListUrlUploadFileForChapter({ value: true });
        }
    }, [createImage, createImageError]);

    useEffect(() => {
        const uploadFilesImageForChapter = async () => {
            if (listUrlUploadFileForChapter && fileList.length > 0) {
                for (const [index, url] of listUrlUploadFileForChapter.uploadUrls.entries()) {
                    const file = fileList[index];
                    await uploadFile(url, file.file, file.fileType);
                }
                toast.success("Thêm hình ảnh chương thành công.");
                setFileList([]);
                setDataForFileUploads([]);
                setImageNewList([]);
            } else if (listUrlUploadFileForChapterError) {
                toast.error("Upload ảnh chương thất bại.");
            }
        };
        uploadFilesImageForChapter();
    }, [listUrlUploadFileForChapter, listUrlUploadFileForChapterError]);

    const uploadFile = async (url: string, file: Blob, fileType: string) => {
        const uploadResult = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": fileType,
            },
            body: file,
        });
        if (uploadResult.ok) {
            console.log("Uploaded File:", uploadResult);
        } else {
            throw new Error("Upload ảnh chương thất bại.");
        }
    };

    useEffect(() => {
        if (imageList) {
            setImageOldList(imageList);
        }
    }, [imageList]);

    useEffect(() => {
        if (deleteImage) {
            setDataDeleteImage({});
            toast.success("Xóa hình ảnh chương thành công.");
        }
    }, [deleteImage, deleteImageError]);

    useEffect(() => {
        if (updateOrderImage) {
            toast.success("Cập nhật số thứ tự hình ảnh thành công.");
            setRefetchImageList();
        }
    }, [updateOrderImage, updateOrderImageError]);

    const handleOnchangeImg = async (event: any) => {
        const files = event.target.files;
        if (files && chapter && chapter.storyId) {
            let order = imageList.length === 0 ? 0 : Math.max(...imageList.map((image) => image.order)) + 1;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                let objectUrl = window.URL.createObjectURL(file);
                const uniqueFileName = `${uuidv4()}.${file.type.split("/")[1]}`;

                const newImage = {
                    id: imageList.length === 0 ? 1 : Math.max(...imageList.map((image) => image.id)) + 1,
                    chapterId: chapter.id,
                    path: objectUrl,
                    order: order,
                };
                setImageOldList((prev) => [...prev, newImage]);

                imageNewList.push({
                    order: order,
                    path: `@internal:aws-s3:story/${chapter.storyId}/chapter/${chapter.id}/${uniqueFileName}`,
                    chapterId: chapter.id,
                });

                const dataForFileUpload = {
                    storyId: chapter.storyId,
                    chapterId: chapter.id,
                    fileName: uniqueFileName,
                };
                setDataForFileUploads((prev) => [...prev, dataForFileUpload]);

                const dataFile = {
                    file: file,
                    fileType: file.type.split("/")[1],
                };
                setFileList((prev) => [...prev, dataFile]);

                order++;
            }
        } else {
            toast.error("Vui lòng chọn file");
            console.log("chapter", chapter);
        }
    };

    if (!isOpen) return null;

    const handleClose = () => {
        if (imageOldList.length > imageList.length) {
            toast.error("Vui lòng Lưu hình ảnh trước khi đóng");
            return;
        }
        setSelectedImage(null);
        onClose();
        setIndex(null);
        setFileList([]);
        setDataForFileUploads([]);
        setImageNewList([]);
    };

    const handleDeleteImage = (order: number) => {
        if (order === -1) {
            toast.error("Vui lòng chọn hình ảnh để xóa");
            return;
        }
        setSelectedImage(null);
        if (imageList.some((image) => image.order === order)) {
            const dataDelete = {
                id: imageList.find((image) => image.order === order)?.id,
                fileName: imageList.find((image) => image.order === order)?.path,
            };
            setDataDeleteImage(dataDelete);
            setRefetchDeleteImage({ value: true });
        }
        let indexDelete: number | null = null;
        const updatedImageList = imageOldList.filter((image) => image.order !== order);
        setImageOldList(updatedImageList);

        const updatedImageNewList = imageNewList.filter((image, index) => {
            if (image.order === order) {
                indexDelete = index;
                return false;
            }
            return true;
        });
        setImageNewList(updatedImageNewList);

        const updatedDataForFileUploads = dataForFileUploads.filter((data, index) => index !== indexDelete);
        setDataForFileUploads(updatedDataForFileUploads);
    };
    const handleUpdateOrder = (event: any, id: number) => {
        const order = +event.target.value;

        if (id === 0) {
            toast.error("Vui lòng chọn hình ảnh để cập nhật.");
            return;
        } else if (!imageList.some((image) => image.id === id)) {
            const imageToUpdate = imageNewList.find((image) => image.id === id);
            if (imageToUpdate) {
                imageToUpdate.order = order;
            }
        }
        if (selectedImage) {
            setSelectedImage({
                ...selectedImage,
                order: order,
            });
        }
    };

    const handleUpdateOrderOfImage = () => {
        if (!selectedImage) {
            toast.error("Vui lòng chọn hình ảnh để cập nhật.");
            return;
        }
        if (selectedImage?.order && imageOldList.some((image) => image.order === selectedImage?.order)) {
            toast.error("Số thứ tự hình ảnh đã tồn tại.");
            return;
        }

        setRefetchUpdateOrderImage({ value: true });
    };

    const handleSave = () => {
        setRefetchCreateImage({ value: true });
        onClose();
        setIndex(null);
        setSelectedImage(null);
    };
    return (
        <div className={styles.modalChapterDetail}>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>{chapter.name}</h2>
                    <button className={styles.closeButton} onClick={() => handleClose()}>
                        &times;
                    </button>
                </header>
                <footer className={styles.modalFooter}>
                    <input id="previewImg" type="file" hidden multiple onChange={(event) => handleOnchangeImg(event)} />
                    <button className="btn btn-primary" onClick={() => document.getElementById("previewImg")?.click()}>
                        Thêm ảnh
                    </button>
                    <button className="btn btn-success" onClick={handleSave} disabled={isCreatingImage}>
                        Lưu
                    </button>
                </footer>
                <div className={styles.modalBody}>
                    {/* Left: Grid of Images */}
                    <div className={styles.imageGrid}>
                        {imageOldList && imageOldList.length > 0 ? (
                            imageOldList.map((image: ChapterImage) => (
                                <div
                                    key={`${image.id}-${image.order}`}
                                    className={`${styles.imageItem} ${
                                        selectedImage?.id === image.id ? styles.active : ""
                                    }`}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={
                                            image.path.startsWith("/url-resolver")
                                                ? `${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${
                                                      image.path
                                                  }`
                                                : image.path
                                        }
                                        alt={`Page ${image.id}`}
                                    />
                                    <p>{image.order}</p>
                                </div>
                            ))
                        ) : (
                            <p>Không có hình ảnh nào.</p>
                        )}
                    </div>

                    {/* Right: Selected Image */}
                    <div className={styles.imagePreview}>
                        <label>Số trang</label>
                        <div className={styles.headerImagePreview}>
                            <div className={styles.titleImagePreview}>
                                <input
                                    type="number"
                                    name="pageNumber"
                                    value={selectedImage?.order}
                                    onChange={(event) => handleUpdateOrder(event, selectedImage?.id ?? 0)}
                                />
                            </div>

                            <div className={styles.buttonPreview}>
                                <button className="btn btn-primary" onClick={handleUpdateOrderOfImage}>
                                    Cập nhật
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteImage(selectedImage?.order ?? -1)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                        <div className={styles.bodyImagePreview}>
                            {selectedImage && selectedImage.path ? (
                                <img
                                    src={
                                        selectedImage.path.startsWith("/url-resolver")
                                            ? `${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${
                                                  selectedImage.path
                                              }`
                                            : selectedImage.path
                                    }
                                    alt={`Selected Page ${selectedImage.order}`}
                                />
                            ) : (
                                <p>Không có hình ảnh nào được chọn</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalChapterImageDetail;
