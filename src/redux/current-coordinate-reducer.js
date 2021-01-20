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
            state.arrayGeoData.push(action.payload);
        }
    }
})

export const {setCurrentGeoCoord, setDataToArrayGeoData} = slice.actions;

export const currentCoordinateReducer = slice.reducer


