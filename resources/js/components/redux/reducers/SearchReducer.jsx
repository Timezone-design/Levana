import * as ActionTypes from '../ActionTypes';

const initState = {
    filter: {
        
    },
}

export default function SearchReducer (state = initState, action) {
    if(action.res === undefined)
        return { ...state }
    switch (action.type) {
        case ActionTypes.UPDATE_SEARCH_FILTER:
            if (Array.isArray(action.res)) {
                let newFilter = state.filter;
                action.res.map(item => {
                    newFilter = {
                        ...newFilter,
                        [item.id]:item.value
                    }
                    return null;
                })
                return {
                    ...state,
                    filter:newFilter
                }
            }
            else {
                return {
                    ...state,
                    filter: {
                        ...state.filter,
                        [action.res.id]:action.res.value
                    }
                }
            }
            
        default:
            return state;
    }
}

// export default SearchReducer;
