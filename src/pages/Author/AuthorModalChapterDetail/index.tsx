import React, { useState } from "react";
import styles from "./ModalChapterDetail.module.scss";
import { Image, ModalChapterDetailProps } from "../AllInterface/interface";


const ModalChapterDetail: React.FC<ModalChapterDetailProps> = ({
    isOpen,
    onClose,
    chapterTitle,
    images,
    onAddClick,
    onDeleteAllClick,
}) => {
    const [selectedImage, setSelectedImage] = useState<Image | null>(images[0] || null);

    if (!isOpen) return null;
    const images1 = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        src: `https://s3bucket2024aws.s3.ap-southeast-1.amazonaws.com/story/1/dai-phung-da-canh-nhan_1640593977.jpg`,
    }));
    return (
        <div className={styles.modalChapterDetail}>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>{chapterTitle}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </header>
                <footer className={styles.modalFooter}>
                    <button className={styles.addButton} onClick={onAddClick}>
                        Thêm
                    </button>
                    <button className={styles.deleteAllButton} onClick={onDeleteAllClick}>
                        Xóa tất cả
                    </button>
                </footer>
                <div className={styles.modalBody}>
                    {/* Left: Grid of Images */}
                    <div className={styles.imageGrid}>
                        {images1.map((image) => (
                            <div
                                key={image.id}
                                className={`${styles.imageItem} ${selectedImage?.id === image.id ? styles.active : ""}`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image.src} alt={`Page ${image.id}`} />
                                <p>Page {image.id}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Selected Image */}
                    <div className={styles.imagePreview}>
                        <label>Số trang</label>
                        <div className={styles.headerImagePreview}>
                            <div className={styles.titleImagePreview}>
                                <input type="number" name="pageNumber" disabled value={selectedImage?.id} />
                            </div>

                            <div className={styles.buttonPreview}>
                                <button className="btn btn-primary">Cập nhật</button>
                                <button className="btn btn-danger">Xóa</button>
                            </div>
                        </div>
                        <div className={styles.bodyImagePreview}>
                            {selectedImage ? (
                                <img src={selectedImage.src} alt={`Selected Page ${selectedImage.id}`} />
                            ) : (
                                <p>No image selected</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalChapterDetail;
