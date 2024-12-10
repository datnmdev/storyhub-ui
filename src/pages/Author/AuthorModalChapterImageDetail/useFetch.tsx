import useFetch from "@hooks/fetch.hook";
import apis from "apis";
import { ChapterImage } from "../AllInterface/interface";

export const useFetchCreateImage = (imageNewList: any[]) => {
    return useFetch<ChapterImage[]>(
        apis.chapterImageApi.createChapterImages,
        {
            body: imageNewList,
        },
        false
    );
};

export const useFetchListUrlUploadFileForChapter = (dataForFileUploads: any[]) => {
    return useFetch<{ uploadUrls: string[] }>(
        apis.fileUploadApi.generateUrlUploadFileForChapter,
        {
            body: dataForFileUploads,
        },
        false
    );
};

export const useFetchDeleteImage = (chapterImages: { id: number; fileName: string }) => {
    return useFetch<any>(apis.chapterImageApi.deleteChapterImages, { body: chapterImages }, false);
};

export const useFetchUpdateOrderImage = (chapterImage: ChapterImage) => {
    return useFetch<any>(
        apis.chapterImageApi.updateOrderChapterImages,
        { body: { id: chapterImage?.id, order: chapterImage?.order } },
        false
    );
};
