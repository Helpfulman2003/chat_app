// store/userSlice.js

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: {
   
  }
 
};

// Cấu hình slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
        state.user = action.payload
    },
    logout: (state) => {
      state.user = {}
    }
  }
});


export const { updateUser, logout } = userSlice.actions;

export default userSlice.reducer;