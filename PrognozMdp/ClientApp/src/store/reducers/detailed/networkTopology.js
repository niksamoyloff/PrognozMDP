import * as types from '../../constants/ActionTypes';

export const initialState = {
    loading: false,
    selectedNetItems: [],
    error: null
}

export default function detailedNetworkTopologyReducer(state = initialState, action) {
    switch (action.type) {
    case types.FETCH_NETWORK_ITEM_NAME_STARTED:
        return {
            ...state, 
            loading: true
        };
    case types.FETCH_NETWORK_ITEM_NAME_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null,
            selectedNetItems: 
                action.payload.name.length > 0 ?                        
                    [
                        ...state.selectedNetItems,
                        {
                            id: action.payload.id,
                            name: action.payload.name
                        }
                    ] :
                    [...state.selectedNetItems]
        };
    case types.FETCH_NETWORK_ITEM_NAME_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error
        };
    case types.REMOVE_FROM_SELECTED_NETWORK_ITEMS:
        return {
            ...state,
            selectedNetItems: state.selectedNetItems.filter(item => item.id !== action.payload.id)
        };
    case types.REMOVE_ALL_SELECTED_NETWORK_ITEMS:
        return {
            ...state,
            selectedNetItems: action.payload
        }
    default:
        return state;
    }
}
