import { useState, useEffect, useMemo } from "react";
import styles from "./AuthorHomePage.module.scss";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import paths from "@routers/router.path";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
import { StoryStatus, StoryStatusLabels } from "../AllEnum/enum";
import { useDispatch } from "react-redux";
import { setWebSocketService } from "@store/webSocketSlice";
import WebSocketService from "@components/AuthorHeader/Socket/socket";

const AuthorHomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const take = 12;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [statusFilter, setStatusFilter] = useState<number>();
    const [typeFilter, setTypeFilter] = useState<number>();
    const [totalPage, setTotalPage] = useState<number>(1);
    const [mangaItems, setMangaItems] = useState<any[]>([]);
    const profile = useAppSelector(authFeature.authSelector.selectUser);
    const [checkConnent, setCheckConnet] = useState<number>(1);

    useEffect(() => {
        if (profile && checkConnent == 1) {
            setCheckConnet(2);
            const webSocketService = new WebSocketService(profile.id.toString());
            dispatch(setWebSocketService(webSocketService));
        }
    }, [profile, dispatch]);

    const handleRefetch = () => {
        setSearch("");
        setStatusFilter(undefined);
        setCurrentPage(1);
        setTypeFilter(undefined);
        setRefetch({ value: true });
    };

    useEffect(() => {
        setRefetch({ value: true });
    }, [profile]);

    const getValues = (currentPage: number) => {
        return {
            take: take,
            page: currentPage,
            status: statusFilter,
            type: typeFilter,
            keyword: search,
            authorId: profile?.id,
        };
    };
    const { data, isLoading, error, setRefetch } = useFetch(apis.storyApi.getAllStoriesByAuthor, {
        queries: getValues(currentPage),
    });
    useEffect(() => {
        if (data) {
            setMangaItems((data as any).edges);
            setTotalPage(Math.ceil((data as any).totalCount / take));
        }
    }, [data, currentPage]);

    const handleFilter = (event: any, type: "status" | "type") => {
        if (type === "status") {
            setStatusFilter(+event.target.value === 5 ? undefined : +event.target.value);
            setRefetch({ value: true });
        } else {
            setTypeFilter(+event.target.value === 5 ? undefined : +event.target.value);
            setRefetch({ value: true });
        }
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
    return (
        <>
            <div className={styles.mangaListContainer}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <button className={styles.btnPrimary} onClick={() => navigate(paths.authorCreateStory())}>
                            Thêm mới
                        </button>
                        <button className={styles.btnSecondary} onClick={handleRefetch}>
                            Làm mới
                        </button>
                    </div>

                    <Form className={styles.customSearch} onSubmit={(event) => event.preventDefault()}>
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm tên truyện"
                            className={`${styles.searchInput} me-2`}
                            aria-label="Search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event)}
                        />
                    </Form>
                    <div className={styles.statusFilterContainer}>
                        <select className={styles.statusFilter} onChange={(event) => handleFilter(event, "status")}>
                            <option value="5">Trạng thái truyện</option>
                            <option value="0">Chưa phát hành</option>
                            <option value="1">Yêu cầu phát thành</option>
                            <option value="2">Đang phát hành</option>
                            <option value="4">Hoàn thành</option>
                        </select>
                        {/* <select className={styles.statusFilter}>
                            <option disabled>Thể loại</option>
                            <option value="1">Hành động</option>
                            <option value="2">Chiến tranh</option>
                            <option value="3">Kinh dị</option>
                        </select> */}
                        <select className={styles.statusFilter} onChange={(event) => handleFilter(event, "type")}>
                            <option value="5">Loại truyện</option>
                            <option value="1">Truyện tranh</option>
                            <option value="0">Truyện chữ</option>
                        </select>
                    </div>
                </div>
                <div className={styles.mangaItemsGrid}>
                    {mangaItems &&
                        mangaItems.length > 0 &&
                        mangaItems.map((manga, index) => (
                            <div
                                key={`manga-${index}`}
                                className={styles.mangaItem}
                                onClick={() =>
                                    navigate(paths.authorStoryDetail(manga?.node?.id), { state: manga?.node?.id })
                                }
                            >
                                <img
                                    src={`${import.meta.env.VITE_SERVER_HOST}${import.meta.env.VITE_BASE_URI}${
                                        manga?.node?.coverImage
                                    }`}
                                    alt={manga?.node?.title}
                                    className={styles.mangaImage}
                                />
                                <div className={styles.mangaInfo}>
                                    <h5>
                                        {manga?.node?.title.length > 19
                                            ? `${manga?.node?.title.substring(0, 19)}...`
                                            : manga?.node?.title}
                                    </h5>
                                    <span className={styles.mangaPrice}>
                                        {manga?.node?.prices && manga?.node?.prices.length > 0
                                            ? new Intl.NumberFormat(undefined, {
                                                  style: "currency",
                                                  currency: "VND",
                                              }).format(manga?.node?.prices[manga?.node?.prices.length - 1]?.amount)
                                            : "0 ₫"}
                                    </span>
                                    <span className={styles.mangaStatus}>
                                        {StoryStatusLabels[manga?.node?.status as StoryStatus]}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className={styles.storyPagination}>
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
        </>
    );
};

export default AuthorHomePage;
