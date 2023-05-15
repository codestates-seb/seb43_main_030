import { createReducer } from '@reduxjs/toolkit';
import setAreaFilter from '../actions/areaFilterActions';

const initialState = 0; // 초기 상태는 0으로 설정

const areaFilterReducer = createReducer(initialState, builder => {
  builder.addCase(setAreaFilter, (state, action) => action.payload);
});

export default areaFilterReducer;
