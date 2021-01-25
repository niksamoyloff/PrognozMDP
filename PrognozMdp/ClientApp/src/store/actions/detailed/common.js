import * as types from '../../constants/ActionTypes';

export const toggleShowMode = (modeId, show) => {
    return dispatch => {
        dispatch({
            type: types.TOGGLE_SHOW_MODE,
            payload: {
                modeId,
                show
            }
        });
    };
}