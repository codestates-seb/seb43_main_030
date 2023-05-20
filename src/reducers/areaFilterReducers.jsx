import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
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
  setActiveIndex,
  setCategory,
  setCommInputValue,
  setSearchClickState,
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
  activeIndex: 0,
  category: '',
  commInputValue: 'notification',
  searchClickState: false,
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

const activeIndexReducer = createReducer(initialState.activeIndex, builder => {
  builder.addCase(setActiveIndex, (state, action) => action.payload);
});

const categoryReducer = createReducer(initialState.category, builder => {
  builder.addCase(setCategory, (state, action) => action.payload);
});

const commInputValueReducer = createReducer(
  initialState.commInputValue,
  builder => {
    builder.addCase(setCommInputValue, (state, action) => action.payload);
  },
);

const searchClickStateReducer = createReducer(
  initialState.searchClickState,
  builder => {
    builder.addCase(setSearchClickState, (state, action) => action.payload);
  },
);

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
  activeIndex: activeIndexReducer,
  category: categoryReducer,
  commInputValue: commInputValueReducer,
  searchClickState: searchClickStateReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession, // 사용할 스토리지를 정의해요.
  whitelist: [
    'curUser',
    'user',
    'curProfile',
    'kinderGartens',
    'areaFilter',
    'cetner',
    'inputValue',
    'searchValue',
    'auth',
    'activeIndex',
    'category',
    'commInputValue',
    'searchClickState',
  ], // 유지 할 데이터를 정의해요
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// reducer와 위에서 설정 한 persist설정을 합쳐요

export default persistedReducer;
