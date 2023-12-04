// store/messageSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [{}]
 
};

// Cấu hình slice
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    updateMessage: (state, action) => {
        state.message = action.payload
    },
    
  }
});


export const { updateMessage } = messageSlice.actions;

export default messageSlice.reducer;