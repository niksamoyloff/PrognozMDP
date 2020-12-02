import * as types from '../constants/ActionTypes';
import axios from 'axios';

export const fetchEquipment = (sectionId) => {
    return async dispatch => {
        dispatch(fetchEquipmentStarted());
        await axios.get('SimplifiedAnalysis/GetEquipmentBySection',
            {
                params: { sectionId: sectionId }
            })
            .then(res => {
                dispatch(fetchEquipmentSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchEquipmentFailure(err));
            });
    };
};

const fetchEquipmentStarted = () => ({
    type: types.FETCH_EQUIPMENT_STARTED
});

const fetchEquipmentSuccess = data => ({
    type: types.FETCH_EQUIPMENT_SUCCESS,
    payload: {
        data
    }
});

const fetchEquipmentFailure = error => ({
    type: types.FETCH_EQUIPMENT_FAILURE,
    payload: {
        error
    }
})