import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    show: false,
    error: null,
    data: []
}

export default function detailedResultReducer(state = initialState, action) {
    switch (action.type) {
    case types.SHOW_RESULTS:
        return {
            ...state,
            show: action.payload.show
        }
    case types.FETCH_RESULTS_BY_MODE_STARTED:
        return {
            ...state,
            show: true,
            loading: true
        };
    case types.FETCH_RESULTS_BY_MODE_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload.data
        }
    case types.FETCH_RESULTS_BY_MODE_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error
        }
    default:
        return state;
    }
}