import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WebSocketService from "@components/AuthorHeader/Socket/socket";

interface WebSocketState {
    service: WebSocketService | null;
}

const initialState: WebSocketState = {
    service: null,
};

const webSocketSlice = createSlice({
    name: "webSocket",
    initialState,
    reducers: {
        setWebSocketService(state, action: PayloadAction<WebSocketService | null>) {
            state.service = action.payload;
        },
    },
});

export const { setWebSocketService } = webSocketSlice.actions;
export default webSocketSlice.reducer;
