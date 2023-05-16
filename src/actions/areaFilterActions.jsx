import { createAction } from '@reduxjs/toolkit';

const setAreaFilter = createAction('areaFilter/setFilter');
const setCenter = createAction('center/setCenter');
const setKinderGartens = createAction('kinderGartens/setKinderGartens');
const setUser = createAction('user/setUser');
const setCurUser = createAction('curUser/setCurUser');
const setCurProfile = createAction('curProfile/setCurProfile');
const setInputValue = createAction('inputValue/setInputValue');
const setSearchValue = createAction('searchValue/setSearchValue');
const setAuth = createAction('auth/setAuth');
const setActiveIndex = createAction('activeIndex/setActiveIndex');

export {
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
};
