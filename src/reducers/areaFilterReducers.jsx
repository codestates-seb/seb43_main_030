import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  setAreaFilter,
  setCenter,
  setKinderGartens,
} from '../actions/areaFilterActions';

// 상태 정의
const initialState = {
  areaFilter: 0,
  center: {
    lat: 37.568177,
    lng: 126.992217,
  },
  kinderGartens: [],
};

const areaFilterReducer = createReducer(initialState.areaFilter, builder => {
  builder.addCase(setAreaFilter, (state, action) => action.payload);
});

const centerReducer = createReducer(initialState.center, builder => {
  builder.addCase(setCenter, (state, action) => action.payload);
});

const kinderGartensReducer = createReducer(
  initialState.kinderGartens,
  builder => {
    builder.addCase(setKinderGartens, (state, action) => action.payload);
  },
);

const rootReducer = combineReducers({
  areaFilter: areaFilterReducer,
  center: centerReducer,
  kinderGartens: kinderGartensReducer,
});

export default rootReducer;
