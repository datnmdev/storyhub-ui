import React, { useEffect, useMemo, useState } from "react";
import styles from "./ModeratorHomePage.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { Form } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import moment from "moment";
import { StoryStatus } from "@pages/Author/AllEnum/enum";
import { StoryStatusLabels } from "@pages/Author/AllEnum/enum";
import ModalApproveStory from "./ModalApproveStory";
import { Story } from "@pages/Author/AllInterface/interface";
import Notification from "@components/ModeratorHeader/components/Notification";
import { setWebSocketService } from "@store/webSocketSlice";
import WebSocketService from "@components/AuthorHeader/Socket/socket";
import authFeature from "@features/auth";
import { useAppSelector } from "@hooks/redux.hook";
import { useDispatch } from "react-redux";
const ModeratorHomePage = () => {
    const dispatch = useDispatch(); 
    const [search, setSearch] = useState("");
    const take = 12;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [stories, setStories] = useState<any[]>([]);
    const [showModalApprove, setShowModalApprove] = useState(false);
    const [selectedStory, setSelectedStory] = useState<Story | undefined>(undefined);
    const profile = useAppSelector(authFeature.authSelector.selectUser);
    useEffect(() => {
        if (profile) {
            const webSocketService = new WebSocketService(profile.id.toString());
            dispatch(setWebSocketService(webSocketService));
        } else {
            dispatch(setWebSocketService(null)); // Nếu không có profile, đặt service là null
        }
    }, [profile, dispatch]);
    const getValues = (currentPage: number) => {
        return {
            take: take,
            page: currentPage,
            status: StoryStatus.PENDING,
            //type: typeFilter,
            keyword: search,
            //authorId: profile?.id,
        };
    };
    const { data, isLoading, error, setRefetch } = useFetch(apis.storyApi.getAllStoriesByAuthor, {
        queries: getValues(currentPage),
    });

    useEffect(() => {
        if (data) {
            setStories((data as any).edges);
            setTotalPage(Math.ceil((data as any).totalCount / take));
        }
    }, [data, currentPage]);

    const handleRefetch = () => {
        setSearch("");
        //setStatusFilter(undefined);
        setCurrentPage(1);
        //setTypeFilter(undefined);
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

    const handleShowModal = (story: Story) => {
        setSelectedStory(story);
        setShowModalApprove(true);
    };

    return (
        <div className={styles.containerStoryModeration}>
            <h1 className={styles.titleStoryModeration}>Danh sách truyện chờ phê duyệt</h1>
            <Form className={styles.searchStoryModeration} onSubmit={(event) => event.preventDefault()}>
                <Form.Control
                    type="search"
                    placeholder="Tìm kiếm tên truyện, tên tác giả"
                    className={`${styles.searchInputStoryModeration} me-2`}
                    aria-label="Search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event)}
                />
            </Form>
            <table className={styles.tableStoryModeration}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên truyện</th>
                        <th>Tên tác giả</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {stories &&
                        stories.length > 0 &&
                        stories.map((story, index) => (
                            <tr key={`story-${index}-${story.id}`}>
                                <td>{index + 1}</td>
                                <td>
                                    {story.node.title.length > 20
                                        ? `${story.node.title.substring(0, 20)}...`
                                        : story.node.title}
                                </td>
                                <td>{story.node.author.user.name}</td>
                                <td>{StoryStatusLabels[story.node.status as StoryStatus]}</td>
                                <td>
                                    {moment(
                                        story.node.moderationRequests.length > 0 &&
                                            story.node.moderationRequests[story.node.moderationRequests.length - 1]
                                                .createdAt
                                    ).format("DD/MM/YYYY HH:mm:ss")}
                                </td>
                                <td className={styles.actionStoryIcons}>
                                    <FaInfoCircle
                                        className={styles.editStoryIcon}
                                        onClick={() => handleShowModal(story.node)}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className={styles.storyModerationPagination}>
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
            <ModalApproveStory
                show={showModalApprove}
                handleClose={() => setShowModalApprove(false)}
                story={selectedStory ?? ({} as Story)}
                setRefetch={() => setRefetch({ value: true })}
            />
            <div style={{ display: "none" }}>
                <Notification setRefetch={setRefetch} />
            </div>
        </div>
    );
};

export default ModeratorHomePage;
