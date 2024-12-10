export enum StoryStatus {
    UNPUBLISHED = 0, // Chưa phát hành
    PENDING = 1, // Yêu cầu phát hành
    PUBLISHING = 2, // Đang phát hành
    COMPLETED = 4, // Hoàn thành
    DELETED = 6, // xoá
}

// Optional: Create a mapping for display purposes
export const StoryStatusLabels: { [key in StoryStatus]: string } = {
    [StoryStatus.UNPUBLISHED]: "Chưa phát hành",
    [StoryStatus.PENDING]: "Yêu cầu phát hành",
    [StoryStatus.PUBLISHING]: "Đang phát hành",
    [StoryStatus.COMPLETED]: "Hoàn thành",
    [StoryStatus.DELETED]: "xoá",
};

export enum StoryType {
    NOVEL = 0,
    MANGA = 1,
}

export const StoryTypeLabels: { [key in StoryType]: string } = {
    [StoryType.NOVEL]: "Truyện chữ",
    [StoryType.MANGA]: "Truyện tranh",
};

export enum ModerationStatus {
    PENDING = 0, // Chờ xử lý
    APPROVED = 1, // Đã được duyệt
    REJECTED = 2, // Không được duyệt
}
export const ModerationStatusLabels: { [key in ModerationStatus]: string } = {
    [ModerationStatus.PENDING]: "Chờ xử lý",
    [ModerationStatus.APPROVED]: "Đã được duyệt",
    [ModerationStatus.REJECTED]: "Không được duyệt",
};