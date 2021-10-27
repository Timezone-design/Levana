import * as ActionTypes from '../ActionTypes';

export const NotifAction = (notif) => {
    return (dispatch) => {
        const res = {
            'notif': notif
        };
        dispatch({type: ActionTypes.NOTIF, res});
    }
}
