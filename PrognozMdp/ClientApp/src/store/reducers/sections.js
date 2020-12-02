import * as types from '../constants/ActionTypes';

const initialState = {
    loading: false,
    items: {},
    error: null
}

export default function sectionsReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_SECTIONS_STARTED:
            return {
                 ...state, 
                 loading: true
            };
        case types.FETCH_SECTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                items: action.payload.data
            };
        case types.FETCH_SECTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        default:
            return state;
    }
}