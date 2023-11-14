import { createSlice } from "@reduxjs/toolkit";
import task_type from "../dummy_data/task_type.json";

const initialState = {
  listTasktype: task_type,
};

export const tasktypeSlice = createSlice({
    name: "task_type",
    initialState,
    reducers: {
        setPrice : (state,action) => {
          const currentType = state.listTasktype.find(
            (type) => type._id === action.payload.tempID
          );
          currentType.price = action.payload.tempPrice                  
        },
        addTasktype: (state,action) =>{
          const newData = {
            _id: "TP" + parseInt(state.listTasktype.length + 1),
            name: action.payload.name,
            price: action.payload.price 
          }
          state.listTasktype.push(newData)
        }
    }
  });

export const { setPrice, addTasktype } = tasktypeSlice.actions;

export default tasktypeSlice.reducer;