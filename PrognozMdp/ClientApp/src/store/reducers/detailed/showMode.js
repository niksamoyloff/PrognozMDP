import * as types from '../../constants/ActionTypes';

const initialState = {
    curModeId: "0",
    show: false,
    error: null
}

export default function detailedShowModeReducer(state = initialState, action) {
    switch (action.type) {
    //case types.TOGGLE_SHOW_STATE_OF_PA_MODE:
    //case types.TOGGLE_SHOW_VOLUME_OF_UV_MODE:
    case types.TOGGLE_SHOW_MODE:
        return {
            ...state, 
            curModeId: action.payload.modeId,
            show: action.payload.show
        };
    default:
        return state;
    }
}