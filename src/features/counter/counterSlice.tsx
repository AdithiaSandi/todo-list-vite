import { createSlice } from "@reduxjs/toolkit";

type listItem = {
    content: string;
    done: boolean;

}

type CounterState = {
    list: listItem[];
}

const initState: CounterState = {
    list: []
}

export const counterSlice = createSlice({
  name: "cart",
  initialState: initState,
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

export const getListItems = (state: CounterState) => state.list;

export default counterSlice.reducer;
