import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    coordinateState: [],
}

const slice = createSlice({
    name: 'coordinateState',
    initialState: initialState,
    reducers: {
        setCoordinateState(state, action) {
            state.coordinateState.push(action.payload)
        },
    }
})

export const {setCoordinateState} = slice.actions;

export const coordinateStateReducer = slice.reducer


