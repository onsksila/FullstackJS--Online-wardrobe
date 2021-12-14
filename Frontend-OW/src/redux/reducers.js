import { combineReducers } from "redux";
//react doit contenir une seule liste de reducer
import cart from "./slices/cartSlice";
import clothes from "./slices/clothesSlice";

const reducers = combineReducers({//combinaison des reducers de cart et product pour avoir une seule liste de reducer
  clothes,
  cart,
});

export default reducers;
