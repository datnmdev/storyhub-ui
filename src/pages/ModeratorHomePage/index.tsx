import React, { useEffect, useState } from "react";
import styles from "./ModeratorHomePage.module.scss";
import ReactPaginate from "react-paginate";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { Form } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import moment from "moment";
import { ModerationStatus, ModerationStatusLabels } from "@pages/Author/AllEnum/enum";
import ModalApproveStory from "./ModalApprpveStory";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "@store/store.type";
import authFeature from "@features/auth";
import { useAppSelector } from "@hooks/redux.hook";
const ModeratorHomePage = () => {
    const [search, setSearch] = useState("");
    const take = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [moderationReqs, setModerationReqs] = useState<any[]>([]);
    const [moderationReqDetail, setModerationReqDetail] = useState<any | null>(null);
    const [showModalApprove, setShowModalApprove] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState<any | undefined>(undefined);
    const profile = useAppSelector(authFeature.authSelector.selectUser);
    const webSocketService = useSelector((state: AppRootState) => state.webSocket.service);

    const getValues = (currentPage: number) => {
        return {
            take: take,
            page: currentPage,
            type: 0,
            keyword: search,
            moderatorId: profile?.id,
        };
    };
    const { data, isLoading, error, setRefetch } = useFetch(
        apis.moderatorReqApi.getAllModerationReq,
        {
            queries: getValues(currentPage),
        },
        false
    );

    useEffect(() => {
        setRefetch({ value: true });
    }, [profile]);

    useEffect(() => {
        if (data) {
            setModerationReqs((data as any).edges);
            setTotalPage(Math.ceil((data as any).totalCount / take));
        }
    }, [data, currentPage]);

    useEffect(() => {
        // Lắng nghe yêu cầu kiểm duyệt
        const listenEvent = (mess: any) => {
            console.log("Yêu cầu kiểm duyệt mới nhận được:", mess);
            setRefetch({ value: true });
        };

        // Gọi hàm để lắng nghe yêu cầu kiểm duyệt
        if (webSocketService) {
            webSocketService.listenStoryUpdateEventforModerator(listenEvent);
            webSocketService.listenNewReviewRequestForModerator(listenEvent);
        }

        // Cleanup listener nếu cần
        return () => {
            // Nếu bạn muốn dọn dẹp, bạn có thể thêm logic để tắt lắng nghe
            // Tuy nhiên, trong trường hợp này, socket.on không cần phải tắt
        };
    }, [webSocketService]);

    const handleRefetch = () => {
        setSearch("");
        setCurrentPage(1);
        setRefetch({ value: true });
    };

    const handlePageClick = (event: any) => {
        setCurrentPage(+event.selected + 1);
        setRefetch({ value: true });
    };

    const handleKeyDown = (event: any) => {
        if (search.length === 0) {
            return;
        }
        if (event && event.key === "Enter") {
            setRefetch({ value: true });
        }
    };

    const handleShowModal = (chapter: any, moderationReq: any) => {
        setModerationReqDetail(moderationReq);
        setSelectedChapter(chapter);
        setShowModalApprove(true);
    };

    return (
        <div className={styles.containerStoryModeration}>
            <h1 className={styles.titleStoryModeration}>Danh sách chương chờ phê duyệt</h1>
            <div className={styles.customHeader}>
                <button className={styles.btnPrimary} onClick={handleRefetch}>
                    Làm mới
                </button>
                <Form className={styles.searchStoryModeration} onSubmit={(event) => event.preventDefault()}>
                    <Form.Control
                        type="search"
                        placeholder="Tìm kiếm tên tác giả"
                        className={`${styles.searchInputStoryModeration} me-2`}
                        aria-label="Search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </Form>
            </div>

            <table className={styles.tableStoryModeration}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên chương</th>
                        <th>Tên truyện</th>
                        <th>Tên tác giả</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {moderationReqs &&
                        moderationReqs.length > 0 &&
                        moderationReqs.map((item, index) => (
                            <tr key={`story-${index}-${item.id}`}>
                                <td>{(currentPage - 1) * 10 + index + 1}</td>
                                <td>
                                    {item.node.chapter.story.length > 20
                                        ? `${item.node.chapter.story.title.substring(0, 20)}...`
                                        : item.node?.chapter?.story?.title}
                                </td>
                                <td>{item.node?.chapter?.name}</td>
                                <td>{item.node?.chapter?.story?.author?.user?.name}</td>
                                <td>{ModerationStatusLabels[item.node.status as ModerationStatus]}</td>
                                <td>{moment(item.node?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                                <td className={styles.actionStoryIcons}>
                                    <FaInfoCircle
                                        className={styles.editStoryIcon}
                                        onClick={() => handleShowModal(item.node?.chapter, item.node)}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {(moderationReqs.length >= 10 || currentPage >= 2) && (
                <div className={styles.storyModerationPagination}>
                    <ReactPaginate
                        nextLabel="Sau ->"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="<- Trước"
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
                        activeClassName={styles.active}
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                </div>
            )}
            <ModalApproveStory
                isOpen={showModalApprove}
                onClose={() => setShowModalApprove(false)}
                chapter={selectedChapter ?? {}}
                webSocketService={webSocketService}
                moderationReq={moderationReqDetail ?? null}
            />
        </div>
    );
};

export default ModeratorHomePage;
