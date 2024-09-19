import { combineReducers } from "redux";
import { noteReducer } from "./reducers/noteReducer";
import { themeReducer } from "./reducers/themeReducer";

const rootReducer = combineReducers({
    note : noteReducer,
    theme : themeReducer,
})

export default rootReducer;