import { legacy_createStore as createStore } from "redux"
import rootReducer from "./rootreducer";

export const store = createStore(rootReducer);