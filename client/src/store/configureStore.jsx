import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from '../reducers/areaFilterReducers';

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
