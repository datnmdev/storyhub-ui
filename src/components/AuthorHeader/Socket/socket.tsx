import { io, Socket } from "socket.io-client";

class WebSocketService {
    private socket: Socket;
    private isConnected: boolean;

    constructor(id: string) {
        this.socket = io(`http://localhost:3000?id=${id}`);
        this.isConnected = false;

        // Lắng nghe sự kiện kết nối thành công
        this.socket.on("connect", () => {
            if (!this.isConnected) {
                this.isConnected = true;
                console.log("Kết nối thành công với WebSocket server");
            }
        });

        // Lắng nghe sự kiện kết nối thất bại
        this.socket.on("connect_error", (error: Error) => {
            console.error("Kết nối thất bại:", error);
        });

        // Lắng nghe sự kiện lỗi
        this.socket.on("error", (error: Error) => {
            console.error("Lỗi WebSocket:", error);
        });
    }

    // Phương thức để gửi yêu cầu kiểm duyệt
    public sendModerationRequest(storyId: number, authorId: number): void {
        this.socket.emit("create_moderation_request", {
            reason: "Yêu cầu phát hành truyện",
            status: 0,
            type: 0,
            storyId: storyId,
            chapterId: null,
            requesterId: authorId,
        });
    }

    // Kiểm duyệt viên lắng nghe yêu cầu kiểm duyệt
    public listenNewReviewRequest(callback: (reviewRequest: any) => void): void {
        this.socket.on("newReviewRequest", (reviewRequest: any) => {
            console.log("New review request received:", reviewRequest);
            callback(reviewRequest); // Gọi callback với dữ liệu nhận được
        });
    }

    // Phương thức để xử lý yêu cầu kiểm duyệt
    public handleModerationRequest(reqId: number, reqStatus: number, storyId: number, storyStatus: number): void {
        this.socket.emit("handle_moderation_request", {
            reqId: reqId,
            reqStatus: reqStatus,
            storyId: storyId,
            storyStatus: storyStatus,
        });
    }

    // Gửi thông báo tới tác giả khi có sự thay đổi về truyện
    public sendNotificationToAuthor(storyId: number, reason: string): void {
        this.socket.emit("story_updated", {
            storyId: storyId,
            reason: reason,
        });
    }

    // Phương thức để gửi yêu cầu
    public createModerationRequest(data: any): void {
        this.socket.emit("create_moderation_request", data);
    }
}

export default WebSocketService;
