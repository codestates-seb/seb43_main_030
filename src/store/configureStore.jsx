import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/areaFilterReducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
