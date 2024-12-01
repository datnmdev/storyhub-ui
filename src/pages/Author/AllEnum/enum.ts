export enum StoryStatus {
    UNPUBLISHED = 0, // Chưa phát hành
    PENDING = 1, // Yêu cầu phát hành
    PUBLISHING = 2, // Đang phát hành
    PAUSED = 3, // Tạm hoãn
    COMPLETED = 4, // Hoàn thành
    HIDDEN = 5, // Ẩn
    DELETED = 6, // Đã xoá
}

// Optional: Create a mapping for display purposes
export const StoryStatusLabels: { [key in StoryStatus]: string } = {
    [StoryStatus.UNPUBLISHED]: "Chưa phát hành",
    [StoryStatus.PENDING]: "Yêu cầu phát hành",
    [StoryStatus.PUBLISHING]: "Đang phát hành",
    [StoryStatus.PAUSED]: "Tạm hoãn",
    [StoryStatus.COMPLETED]: "Hoàn thành",
    [StoryStatus.HIDDEN]: "Ẩn",
    [StoryStatus.DELETED]: "Đã xoá",
};

export enum StoryType {
    NOVEL = 0,
    MANGA = 1,
}

export const StoryTypeLabels: { [key in StoryType]: string } = {
    [StoryType.NOVEL]: "Truyện chữ",
    [StoryType.MANGA]: "Truyện tranh",
};
