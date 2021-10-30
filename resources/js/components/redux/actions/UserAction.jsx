import * as ActionTypes from '../ActionTypes';
import {GetUserInfo} from '../../services/AccountService';
import {UpdateUnread} from '../../services/ChatService';

export const GetUserInfoAction = () => {
    return async (dispatch) => {
        await GetUserInfo().then((res) => {
            dispatch({type: ActionTypes.GET_USER_INFO, res});
        }, error => {
            dispatch({type: ActionTypes.CODE_ERROR, error});
        });
    }
}

export const AddUnreadAction = (res) => {
    return (dispatch) => {
        dispatch({type: ActionTypes.ADD_UNREAD, res});
    }
}

export const DiscountUnreadAction = (data) => {
    return async (dispatch) => {
        await UpdateUnread(data).then((res) => {
            console.log(res);
            dispatch({type: ActionTypes.DISCOUNT_UNREAD, res});
        }, error => {
            dispatch({type: ActionTypes.CODE_ERROR, error});
        });
    }
}
