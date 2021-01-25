import * as types from '../../constants/ActionTypes';

const initialState = {
    loading: false,
    sections: [],
    selectedSection: null,
    error: null
}

export default function simplifiedSectionsReducer(state = initialState, action) {
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
                sections: action.payload.data
            };
        case types.FETCH_SECTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                sections: []
            };
        case types.SET_SELECTED_SECTION:
            return {
                ...state,
                selectedSection: action.payload.section
            }
        default:
            return state;
    }
}