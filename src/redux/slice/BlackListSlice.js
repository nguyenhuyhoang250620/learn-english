import {createSlice} from '@reduxjs/toolkit';

export const blackListSlice = createSlice({
    name:'blacklists',
    initialState: {
        blacklist:[],
        totalRecord:0,
        detail: {},
        filterSearchSelect:[]
    },
    reducers: {
        getBlackList: (state,action) => {
            const data = action.payload;
            return {
                blacklist: data,
                totalRecord:data.length,
                filterSearchSelect:state.filterSearchSelect,
            }
        },
        getBlackListDetail: (state,action) => {
            const data = action.payload;
            state.detail = data[0];
        },
        getFilterSearchSelect: (state,action) => {
            const data = action.payload;
            state.filterSearchSelect = data
        }
    }
});

export const { getBlackList, getBlackListDetail, getFilterSearchSelect} = blackListSlice.actions;

export const selectBlackList = state => state.blacklists.blacklist;
export const selectBlackListDetail = state => state.blacklists.detail;
export const selectFilterSearchSelect = state => state.blacklists.filterSearchSelect;

export default blackListSlice.reducer;