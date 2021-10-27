import * as ActionTypes from '../ActionTypes';
import {GetUserInfo} from '../../services/AccountService';

export const GetUserInfoAction = () => {
    return async (dispatch) => {
        await GetUserInfo().then((response) => {
            const res = response.user_info;
            dispatch({type: ActionTypes.GET_ALL_USER_INFO, res});
        }, error => {
            dispatch({type: ActionTypes.CODE_ERROR, error});
        });
    }
}
