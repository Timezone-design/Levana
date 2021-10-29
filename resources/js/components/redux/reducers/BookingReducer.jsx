import * as ActionTypes from '../ActionTypes';

const initState = {
    index:0,
    detail: {
        id:0,
        country:'',
        city:'',
        gender:'Male',
        duration:1,
        time:Date.now(),
        type:'incall',
        full_name:'',
        name:'',
        price:'',
        count:'',
    },
}

export default function BookingReducer (state = initState, action) {
    if(action.res === undefined)
        return { ...state }
    switch (action.type) {
        case ActionTypes.BOOKING_NEXT:
            return {
                ...state,
                index: action.res.index
            }
        case ActionTypes.BOOKING_BACK:
            return {
                ...state,
                index: action.res.index
            }
        case ActionTypes.UPDATE_BOOKING_DETAIL:
            if (Array.isArray(action.res)) {
                let newDetail = state.detail;
                action.res.map(item => {
                    newDetail = {
                        ...newDetail,
                        [item.id]:item.value
                    }
                    return null;
                })
                return {
                    ...state,
                    detail:newDetail
                }
            }
            else {
                return {
                    ...state,
                    detail: {
                        ...state.detail,
                        [action.res.id]:action.res.value
                    }
                }
            }
            
        default:
            return state;
    }
}

// export default BookingReducer;
