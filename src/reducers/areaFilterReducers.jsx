import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  setAreaFilter,
  setCenter,
  setKinderGartens,
  setUser,
  setCurUser,
  setCurProfile,
  setInputValue,
  setSearchValue,
  setAuth,
} from '../actions/areaFilterActions';

// 상태 정의
const initialState = {
  areaFilter: 0,
  center: {
    lat: 37.568177,
    lng: 126.992217,
  },
  kinderGartens: [],
  user: [],
  curUser: {},
  curProfile: {},
  inputValue: '',
  searchValue: '',
  auth: false,
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

const userReducer = createReducer(initialState.user, builder => {
  builder.addCase(setUser, (state, action) => action.payload);
});

const curUserReducer = createReducer(initialState.curUser, builder => {
  builder.addCase(setCurUser, (state, action) => action.payload);
});

const curProfileReducer = createReducer(initialState.curProfile, builder => {
  builder.addCase(setCurProfile, (state, action) => action.payload);
});

const inputValueReducer = createReducer(initialState.inputValue, builder => {
  builder.addCase(setInputValue, (state, action) => action.payload);
});

const searchValueReducer = createReducer(initialState.searchValue, builder => {
  builder.addCase(setSearchValue, (state, action) => action.payload);
});

const authReducer = createReducer(initialState.auth, builder => {
  builder.addCase(setAuth, (state, action) => action.payload);
});

const rootReducer = combineReducers({
  areaFilter: areaFilterReducer,
  center: centerReducer,
  kinderGartens: kinderGartensReducer,
  user: userReducer,
  curUser: curUserReducer,
  curProfile: curProfileReducer,
  inputValue: inputValueReducer,
  searchValue: searchValueReducer,
  auth: authReducer,
});

export default rootReducer;
