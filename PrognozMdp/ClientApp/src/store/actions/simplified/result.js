import * as types from '../../constants/ActionTypes';
import axios from 'axios';

export const setBitMask = bitMask => {
    return dispatch => {
        dispatch({
            type: types.SET_BIT_MASK,
            payload: {
                bitMask
            }
        });
    };
}
export const setDisabledEq = disabledEq => {
    return dispatch => {
        dispatch({
            type: types.SET_DISABLED_EQUIPMENT,
            payload: {
                disabledEq
            }
        });
    }
}
export const setDatetime = (dt, isCurrentDt) => {
    return dispatch => {
        dispatch({
            type: types.SET_DATETIME,
            payload: {
                dt,
                isCurrentDt
            }
        });
    }
}
export const setFlowName = name => {
    return dispatch => {
        dispatch({
            type: types.SET_FLOW_NAME,
            payload: {
                name
            }
        });
    }
}
export const fetchFlowWithValues = (flowName, sectionId, bitMask, dt) => {
    return async dispatch => {
        dispatch(fetchFlowValueStarted());
        await axios.get('SimplifiedAnalysis/CalculateFlowByScheme',
                {
                    params: {
                        flow: flowName,
                        sectionId: sectionId,
                        mask: bitMask,
                        dt: dt
                    }
                })
            .then(res => {
                dispatch(fetchFlowValueSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchFlowValueFailure(err));
            });
    };
};
const fetchFlowValueStarted = () => ({
    type: types.FETCH_FLOW_WITH_VALUES_STARTED
});
const fetchFlowValueSuccess = flow => ({
    type: types.FETCH_FLOW_WITH_VALUES_SUCCESS,
    payload: {
        flow
    }
});
const fetchFlowValueFailure = error => ({
    type: types.FETCH_FLOW_WITH_VALUES_FAILURE,
    payload: {
        error
    }
});
