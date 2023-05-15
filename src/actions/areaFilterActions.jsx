import { createAction } from '@reduxjs/toolkit';

const setAreaFilter = createAction('areaFilter/setFilter');
const setCenter = createAction('center/setCenter');
const setKinderGartens = createAction('kinderGartens/setKinderGartens');
const setUser = createAction('user/setUser');
const setCurUser = createAction('curUser/setCurUser');
const setCurProfile = createAction('curProfile/setCurProfile');

export {
  setAreaFilter,
  setCenter,
  setKinderGartens,
  setUser,
  setCurUser,
  setCurProfile,
};
