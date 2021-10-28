import * as ActionTypes from '../ActionTypes';

const initState = {
    id:'',
    email:'',
    account_type:'',
    unread:'',
    full_name:'',
    name:'',
    active:'',

}

const UserReducer = (state = initState, action) => {
    if(action.res === undefined)
        return { ...state }
    switch (action.type) {
        case ActionTypes.UPDATE_USER_INFO:
            Object.entries(action.res).map(([key, value]) => {
                return {
                    ...state,
                    [key]:value
                }
            });

        case ActionTypes.GET_USER_INFO:
            return {
                ...state,
                id:action.res.user_info.id,
                email:action.res.user_info.email,
                full_name:action.res.user_info.full_name,
                name:action.res.user_info.name,
                active:action.res.user_info.active,
                account_type:action.res.user_info.account_type,

                unread:action.res.unread,
            }
        case ActionTypes.ADD_UNREAD:
            return {
                ...state,
                unread:state.unread + action.res,
            }
        case ActionTypes.DISCOUNT_UNREAD:
            return {
                ...state,
                unread:state.unread - action.res.count,
            }
        
        default:
            return {
               state
            }
    }
}

export default UserReducer;
