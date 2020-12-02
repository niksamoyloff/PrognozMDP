import * as types from '../constants/ActionTypes';
import axios from 'axios';

export const getBitMask = bitMask => {
    return dispatch => {
        dispatch({
            type: types.GET_BIT_MASK,
            payload: {
                bitMask
            }
        });
    };
}
export const getCurrentSection = section => {
    return dispatch => {
        dispatch({
            type: types.GET_CURRENT_SECTION,
            payload: {
                section
            }
        });
    }
}
export const getDisabledEq = disabledEq => {
    return dispatch => {
        dispatch({
            type: types.GET_DISABLED_EQUIPMENT,
            payload: {
                disabledEq
            }
        });
    }
}
export const getDatetime = (dt, isCurrentDt) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.GET_DATETIME,
            payload: {
                dt,
                isCurrentDt
            }
        });
        console.log(getState());
    }
}
export const getFlowName = name => {
    return (dispatch, getState) => {
        dispatch({
            type: types.GET_FLOW_NAME,
            payload: {
                name
            }
        });
        console.log(getState());
    }
}
export const fetchFlowWithValues = (flowName, sectionId, bitMask, dt) => {
    return async (dispatch, getState) => {
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
                console.log(getState());
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
