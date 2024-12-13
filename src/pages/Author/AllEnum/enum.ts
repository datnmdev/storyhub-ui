export enum StoryStatus {
    UNPUBLISHED = 0, // Chưa phát hành
    PENDING = 1, // Yêu cầu phát hành
    PUBLISHING = 2, // Phát hành
    COMPLETED = 3, // Hoàn thành
    DELETED = 4, // xoá
}

// Optional: Create a mapping for display purposes
export const StoryStatusLabels: { [key in StoryStatus]: string } = {
    [StoryStatus.UNPUBLISHED]: "Chưa phát hành",
    [StoryStatus.PENDING]: "Yêu cầu phát hành",
    [StoryStatus.PUBLISHING]: "Phát hành",
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

export enum NotificationStatus {
    UPDATED = 2, // Đã cập nhật
    COMPLETED = 4, // Đã hoàn thành
}
export const NotificationStatusLabels: { [key in NotificationStatus]: string } = {
    [NotificationStatus.UPDATED]: "Đã cập nhật",
    [NotificationStatus.COMPLETED]: "Đã hoàn thành",
};
