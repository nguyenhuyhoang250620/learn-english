import {createSlice} from '@reduxjs/toolkit';

export const idCardSlice = createSlice({
    name: 'idCards',
    initialState: {
        idCard: [],
    },
    reducers: {
        getIdCard: (state,action) => {
            const data  = action.payload;
            return {
                idCard: data,
            }
        },

    }
});

export const { getIdCard } = idCardSlice.actions;

export const selectIdCardData = state => state.idCards.idCard;


export default idCardSlice.reducer;