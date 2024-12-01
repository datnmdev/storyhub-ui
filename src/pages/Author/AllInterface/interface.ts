export interface Story {
    id: number;
    title: string;
    description: string;
    note: string;
    coverImage: string;
    type: number;
    status: number;
    createdAt: string;
    updatedAt: string;
    countryId: number;
    country: Country;
    authorId: number;
    aliases: string;
    genres: Genre[];
    price: Price;
}

export interface Alias {
    id: number;
    name: string;
    storyId: number;
}

export interface Country {
    id: number;
    name: string;
}

export interface Genre {
    id: number;
    name: string;
    description: string;
    createdId: number;
}

export interface Price {
    id: number;
    amount: number;
    startTime: string;
}

export interface ChapterImage {
    id: number;
    order: number;
    path: string;
    chapterId: number;
}

export interface Chapter {
    id: number;
    order: number;
    name: string;
    content: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    storyId: number;
}

export interface AuthorModalCreateAndUpdateChapterProps {
    isOpen: boolean;
    onClose: () => void;
    isUpdate: boolean;
    storyTitle: string;
    title: string;
    storyId: number;
    index: number | null;
    chapterList: any[];
    setRefetchChapterList: (value: any) => void;
    orderNew: number;
}

export interface ModalDeleteChapterProps {
    isOpen: boolean;
    onClose: () => void;
    chapterId: number;
    chapterName: string;
    setRefetchChapterList: (value: any) => void;
}
