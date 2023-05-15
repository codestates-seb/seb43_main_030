import { createAction } from '@reduxjs/toolkit';

const setAreaFilter = createAction('areaFilter/setFilter');
const setCenter = createAction('center/setCenter');
const setKinderGartens = createAction('kinderGartens/setKinderGartens');

export { setAreaFilter, setCenter, setKinderGartens };
