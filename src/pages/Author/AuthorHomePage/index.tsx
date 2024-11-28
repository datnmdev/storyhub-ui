import { useState, useEffect } from "react";
import styles from "./AuthorHomePage.module.scss";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import paths from "@routers/router.path";
import useFetch from "@hooks/fetch.hook";
import apis from "@apis/index";
import { useAppSelector } from "@hooks/redux.hook";
import authFeature from "@features/auth";
const AuthorHomePage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const take = 12;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [statusFilter, setStatusFilter] = useState<number>();
    const [typeFilter, setTypeFilter] = useState<number>();
    const [totalPage, setTotalPage] = useState<number>(1);
    const [mangaItems, setMangaItems] = useState<any[]>([]);
    const profile = useAppSelector(authFeature.authSelector.selectUser);

    const refetch = () => {
        setSearch("");
        setStatusFilter(undefined);
        setCurrentPage(1);
        setTypeFilter(undefined);
        setRefetch({ value: true });
    };
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
            setStatusFilter(+event.target.value);
            setRefetch({ value: true });
        } else {
            setTypeFilter(+event.target.value);
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
                        <button className="btn btn-primary" onClick={() => navigate(paths.authorCreateStory())}>
                            Thêm mới
                        </button>
                        <button className="btn btn-secondary" onClick={refetch}>
                            Làm mới
                        </button>
                    </div>

                    <Form className={styles.customSearch} onSubmit={(event) => event.preventDefault()}>
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm truyện"
                            className={`${styles.searchInput} me-2`}
                            aria-label="Search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event)}
                        />
                    </Form>
                    <div className={styles.statusFilterContainer}>
                        <select className={styles.statusFilter} onChange={(event) => handleFilter(event, "status")}>
                            <option disabled>Trạng thái truyện</option>
                            <option value="0">Chưa phát hành</option>
                            <option value="1">Chờ Hoàn thành</option>
                            <option value="2">Đang Hoàn thành</option>
                            <option value="4">Hoàn thành</option>
                        </select>
                        <select className={styles.statusFilter}>
                            <option disabled>Thể loại</option>
                            <option value="1">Hành động</option>
                            <option value="2">Chiến tranh</option>
                            <option value="3">Kinh dị</option>
                        </select>
                        <select className={styles.statusFilter} onChange={(event) => handleFilter(event, "type")}>
                            <option disabled>Loại truyện</option>
                            <option value="1">Truyện tranh</option>
                            <option value="0">Truyện chữ</option>
                        </select>
                    </div>
                </div>
                <div className={styles.mangaItemsGrid}>
                    {mangaItems.map((manga, index) => (
                        <div
                            key={`manga-${index}`}
                            className={styles.mangaItem}
                            onClick={() => navigate(paths.authorStoryDetail(manga.id))}
                        >
                            <img
                                src={`https://s3bucket2024aws.s3.ap-southeast-1.amazonaws.com/${manga?.node?.coverImage}`}
                                alt={manga?.node?.title}
                                className={styles.mangaImage}
                            />
                            <div className={styles.mangaInfo}>
                                <h5>{manga?.node?.title}</h5>
                                <span className={styles.mangaStatus}>{manga?.node?.status}</span>
                                <span className={styles.mangaPrice}>{manga?.node?.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.storyPagination}>
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

export default AuthorHomePage;
