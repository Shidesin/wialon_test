import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    currentGeoData: [],
    arrayGeoData: []
}

const slice = createSlice({
    name: 'currentCoordinateReducer',
    initialState: initialState,
    reducers: {
        setCurrentGeoCoord(state, action) {
            state.currentGeoData = action.payload;
        },
        setDataToArrayGeoData(state, action){
            if (!state.arrayGeoData.length || state.arrayGeoData.length === 1){
                state.arrayGeoData.push(action.payload)
            } else if (state.arrayGeoData.length >= 2){
                state.arrayGeoData.push(action.payload)
                state.arrayGeoData = state.arrayGeoData.slice(-2)
            }
        }
    }
})

export const {setCurrentGeoCoord, setDataToArrayGeoData} = slice.actions;

export const currentCoordinateReducer = slice.reducer


