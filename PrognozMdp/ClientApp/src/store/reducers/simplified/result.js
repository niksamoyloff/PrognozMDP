import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    error: null,
    flowName: "",
    bitMask: "",
    disabledEq: "",
    isCurrentDt: true,
    dt: "",
    flowWithValues: null,
    section: null
}

export default function simplifiedResultReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_BIT_MASK:
            return {
                ...state, 
                bitMask: action.payload.bitMask
            };
        case types.SET_CURRENT_SECTION:
            return {
                ...state,
                section: action.payload.section
            }
        case types.SET_DISABLED_EQUIPMENT:
            return {
                ...state,
                disabledEq: action.payload.disabledEq
            }
        case types.SET_DATETIME:
            return {
                ...state,
                dt: action.payload.dt,
                isCurrentDt: action.payload.isCurrentDt
            }
        case types.SET_FLOW_NAME:
            return {
                ...state,
                flowName: action.payload.name
            }
        case types.FETCH_FLOW_WITH_VALUES_STARTED:
            return {
                ...state, 
                loading: true
            };
        case types.FETCH_FLOW_WITH_VALUES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                flowWithValues: action.payload.flow
            };
        case types.FETCH_FLOW_WITH_VALUES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                flowWithValues: null
            };
        default:
            return state;
        }
}
