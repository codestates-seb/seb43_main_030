import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { setAreaFilter, setCenter } from '../actions/areaFilterActions';

// 상태 정의
const initialState = {
  areaFilter: 0,
  center: {
    lat: 37.568177,
    lng: 126.992217,
  },
};

const areaFilterReducer = createReducer(initialState.areaFilter, builder => {
  builder.addCase(setAreaFilter, (state, action) => action.payload);
});

const centerReducer = createReducer(initialState.center, builder => {
  builder.addCase(setCenter, (state, action) => action.payload);
});

const rootReducer = combineReducers({
  areaFilter: areaFilterReducer,
  center: centerReducer, // 새로운 리듀서
});

export default rootReducer;
