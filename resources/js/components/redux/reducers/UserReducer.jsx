import * as ActionTypes from '../ActionTypes';

const initState = {
    userInfo:
        {
            unread_inbox:'',
            unread_request:'',
            unread_total:'',
        }

}

const UserReducer = (state = initState, action) => {
    if(action.res === undefined)
        return { ...state }
    switch (action.type) {
        case ActionTypes.UPDATE_USER_INFO:
            if (Array.isArray(action.res)) {
                let new_userInfo = state.userInfo;
                action.res.map(item => {
                    new_userInfo = {
                        ...new_userInfo,
                        [item.id]:item.value
                    }
                    return null;
                })
                return {
                    ...state,
                    userInfo:new_userInfo
                }
            }
            else {
                return {
                    ...state,
                    userInfo: {
                        ...state.userInfo,
                        [action.res.id]:action.res.value
                    }
                }
            }
        
        default:
            return {
               state
            }
    }
}

export default UserReducer;
