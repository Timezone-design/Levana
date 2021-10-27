import * as ActionTypes from '../ActionTypes';

export const BookingNextAction = (index) => {
    return (dispatch) => {
        const res = {
            'index': index + 1
        };
        dispatch({type: ActionTypes.BOOKING_NEXT, res});
    }
}

export const BookingBackAction = (index) => {
    return (dispatch) => {
        const res = {
            'index': index - 1
        };
        dispatch({type: ActionTypes.BOOKING_BACK, res});
    }
}
