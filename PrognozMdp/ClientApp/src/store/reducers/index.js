import { combineReducers } from 'redux';
import sectionsReducer from './sections';
import equipmentReducer from './equipment';
import calculationReducer from './calculation';

const rootReducer = combineReducers({
    sectionsReducer,
    equipmentReducer,
    calculationReducer
});

export default rootReducer;