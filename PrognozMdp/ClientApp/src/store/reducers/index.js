import { combineReducers } from 'redux';
import simplifiedSectionsReducer from './simplified/sections';
import simplifiedEquipmentReducer from './simplified/equipment';
import simplifiedResultReducer from './simplified/result';
import detailedShowModeReducer from './detailed/showMode';
import detailedNetworkTopologyReducer from './detailed/networkTopology';
import detailedResultReducer from './detailed/result';

const rootReducer = combineReducers({
    simplifiedSectionsReducer,
    simplifiedEquipmentReducer,
    simplifiedResultReducer,
    detailedShowModeReducer,
    detailedNetworkTopologyReducer,
    detailedResultReducer
});

export default rootReducer;