import {createSelector} from '@reduxjs/toolkit';

const currentCoordinate = (state) => {
    return state.currentCoordinate.currentGeoData
}

const arrayGeoCoordinates = (state) => {
    return state.currentCoordinate.arrayGeoData
}

const dataFromCoordinateState = (state) => {
    return state.coordinateState.coordinateState
}

const dataWayLength = (state) => {
    return state.coordinateState.wayLength
}

export const getCoordinateForForm = createSelector([currentCoordinate], (state) => {
    return state
})

export const getCoordinateForRoute = createSelector([arrayGeoCoordinates], (state) => {
    return state
})
export const lastCoordinateValueSelector = createSelector([dataFromCoordinateState], (state) => {
    return state.slice(-1)
})

export const allDataCoordinateState = createSelector([dataFromCoordinateState],(state) => {
    return state
})

export const getWayLength = createSelector([dataWayLength], (state) => {
    return state
})


