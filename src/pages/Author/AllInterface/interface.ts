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
    authorId: number;
    aliases: string;
    genres: Genre[];
    prices: Price;
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

export interface Image {
    id: number;
    src: string;
}

export interface ModalChapterDetailProps {
    isOpen: boolean;
    onClose: () => void;
    chapterTitle: string;
    images: Image[];
    onAddClick?: () => void;
    onDeleteAllClick?: () => void;
}

export interface AuthorModalCreateChapterProps {
    isOpen: boolean;
    onClose: () => void;
}
