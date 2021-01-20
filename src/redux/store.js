import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {currentCoordinateReducer} from './current-coordinate-reducer';
import {coordinateStateReducer} from "./coordinateDataState-reducer";


const rootReducer = combineReducers({
    currentCoordinate: currentCoordinateReducer,
    coordinateState: coordinateStateReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})


//@ts-ignore
window.store = store