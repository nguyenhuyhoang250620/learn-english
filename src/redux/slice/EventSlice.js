import {createSlice} from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        isloading:false,
        event: [],
        eventSearch:[],
        eventWithUser:[],
        totalRecord:0,
        detail:{},
        eventMap:[],
        valueSearch:''
    },
    reducers: {
        getEvent: (state,action) => {
            const data  = action.payload;
            state.event = data.results;
            state.totalRecord = data.total_results;
            state.isloading=true
        },
        getEventWithPerson: (state, action) => {
            const data = action.payload;
            state.eventWithUser = data.results;
            state.isloading = true;
          },
        getEventSearch: (state,action) => {
            const data  = action.payload;
            return {
                eventSearch: data.results,
            }
        },
        getEventMap: (state,action) => {
            const data = action.payload;
            return {
                event:state.event,
                totalRecord:state.totalRecord,
                eventMap: data
            }
        },
        getEventPreview: (state,action) => {
            const data = action.payload;
            const _data = JSON.parse(JSON.stringify(state)).event;
            if (_data) {
                const lastData = _data.pop();
                const found = data.find(element => element.id === lastData.id);
                if (!found)
                return {
                    event: _data.concat(data),
                }; else return;
            } else return {
                event: data,
                totalRecord: data,
            }
        },
        getDetailEvent:(state,action) => {
            const { data } = action.payload;
            return {
                detail:data.data,
                event: state.event,
                totalRecord:state.totalRecord
            }
        },
        getValueSearch:(state,action)=>{
            return{
                valueSearch:action.payload
            }
        }
    }
});

export const { getEvent, getDetailEvent, getEventPreview, getEventMap,getEventSearch,getValueSearch,getEventWithPerson } = eventSlice.actions;

export const selectEventData = state => state.events.event;
export const selectEventDataWithPerson = state => state.events.eventWithUser;
export const selectisLoading = state => state.events.isloading;
export const selectEventSearchData = state => state.events.eventSearch;
export const selectEventTotalRecord = state => state.events.totalRecord;
export const selectEventDetail = state => state.events.detail;
export const selectEventMapData = state => state.events.eventMap;
export const selectValueSearch = state => state.events.valueSearch;

export default eventSlice.reducer;
