import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
//etat global de redux :des var a partager dans toutes lapplication
export default configureStore({
  reducer: rootReducers, 
});

/*Grace a redux, on aura un accés global au produits et CRUD des produits sur toute l'application et on peut suivre l'état des produits dans n'importe que page ??*/