import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type listItem = {
    content: string;
    done: boolean;
    id: number

}

export type CounterState = {
    list: listItem[];
}

type dataPayload = {
  index: number;
  data: listItem
  id?: number;
}

type dataPayloadMove = {
  id: number;
  direction: string;
}

const initialState: CounterState = {
    list: JSON.parse(localStorage.getItem("list_item") || "[]") || [],
}

export const counterSlice = createSlice({
  name: "list",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Partial<dataPayload>>) => {
      action.payload.data && state.list.push(action.payload.data);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.list = [...state.list.slice(0, action.payload), ...state.list.slice(action.payload + 1)];
      // state.list = state.list.filter((_,index) => index !== action.payload);
    },
    updateContent: (state,action: PayloadAction<dataPayload>) => {
      state.list[action.payload.index].content = action.payload.data.content;
    },
    toggleStatus: (state,action: PayloadAction<number>) => {
      state.list[action.payload].done = !state.list[action.payload].done;
    },
    moveItem: (state,action: PayloadAction<dataPayloadMove>) => {
      const index = state.list.findIndex((item) => item.id === action.payload.id)
      switch (action.payload.direction) {
        case "up": 
          if (index === 0) {
            const first = state.list.shift()
            first !== undefined && state.list.push(first)
          } else [state.list[index-1],state.list[index]] = [state.list[index],state.list[index-1]]
          break;
        case "down":
          if (index === state.list.length - 1) {
            const last = state.list.pop()
            last !== undefined && state.list.unshift(last)
          } else [state.list[index],state.list[index+1]] = [state.list[index+1],state.list[index]]
          break;
      }
    } 
  },
});

export const {
  addItem,
  removeItem,
  updateContent,
  toggleStatus,
  moveItem
} = counterSlice.actions;

export const getListItems = (state: RootState) => state.list;

export default counterSlice.reducer;
