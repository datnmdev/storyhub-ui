import LoadingWrapper from "@components/LoadingWrapper";
import useFetch from "@hooks/fetch.hook";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import BlockedContent from "../BlockedContent";
import apis from "@apis/index";
import { ImageContent } from "@apis/chapter";
import useFetchAll, { ApiFuncArray } from "@hooks/fetchAll.hook";

function ImageContentSection() {
    const { t } = useTranslation();
    const { chapterId } = useParams();
    const [isRender, setRender] = useState(false);
    const { data: chapterContent, error: getChapterContentError, isLoading: isGettingChapterContent } = useFetch<ImageContent>(apis.chapterApi.getChapterContent, {
        queries: {
            chapterId
        }
    })
    const [getImageApis, setGetImageApis] = useState<ApiFuncArray | null>(null);
    const { data: images, isLoading: isGetImages, setRefetch: setReGetImages } = useFetchAll(getImageApis as ApiFuncArray, false);

    useEffect(() => {
        if (!isGettingChapterContent) {
            if (chapterContent) {
                setGetImageApis(chapterContent.images.map(image => {
                    return [
                        apis.chapterApi.getImage,
                        {
                            uri: image.path
                        }
                    ]
                }))
            }
        }
    }, [isGettingChapterContent])

    useEffect(() => {
        if (getImageApis) {
            setReGetImages({
                value: true
            })
        }
    }, [getImageApis])

    useEffect(() => {
        if (!isGetImages) {
            if (images) {
                setRender(true);
            }
        }
    }, [isGetImages])

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
                    <LoadingWrapper
                        isLoading={!isRender}
                        message={t("reader.chapterContentPage.loadingWrapper.message")}
                    >
                        <div className="flex flex-col items-center">
                            {isRender
                                && (chapterContent?.images.map((image, index) => {
                                    return (
                                        <img
                                            key={image.id}
                                            src={URL.createObjectURL(images?.[index])}
                                            alt={`${chapterContent.name} - ${t("reader.chapterContentPage.page")} ${image.order}`}
                                        />
                                    )
                                }))}
                        </div>
                    </LoadingWrapper>
                )}
        </LoadingWrapper>
    )
}

export default memo(ImageContentSection);