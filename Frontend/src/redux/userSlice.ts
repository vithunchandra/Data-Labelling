import { createSlice } from "@reduxjs/toolkit";
import user from "../dummy_data/user.json";

const initialState = {
  listUser: user,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
    }
  });

export const { } = userSlice.actions;

export default userSlice.reducer;