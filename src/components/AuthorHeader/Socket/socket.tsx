import { io, Socket } from "socket.io-client";

class WebSocketService {
    private socket: Socket;

    constructor(id: string) {
        this.socket = io(`http://localhost:3000?id=${id}`);

        // Lắng nghe sự kiện kết nối thành công
        this.socket.on("connect", () => {
            console.log("Kết nối thành công với WebSocket server");
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
    public sendModerationRequest(chapterId: number, authorId: number): void {
        this.socket.emit("create_moderation_request", {
            reason: "",
            status: 0,
            type: 0,
            storyId: null,
            chapterId: chapterId,
            requesterId: authorId,
        });
    }

    // Kiểm duyệt viên lắng nghe yêu cầu kiểm duyệt
    public listenNewReviewRequestForModerator(callback: (reviewRequest: any) => void): void {
        this.socket.on("newReviewRequest", (reviewRequest: any) => {
            //console.log("New review request received:", reviewRequest);
            callback(reviewRequest); // Gọi callback với dữ liệu nhận được
        });
    }

    // Tác giả lắng nghe yêu cầu kiểm duyệt
    public listenNewReviewRequestForAuthor(callback: (reviewRequest: any) => void): void {
        this.socket.on("review_request_created", (reviewRequest: any) => {
            //console.log("review request created received:", reviewRequest);
            callback(reviewRequest); // Gọi callback với dữ liệu nhận được
        });
    }

    // Phương thức để xử lý yêu cầu kiểm duyệt
    public handleModerationRequest(
        reqId: number,
        reqStatus: number,
        storyId: number,
        storyStatus: number,
        chapterId: number,
        chapterStatus: number,
        reason: string
    ): void {
        console.log(reqId, reqStatus, storyId, storyStatus, chapterId, chapterStatus, reason);
        this.socket.emit("handle_moderation_request", {
            reqId: reqId,
            reqStatus: reqStatus,
            storyId: storyId,
            storyStatus: storyStatus,
            chapterId: chapterId,
            chapterStatus: chapterStatus,
            reason: reason ? reason : "",
        });
    }

    // Tác giả lắng nghe sự kiện thay đổi về truyện
    public listenStoryUpdateEventForAuthor(callback: (reason: string) => void): void {
        this.socket.on("story_handled", (reason: string) => {
            //console.log("story handled event received:", data);
            callback(reason); // Gọi callback với dữ liệu nhận được
        });
    }

    // Kiểm duyệt viên lắng nghe sự kiện thay đổi về truyện
    public listenStoryUpdateEventforModerator(callback: (mess: string) => void): void {
        this.socket.on("moderation_request_updated", (mess: string) => {
            //console.log("Story update event received:", mess);
            callback(mess); // Gọi callback với dữ liệu nhận được
        });
    }

    // Độc giả lắng nghe sự kiện cập nhật truyện
    public listenStoryUpdateEventforReader(callback: (mess: string) => void): void {
        this.socket.on("story_updated", (mess: string) => {
            // console.log("Story update event received:", mess);
            callback(mess); // Gọi callback với dữ liệu nhận được
        });
    }

    // Phương thức để ngắt kết nối
    public disconnect(): void {
        this.socket.disconnect();
    }
}

export default WebSocketService;
