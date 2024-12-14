import LoadingWrapper from "@components/LoadingWrapper";
import useFetch from "@hooks/fetch.hook";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlockedContent from "../BlockedContent";
import apis from "@apis/index";
import { ImageContent } from "@apis/chapter";
import UrlUtils from "@utilities/url.util";
import { RequestInit } from "@apis/api.type";

function ImageContentSection() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { chapterId } = useParams();
    const { data: chapterContent, error: getChapterContentError, isLoading: isGettingChapterContent } = useFetch<ImageContent>(apis.chapterApi.getChapterContent, {
        queries: {
            chapterId
        }
    })
    const imageRef = useRef<HTMLImageElement[]>([]);
    const [isLockScreen, setLockScreen] = useState(false);
    const [createReadingHistoryReq, setCreateReadingHistoryReq] = useState<RequestInit>();
    const { data: createReadingHistoryResData, isLoading: isCreatingReadingHistory, setRefetch: setReCreateReadingHistory } = useFetch(apis.readingHistoryApi.createReadingHistory, createReadingHistoryReq, false);
    const [updateReadingHistoryReq, setUpdateReadingHistoryReq] = useState<RequestInit>();
    const { setRefetch: setReUpdateReadingHistory } = useFetch(apis.readingHistoryApi.updateReadingHistory, updateReadingHistoryReq, false);
    const [loadedImageCount, setLoadedImageCount] = useState(0);
    const loadedImageCountRef = useRef(0);

    function addImageRef(el: HTMLImageElement) {
        if (el && !imageRef.current.includes(el)) {
            imageRef.current.push(el);
        }
    }

    useEffect(() => {
        if (createReadingHistoryReq) {
            setReCreateReadingHistory({
                value: true
            })
        }
    }, [createReadingHistoryReq])

    useEffect(() => {
        if (!isCreatingReadingHistory) {
            if (createReadingHistoryResData && createReadingHistoryResData.id === undefined) {
                setUpdateReadingHistoryReq({
                    body: {
                        ...createReadingHistoryReq?.body
                    }
                })
            }
        }
    }, [isCreatingReadingHistory])

    useEffect(() => {
        if (updateReadingHistoryReq) {
            setReUpdateReadingHistory({
                value: true
            })
        }
    }, [updateReadingHistoryReq])

    useEffect(() => {
        if (location.state) {
            setLockScreen(true);
        }
    }, [])

    useEffect(() => {
        let observer: IntersectionObserver;

        function observe(elements: Element[], observer: IntersectionObserver) {
            for (let el of elements) {
                observer.observe(el);
            }
        }

        function unobserve(elements: Element[], observer: IntersectionObserver) {
            for (let el of elements) {
                observer.unobserve(el);
            }
        }

        if (!isGettingChapterContent) {
            if (chapterContent) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && loadedImageCountRef.current === chapterContent.images.length) {
                                setCreateReadingHistoryReq({
                                    body: {
                                        chapterId: Number(chapterId),
                                        position: entry.target.id
                                    }
                                })
                                navigate(location.pathname, {
                                    state: {
                                        position: entry.target.id
                                    }
                                })
                            }
                        });
                    },
                    {
                        root: null,
                        rootMargin: '0px',
                        threshold: 0.2,
                    }
                );
                if (chapterContent.history) {
                    setLockScreen(true);
                }
                if (imageRef.current) {
                    observe(imageRef.current, observer);
                }
            }
        }

        return () => {
            if (observer) {
                if (imageRef.current) {
                    unobserve(imageRef.current, observer);
                }
                observer.disconnect();
            }
        }
    }, [isGettingChapterContent])

    useEffect(() => {
        if (chapterContent) {
            if (loadedImageCount === chapterContent.images.length) {
                if (location.state) {
                    imageRef.current.find(image => image.id === location.state.position)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "start"
                    })
                    setLockScreen(false);
                }
                if (chapterContent.history) {
                    imageRef.current.find(image => image.id === chapterContent.history.position)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "start"
                    })
                    setLockScreen(false);
                }
            }
        }
        loadedImageCountRef.current = loadedImageCount;
    }, [loadedImageCount])

    return (
        <LoadingWrapper
            isLoading={isGettingChapterContent}
            message={t("reader.chapterContentPage.loadingWrapper.message")}
        >
            {getChapterContentError
                ? (
                    <BlockedContent />
                )
                : (
                    <div className="flex flex-col items-center">
                        {chapterContent?.images.map((image) => {
                            return (
                                <img
                                    key={image.id}
                                    ref={addImageRef}
                                    id={`storyhub-reading-position-${image.id}`}
                                    src={UrlUtils.generateUrl(image.path)}
                                    alt={`${chapterContent.name} - ${t("reader.chapterContentPage.page")} ${image.order}`}
                                    onLoad={() => setLoadedImageCount(prev => prev + 1)}
                                />
                            )
                        })}
                    </div>
                )}

            <LoadingWrapper
                isLoading={isLockScreen}
                message={t("loading.scrollPosition")}
            />
        </LoadingWrapper>
    )
}

export default memo(ImageContentSection);