import { Chapter } from "@apis/chapter";
import apis from "@apis/index";
import LoadingWrapper from "@components/LoadingWrapper";
import useFetch from "@hooks/fetch.hook";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BlockedContent from "../BlockedContent";

function TextContentSection() {
    const { t } = useTranslation();
    const { chapterId } = useParams();
    const { data: chapterContent, error: getChapterContentError, isLoading: isGettingChapterContent } = useFetch<Chapter>(apis.chapterApi.getChapterContent, {
        queries: {
            chapterId
        }
    })

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
                        className="text-[1.6rem]"
                        dangerouslySetInnerHTML={{
                            __html: chapterContent?.content || ""
                        }}
                    />
                )}
        </LoadingWrapper>
    )
}

export default memo(TextContentSection);