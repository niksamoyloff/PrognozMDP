import * as types from '../../constants/ActionTypes';
import axios from 'axios';

export const fetchSections = () => {
    return async (dispatch, getState) => {
        dispatch(fetchSectionsStarted());
        await axios.get('SimplifiedAnalysis/GetSections')
            .then(res => {
                dispatch(fetchSectionsSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchSectionsFailure(err));
            });
    };
};

const fetchSectionsStarted = () => ({
    type: types.FETCH_SECTIONS_STARTED
});

const fetchSectionsSuccess = data => ({
    type: types.FETCH_SECTIONS_SUCCESS,
    payload: {
        data
    }
});

const fetchSectionsFailure = error => ({
    type: types.FETCH_SECTIONS_FAILURE,
    payload: {
        error
    }
});