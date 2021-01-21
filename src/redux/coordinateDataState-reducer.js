import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    coordinateState: [],
    wayLength: 0
}

const slice = createSlice({
    name: 'coordinateState',
    initialState: initialState,
    reducers: {
        setCoordinateState(state, action) {
            state.coordinateState.push(action.payload)
        },
        setWayLength (state, action)  {
            let way = action.payload.split(' ')[0]
            let correctlyWayLength = way.split(',').join('.')
            state.wayLength += +correctlyWayLength
        }
    }
})

export const {setCoordinateState, setWayLength} = slice.actions;

export const coordinateStateReducer = slice.reducer


