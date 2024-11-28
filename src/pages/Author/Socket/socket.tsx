import { io } from "socket.io-client";

export const connectToSocket = (authorId: number) => {
    const socket = io(`http://localhost:3000?id=${authorId}`);

    socket.on("connect", () => {
        console.log("Connected to Socket.io");
    });

    socket.on("disconnect", () => {   
        console.log("Disconnected from Socket.io");
    });

    socket.on("error", (error) => {
        console.error("Socket.io Error:", error);
    });

    const sendModerationRequest = (storyId: number, authorId: number) => {
        // Gửi thông điệp
        socket.emit("create_moderation_request", {
            reason: "Yêu cầu phát hành truyện",
            status: 0,
            type: 0,
            storyId: storyId,
            chapterId: null,
            requesterId: authorId,
        });
    };

    // Lắng nghe phản hồi từ server
    const listenModerationRequest = () => {
        socket.on("moderation_request_created", (data) => {
            console.log("Moderation request created:", data);
        });
    };

    // Return the socket and the send function
    return { socket, sendModerationRequest, listenModerationRequest };
};
