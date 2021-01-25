import * as types from '../../constants/ActionTypes';
import axios from 'axios';

export const fetchResults = items => {
    const qs = require('qs');
    return async (dispatch, getState) => {
        dispatch(fetchResultsStarted());
        await axios.get('DetailedAnalysis/GetUncontrolledSections',
                {
                    params: { items: items },
                    paramsSerializer: params => {
                        return qs.stringify(params);
                    }
                })
            .then(res => {
                if (res.data)
                    dispatch(fetchResultsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchResultsFailure(err));
            });
    };
};
const fetchResultsStarted = () => ({
    type: types.FETCH_RESULTS_BY_MODE_STARTED
});
const fetchResultsSuccess = data => ({
    type: types.FETCH_RESULTS_BY_MODE_SUCCESS,
    payload: {
        data
    }
});
const fetchResultsFailure = error => ({
    type: types.FETCH_RESULTS_BY_MODE_FAILURE,
    payload: {
        error
    }
});

export const showResults = show => {
    return dispatch => {
        dispatch({
            type: types.SHOW_RESULTS,
            payload: {
                show
            }
        });
    }
}

//export const removeFromSelectedItems = id => {
//    return (dispatch, getState) => {
//        dispatch({
//            type: types.REMOVE_FROM_SELECTED_NETWORK_ITEMS,
//            payload: {
//                id
//            }
//        });    
//    }
//}

//export const removeAllSelectedItems = () => {
//    return (dispatch, getState) => {
//        dispatch({
//            type: types.REMOVE_ALL_SELECTED_NETWORK_ITEMS,
//            payload: []
//        });
//    }
//}