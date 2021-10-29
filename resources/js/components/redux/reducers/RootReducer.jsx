import {combineReducers} from "redux";
import UserReducer from "./UserReducer";
import BookingReducer from "./BookingReducer";
import SearchReducer from "./SearchReducer";

const RootReducer = combineReducers({
    booking:BookingReducer,
    search:SearchReducer,
    user: UserReducer,
    
    });

export default RootReducer;
