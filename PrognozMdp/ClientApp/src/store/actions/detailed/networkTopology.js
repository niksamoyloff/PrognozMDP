import * as types from '../../constants/ActionTypes';
import axios from 'axios';

export const fetchNetItemNameById = id => {
    return async (dispatch, getState) => {
        dispatch(fetchNetItemNameStarted());
        await axios.get('DetailedAnalysis/GetNetworkItemName',
                {
                    params: { itemId: id }
                })
            .then(res => {
                dispatch(fetchNetItemNameSuccess(id, res.data));
            })
            .catch(err => {
                dispatch(fetchNetItemNameFailure(err));
            });
    };
};
const fetchNetItemNameStarted = () => ({
    type: types.FETCH_NETWORK_ITEM_NAME_STARTED
});
const fetchNetItemNameSuccess = (id, name) => ({
    type: types.FETCH_NETWORK_ITEM_NAME_SUCCESS,
    payload: {
        id,
        name
    }
});
const fetchNetItemNameFailure = error => ({
    type: types.FETCH_NETWORK_ITEM_NAME_FAILURE,
    payload: {
        error
    }
});

export const removeFromSelectedItems = id => {
    return (dispatch, getState) => {
        dispatch({
            type: types.REMOVE_FROM_SELECTED_NETWORK_ITEMS,
            payload: {
                id
            }
        });    
    }
}

export const removeAllSelectedItems = () => {
    return (dispatch, getState) => {
        dispatch({
            type: types.REMOVE_ALL_SELECTED_NETWORK_ITEMS,
            payload: []
        });
    }
}