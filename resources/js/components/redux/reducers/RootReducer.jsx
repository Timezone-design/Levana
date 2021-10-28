import {combineReducers} from "redux";
import UserReducer from "./UserReducer";
import BookingReducer from "./BookingReducer";
import SearchReducer from "./SearchReducer";

const RootReducer = combineReducers({
    user: UserReducer,
    booking:BookingReducer,
    search:SearchReducer,
    
    });

export default RootReducer;
