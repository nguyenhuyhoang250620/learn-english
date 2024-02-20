import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: "profiles",
    initialState: {
        profile:[],
        total_results:0,
    },
    reducers: {
        getProfile: (state,action) => {
            const { data } = action.payload;
            if(data.total_results){
                return {
                    profile:data.results,
                    total_results:data.total_results
                }
            }
            else{
                return {
                    profile:data,
                }
            }
        },
        getAllProfile: (state,action) => {
            const { data } = action.payload;
            return {
                profile:data,
            }
        },
    }
});

export const { getProfile, getAllProfile } = profileSlice.actions;

export const selectProfileData = state => state.profiles.profile;
export const selectTotalProfileData = state => state.profiles.total_results;

export default profileSlice.reducer;
