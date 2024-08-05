/* eslint-disable array-callback-return */
/* eslint-disable no-self-compare */
import { createSlice } from "@reduxjs/toolkit";
export const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    itemTabs: [],
    keyActive: "",
    tabs:[],
  },
  reducers: {
    handleAddTabs(state, action) {
      const existingIndex = state.itemTabs.findIndex(
        (item) => item.key === action.payload.key
      );
      if (existingIndex === -1) {
        state.itemTabs.push({
          label: <p className="uppercase">{action.payload.label}</p>,
          path: action.payload.path,
          key: action.payload.key,
          icon: action.payload.icon,
        });
        state.tabs.push(action.payload.key)
      }
      localStorage.setItem("LIST",state.tabs)
      state.keyActive = action.payload.key;
    },
    handleRemoveTab(state, action) {
      state.tabs =[]
      const targetIndex = state.itemTabs.findIndex(
        (pane) => pane.key === action.payload
      );
      const newPanes = state.itemTabs.filter(
        (pane) => pane.key !== action.payload
      );
      if (newPanes.length && action.payload === action.payload) {
        const { key } =
          newPanes[
            targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
          ];
        state.keyActive = key;
      }
      else{
        state.keyActive = 0
      }
      state.itemTabs = newPanes;
      newPanes.map((item)=>{
        state.tabs.push(item.key)
      })
      localStorage.setItem("LIST",state.tabs)
    },
    handleOnChangeKey(state, action) {
      state.keyActive = action.payload;
    },
  },
});

export const { handleAddTabs, handleOnChangeKey, handleRemoveTab } =tabsSlice.actions;
export const selectItemTab = (state) => state.tabs.itemTabs;
export const selectKeyActive = (state) => state.tabs.keyActive;
export default tabsSlice.reducer;
