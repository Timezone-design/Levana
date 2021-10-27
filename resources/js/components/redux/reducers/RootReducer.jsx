import {combineReducers} from "redux";
// import SearchReducer from "./SearchReducer";
// import NotificationReducer from "./NotificationReducer";
import UserReducer from "./UserReducer";
import BookingReducer from "./BookingReducer";
import SearchReducer from "./SearchReducer";

const RootReducer = combineReducers({
    user: UserReducer,
    // notification:NotificationReducer,
    booking:BookingReducer,
    search:SearchReducer,
    
    });

export default RootReducer;
