import {createSelector} from '@reduxjs/toolkit';

const currentCoordinate = (state) => {
    return state.currentCoordinate.currentGeoData
}

const arrayGeoCoordinates = (state) => {
    return state.currentCoordinate.arrayGeoData
}

export const getCoordinateForForm = createSelector([currentCoordinate], (state) => {
    return state
})

export const getCoordinateForRoute = createSelector([arrayGeoCoordinates], (state) => {
    return state
})


