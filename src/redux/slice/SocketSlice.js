import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
  name: "sockets",
  initialState: {
    socket: [],
    notification: true,
  },
  reducers: {
    getSocket: (state, action) => {
      const { data } = action.payload;
      state.socket.unshift(data);
    },
    deleteSocket: (state, action) => {
      state.socket = [];
    },
    changeNotification: (state, action) => {
      return {
        notification: action.payload,
        socket: state.socket,
      };
    },
  },
});

export const { getSocket, deleteSocket, changeNotification } =
  socketSlice.actions;

export const selectSocketData = (state) => state.sockets.socket;
export const selectNotification = (state) => state.sockets.notification;

export default socketSlice.reducer;
