import * as ActionTypes from '../ActionTypes';

const initState = {
    notif:true,
}

const NotifReducer = (state = initState, action) => {
    if(action.res === undefined)
        return { ...state }
    switch (action.type) {
        case ActionTypes.NOTIF:
            return {
                ...state,
                notif: action.res.notif
            }
        
        default:
            return {
               state
            }
    }
}

export default NotifReducer;
