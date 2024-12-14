import { Chapter } from "@apis/chapter";
import apis from "@apis/index";
import LoadingWrapper from "@components/LoadingWrapper";
import useFetch from "@hooks/fetch.hook";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlockedContent from "../BlockedContent";
import DOMUtils from "@utilities/dom.util";
import { RequestInit } from "@apis/api.type";

function TextContentSection() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { chapterId } = useParams();
    const { data: chapterContent, error: getChapterContentError, isLoading: isGettingChapterContent } = useFetch<Chapter>(apis.chapterApi.getChapterContent, {
        queries: {
            chapterId
        }
    })
    const [isLockScreen, setLockScreen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [createReadingHistoryReq, setCreateReadingHistoryReq] = useState<RequestInit>();
    const { data: createReadingHistoryResData, isLoading: isCreatingReadingHistory, setRefetch: setReCreateReadingHistory } = useFetch(apis.readingHistoryApi.createReadingHistory, createReadingHistoryReq, false);
    const [updateReadingHistoryReq, setUpdateReadingHistoryReq] = useState<RequestInit>();
    const { setRefetch: setReUpdateReadingHistory } = useFetch(apis.readingHistoryApi.updateReadingHistory, updateReadingHistoryReq, false);

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
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
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
                threshold: 1,
            }
        );

        function observe(element: Element, observer: IntersectionObserver) {
            for (let el of element.children) {
                observer.observe(el);
                observe(el, observer);                
            }
        }

        function unobserve(element: Element, observer: IntersectionObserver) {
            for (let el of element.children) {
                observer.unobserve(el);
                unobserve(el, observer);                
            }
        }

        if (!isGettingChapterContent) {
            if (chapterContent) {
                if (chapterContent.history) {
                    setLockScreen(true);
                }
                if (contentRef.current) {
                    observe(contentRef.current, observer);
                    if (location.state) {
                        contentRef.current.querySelector(`#${location.state.position}`)?.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                            inline: "start"
                        })
                        setLockScreen(false);
                    }
                    if (chapterContent.history) {
                        contentRef.current.querySelector(`#${chapterContent.history.position}`)?.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                            inline: "start"
                        })
                        setLockScreen(false);
                    }
                }
            }
        }

        return () => {
            if (contentRef.current) {
                unobserve(contentRef.current, observer);
            }
            observer.disconnect();
        }
    }, [isGettingChapterContent])

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
                    <div
                        ref={contentRef}
                        className="text-[1.6rem]"
                        dangerouslySetInnerHTML={{
                            __html: chapterContent?.content ? DOMUtils.wrapTextNodesWithSpanFromHTMLString(chapterContent.content) : ""
                        }}
                    />
                )}
            
            <LoadingWrapper
                isLoading={isLockScreen}
                message={t("loading.scrollPosition")}
            />
        </LoadingWrapper>
    )
}

export default memo(TextContentSection);