import { configureStore } from '@reduxjs/toolkit';
import areaFilterReducer from '../reducers/areaFilterReducers';

const store = configureStore({
  reducer: {
    areaFilter: areaFilterReducer,
  },
});

export default store;
