import React from "react";
import styles from "./AuthorStoryDetail.module.scss";
import AuthorModalChapterDetail from "../AuthorModalChapterDetail";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaInfoCircle } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AuthorModalCreateChapter from "../AuthorModalCreateChapter";
const AuthorStoryDetail = () => {
    const [showEditChapter, setShowEditChapter] = useState(false);
    const [showCreateChapter, setShowCreateChapter] = useState(false);
    const [search, setSearch] = useState("");
    const handlePageClick = () => {
        // props.fetchListUsersWithPage(+event.selected + 1);
        // props.setCurrentPage(+event.selected + 1);
    };
    return (
        <>
            <div className={styles.detailPage}>
                <div className={styles.headerStoryDetail}>
                    <span className={styles.titleStoryDetail}>Chi tiết truyện</span>
                    <button className="btn btn-success">Cập nhật</button>
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.leftPanel}>
                        <img
                            src="https://s3bucket2024aws.s3.ap-southeast-1.amazonaws.com/story/1/dai-phung-da-canh-nhan_1640593977.jpg"
                            alt="Cung thủ thiên tài"
                            className={styles.storyCover}
                        />
                    </div>
                    <div className={styles.rightPanel}>
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Cung thủ thiên tài</span>
                        <ul className={styles.storyInfo}>
                            <li>Giá: 1000đ/chương</li>
                            <li>Trạng thái: Đang phát hành</li>
                            <li>Lượt thích: 1,111</li>
                            <li>Lượt theo dõi: 2,222</li>
                            <li>Lượt xem: 10,000</li>
                            <li>Đánh giá: 100 lượt</li>
                        </ul>

                        <div className={styles.actionSpan}>
                            <span className={styles.customSpan}>Hành động</span>
                            <span className={styles.customSpan}>Kiếm hiệp</span>
                            <span className={styles.customSpan}>Chiến thuật</span>
                        </div>
                    </div>
                </div>
                <div className={styles.storySummary}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaInfoCircle style={{ fontSize: "20px", color: "var(--primary)" }} />
                        <span style={{ marginLeft: "8px" }}>Tóm tắt nội dung</span>
                    </div>
                    <p>Vào thời điểm tương lai, "Satisfy" một game thực tế ảo đỉnh đạt nhất thế giới...</p>
                </div>
                <div className={styles.chapterListHeader}>
                    <span>Danh sách chương</span>
                </div>
                <div className={styles.chapterList}>
                    <div className={styles.listHeader}>
                        <div className={styles.leftActions}>
                            <button className="btn btn-primary" onClick={() => setShowCreateChapter(true)}>
                                Thêm chương mới
                            </button>
                        </div>
                        <div className={styles.rightActions}>
                            <Form className={styles.customSearch} onSubmit={(event) => event.preventDefault()}>
                                <Form.Control
                                    type="search"
                                    placeholder="Tìm kiếm truyện"
                                    className={`${styles.searchInput} me-2`}
                                    aria-label="Search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    //onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </Form>
                            <select className={styles.filterDropdown}>
                                <option value="">Bộ lọc</option>
                                <option value="newest">Mới nhất</option>
                                <option value="oldest">Cũ nhất</option>
                                <option value="status">Trạng thái</option>
                            </select>
                        </div>
                    </div>
                    <table className={styles.chapterTable}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên chương</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array(10)
                                .fill(null)
                                .map((_, index) => (
                                    <tr key={index}>
                                        <td>{100 - index}</td>
                                        <td>Chương {100 - index}</td>
                                        <td>Tạo mới</td>
                                        <td>27/10/2024</td>
                                        <td>27/10/2024</td>
                                        <td className={styles.actionIcons}>
                                            <MdEdit
                                                className={styles.editIcon}
                                                onClick={() => setShowEditChapter(true)}
                                            />
                                            <RiDeleteBin6Line
                                                className={styles.deleteIcon}
                                                onClick={() => setShowEditChapter(true)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <AuthorModalChapterDetail
                        isOpen={showEditChapter}
                        onClose={() => setShowEditChapter(false)}
                        chapterTitle="Chương 2"
                        images={[]}
                    />
                    <AuthorModalCreateChapter isOpen={showCreateChapter} onClose={() => setShowCreateChapter(false)} />
                </div>
            </div>
            <div className={styles.storyPagination}>
                <ReactPaginate
                    nextLabel=" ->"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={10}
                    previousLabel="<- "
                    pageClassName={styles.pageItem}
                    pageLinkClassName={styles.pageLink}
                    previousClassName={styles.pageItem}
                    previousLinkClassName={styles.pageLink}
                    nextClassName={styles.pageItem}
                    nextLinkClassName={styles.pageLink}
                    breakLabel="..."
                    breakClassName={styles.pageItem}
                    breakLinkClassName={styles.pageLink}
                    containerClassName={styles.pagination}
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={1}
                />
            </div>
        </>
    );
};

export default AuthorStoryDetail;
