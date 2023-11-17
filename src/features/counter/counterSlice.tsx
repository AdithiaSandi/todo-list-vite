import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type listItem = {
    content: string;
    done: boolean;

}

type CounterState = {
    list: listItem[];
}

const initialState: CounterState = {
    list: JSON.parse(localStorage.getItem("list_item") || "[]") || [],
}

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload)
    },
    removeItem: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    updateContent: (state,action) => {
        state.list[action.payload.index] = action.payload.content
    }
  },
});

export const {
  addItem,
  removeItem,
  updateContent,
} = counterSlice.actions;

export const getListItems = (state: RootState) => state.list;

export default counterSlice.reducer;
