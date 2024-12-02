import React, { useEffect } from "react";
import styles from "./AuthorStoryDetail.module.scss";
import AuthorModalChapterImageDetail from "../AuthorModalChapterImageDetail";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaInfoCircle } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiListBulletsFill } from "react-icons/pi";
import AuthorModalCreateAndUpdateChapter from "../AuthorModalCreateAndUpdateChapter";
import { useLocation } from "react-router-dom";
import { Chapter, ChapterImage, Story } from "../AllInterface/interface";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { StoryStatus, StoryStatusLabels, StoryType, StoryTypeLabels } from "../AllEnum/enum";
import ModalDeleteChapter from "./ModalDeleteChapter";
import paths from "@routers/router.path";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const AuthorStoryDetail = () => {
    const location = useLocation();
    const take = 12;
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState<number>();
    const [typeFilter, setTypeFilter] = useState<number>();
    const [search, setSearch] = useState("");
    const [showEditChapterImage, setShowEditChapterImage] = useState(false);
    const [showModalCreateAndUpdateChapter, setShowModalCreateAndUpdateChapter] = useState(false);
    const [showDeleteChapter, setShowDeleteChapter] = useState(false);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [chapterList, setChapterList] = useState<any[]>([]);
    const [index, setIndex] = useState<number | null>(null);
    const storyId = location.state as { storyId: number };
    const [isUpdate, setIsUpdate] = useState(false);
    const { data: imageList, setRefetch: setRefetchImageList } = useFetch<ChapterImage[]>(
        apis.chapterImageApi.getChapterImages,
        {
            queries: {
                chapterId: chapterList?.[index ?? 0]?.cursor,
            },
        },
        false
    );

    useEffect(() => {
        if (index !== undefined && index !== null) {
            setRefetchImageList({ value: true });
        }
    }, [index]);

    const { data: storyDetail, setRefetch: setRefetchStoryDetail } = useFetch<Story>(
        apis.storyApi.getStoryDetail,
        {
            queries: {
                id: storyId,
            },
        },
        false
    );
    const getValues = (currentPage: number) => {
        return {
            take: take,
            page: currentPage,
            status: statusFilter,
            type: typeFilter,
            keyword: search,
            storyId: storyId,
        };
    };
    const { data: responseChapterList, setRefetch: setRefetchChapterList } = useFetch<Chapter[]>(
        apis.chapterApi.getChapterListForStory,
        {
            queries: getValues(currentPage),
        }
    );
    useEffect(() => {
        setRefetchStoryDetail({ value: true });
        setRefetchChapterList({ value: true });
    }, [storyId]);
    useEffect(() => {
        if (responseChapterList) {
            setChapterList((responseChapterList as any).edges);
            setTotalPage(Math.ceil((responseChapterList as any).totalCount / take));
        }
    }, [responseChapterList, currentPage]);

    const handlePageClick = (event: any) => {
        setCurrentPage(+event.selected + 1);
        setRefetchChapterList({ value: true });
    };

    const handleKeyDown = (event: any) => {
        if (search.length === 0) {
            return;
        }
        if (event && event.key === "Enter") {
            setRefetchChapterList({ value: true });
        }
    };
    const refetchData = () => {
        setSearch("");
        setStatusFilter(undefined);
        setCurrentPage(1);
        setTypeFilter(undefined);
        setRefetchChapterList({ value: true });
    };

    const handleFilter = (event: any) => {
        setStatusFilter(+event.target.value);
        setRefetchChapterList({ value: true });
    };

    const handleCreateChapter = () => {
        setIndex(null);
        setShowModalCreateAndUpdateChapter(true);
        setIsUpdate(false); // Đặt chế độ là create
    };

    const handleUpdateChapter = (index: number) => {
        setIndex(index);
        setShowModalCreateAndUpdateChapter(true);
        setIsUpdate(true); // Đặt chế độ là update
    };

    const handleChapterImageDetail = (index: number) => {
        setIndex(index);
        setShowEditChapterImage(true);
    };

    const handleDeleteChapter = (index: number) => {
        setShowDeleteChapter(true);
        setIndex(index);
    };
    return (
        <>
            <div className={styles.detailPage}>
                <div className={styles.headerStoryDetail}>
                    <span className={styles.titleStoryDetail}>Chi tiết truyện</span>
                    <button
                        className="btn btn-success"
                        onClick={() =>
                            navigate(paths.authorUpdateStory(storyId.toString()), { state: { story: storyDetail } })
                        }
                    >
                        Cập nhật
                    </button>
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.leftPanel}>
                        <img
                            src={`https://s3bucket2024aws.s3.ap-southeast-1.amazonaws.com/${storyDetail?.coverImage}`}
                            alt={storyDetail?.title}
                            className={styles.storyCover}
                        />
                    </div>
                    <div className={styles.rightPanel}>
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>{storyDetail?.title}</span>
                        <ul className={styles.storyInfo}>
                            <li>Giá: {storyDetail?.prices?.[storyDetail?.prices?.length - 1]?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ/chương</li>
                            <li>Quốc gia: {storyDetail?.country.name}</li>
                            <li>Loại truyện: {StoryTypeLabels[storyDetail?.type as StoryType]}</li>
                            <li>Trạng thái: {StoryStatusLabels[storyDetail?.status as StoryStatus]}</li>
                            <li>Lượt thích: </li>
                            <li>Lượt theo dõi: </li>
                            <li>Lượt xem: </li>
                            <li>Đánh giá: lượt</li>
                        </ul>

                        <div className={styles.actionSpan}>
                            {storyDetail?.genres.map((genre) => (
                                <span key={`genre-${genre.id}`} className={styles.customSpan}>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.storySummary}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaInfoCircle style={{ fontSize: "20px", color: "var(--primary)" }} />
                        <span style={{ marginLeft: "8px" }}>Tóm tắt nội dung</span>
                    </div>
                    <p>{storyDetail?.description}</p>
                </div>
                <div className={styles.chapterListHeader}>
                    <span>Danh sách chương</span>
                </div>
                <div className={styles.chapterList}>
                    <div className={styles.listHeader}>
                        <div className={styles.leftActions}>
                            <button className="btn btn-primary" onClick={handleCreateChapter}>
                                Thêm chương mới
                            </button>
                            <button className="btn btn-secondary" onClick={refetchData}>
                                Làm mới
                            </button>
                        </div>
                        <div className={styles.rightActions}>
                            <Form className={styles.customSearch} onSubmit={(event) => event.preventDefault()}>
                                <Form.Control
                                    type="search"
                                    placeholder="Tìm kiếm tên chương"
                                    className={`${styles.searchInput} me-2`}
                                    aria-label="Search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(event)}
                                />
                            </Form>
                            <select className={styles.filterDropdown} onChange={(event) => handleFilter(event)}>
                                <option disabled>Bộ lọc</option>
                                <option value="0">Chưa phát hành</option>
                                <option value="1">Yêu cầu phát hành</option>
                                <option value="2">Đang phát hành</option>
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
                            {chapterList.map((chapter, index) => (
                                <tr key={`chapter-${index}-${chapter.id}`}>
                                    <td>{chapter?.node?.order}</td>
                                    <td>{chapter?.node?.name}</td>
                                    <td>{StoryStatusLabels[chapter?.node?.status as StoryStatus]}</td>
                                    <td>{chapter?.node?.createdAt}</td>
                                    <td>{chapter?.node?.updatedAt}</td>
                                    <td className={styles.actionIcons}>
                                        <MdEdit
                                            className={styles.editIcon}
                                            onClick={() => handleUpdateChapter(index)}
                                        />
                                        <RiDeleteBin6Line
                                            className={styles.deleteIcon}
                                            onClick={() => handleDeleteChapter(index)}
                                        />
                                        <PiListBulletsFill
                                            className={styles.listIcon}
                                            onClick={() => handleChapterImageDetail(index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <AuthorModalChapterImageDetail
                        isOpen={showEditChapterImage}
                        onClose={() => setShowEditChapterImage(false)}
                        index={index ?? 0}
                        imageList={imageList ?? []}
                        chapter={chapterList?.[index ?? 0]?.node ?? {}}
                        setIndex={setIndex}
                        setRefetchImageList={() => setRefetchImageList({ value: true })}
                    />
                    <AuthorModalCreateAndUpdateChapter
                        isOpen={showModalCreateAndUpdateChapter}
                        onClose={() => setShowModalCreateAndUpdateChapter(false)}
                        storyId={+storyId}
                        isUpdate={isUpdate}
                        storyTitle={storyDetail?.title ?? ""}
                        title={isUpdate ? "Cập nhật chương" : "Thêm chương mới"}
                        chapterList={chapterList}
                        index={index ?? null}
                        setRefetchChapterList={setRefetchChapterList}
                        orderNew={
                            chapterList.length === 0
                                ? 1
                                : Math.max(...chapterList.map((chapter) => chapter.node.order)) + 1
                        }
                    />
                    <ModalDeleteChapter
                        isOpen={showDeleteChapter}
                        onClose={() => setShowDeleteChapter(false)}
                        chapterId={chapterList?.[index ?? 0]?.node?.id ?? 0}
                        chapterName={chapterList?.[index ?? 0]?.node?.name ?? ""}
                        setRefetchChapterList={setRefetchChapterList}
                    />
                </div>
            </div>
            <div className={styles.storyDetailPagination}>
                <ReactPaginate
                    nextLabel=" ->"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPage}
                    previousLabel="<- "
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
};

export default AuthorStoryDetail;
