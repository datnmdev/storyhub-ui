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
    aliases: Alias[];
    genres: Genre[];
    prices: Price[];
    moderationRequests: ModerationRequest[];
    author: Author;
    followDetails: FollowDetails[];
    ratingDetails: any[];
    chapters: Chapter[];
}

export interface FollowDetails {
    readerId: number;
    storyId: number;
    createdAt: string;
}

export interface Comments {}

export interface RatingDetails {}

export interface ModerationRequest {
    id: number;
    reason: string;
    status: number;
    type: number;
    createdAt: string;
    processAt: string;
    storyId: number;
    story: any;
    chapterId: number;
    chapter: any;
    requesterId: number;
    responserId: number;
}

export interface Author {
    id: number;
    user: User;
}

export interface User {
    id: number;
    name: string;
    dob: string | null;
    gender: string | null;
    phone: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
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
    storyId: number;
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
    views: any[];
}

export interface AuthorModalCreateAndUpdateChapterProps {
    isOpen: boolean;
    onClose: () => void;
    isUpdate: boolean;
    title: string;
    index: number | null;
    chapterList: any[];
    setRefetchChapterList: (value: any) => void;
    orderNew: number;
    story: any;
}

export interface ModalDeleteChapterProps {
    isOpen: boolean;
    onClose: () => void;
    chapterId: number;
    chapterName: string;
    setRefetchChapterList: (value: any) => void;
}

export interface NotificationUser {
    receiverId: number;
    notificationId: number;
    status: number;
    createdAt: string;
    updatedAt: string;
    notification: Notification;
}

export interface Notification {
    id: number;
    type: number;
    createdAt: string;
    updatedAt: string;
    moderationRequestId: number;
    moderationRequest: ModerationRequest;
}
