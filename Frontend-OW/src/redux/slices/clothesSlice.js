import { createSlice } from "@reduxjs/toolkit";//fct qui cree une partie du state global
import { queryApi } from "../../utils/queryApi";
let initialState = {//contenu quand l'application va tourné
  clothes: [],
  selectedClothe: {},
  errors: "",
};

const clothesSlice = createSlice({
  name: "clothes", //slice va contenir le produit
  initialState, 
  reducers: {//contenir la logique crée
    
    populateClothes(state, action) { //state pour accesze a initialState
      state.clothes = action.payload;
      console.log("action :"+state.clothes)
    },
    selectClothe(state, action) {
      state.selectedClothe = action.payload;//action.payload ce qui est passé en parametre(ancien)
      console.log('selectedClothe')
    },
    unselectClothe(state) {
      state.selectedProduct = null;
      console.log('unselectClothe')
    },
    deleteClothe: (state, action) => {
      const payload = action.payload;
      const index = state.clothes.findIndex((item) => item._id === payload);//si on trouve un produit avec un id==paylod
      if (index !== -1) {
        state.clothes.splice(index, 1);//depuis lindex enlever un seul element
      }
    },
    updateClothe: (state, action) => {
      const payload = action.payload;
      const index = state.clothes.findIndex(//si state.clothes contient un clothes avec un _id==action.payload(clothe)
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.clothes[index] = payload;
      }
    },
    

    //ki titcharga il page mouch kol marra in3aytou lil api, 
    //redux i7ot les données ali ye5ouhom mil api 
    //=>kol marra famma ajout mta les données fil redux d'ou clothes.push(payload)
    //=>payload:object + details mta l'action il kol 
    addClothe: (state, action) => {
      const payload = action.payload;
      console.log("action :"+state.clothes)
      state.clothes.push(payload);
      
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

//une fct qui appelle une autre fct 
export const fetchClothes = () => async (dispatch) => {
  const [res, error] = await queryApi("clothes");//query et non use dans on n'est pas dans un composant on ne peut pas utiliser hooks
  if (error) {
    dispatch(setErrors(error));
  } else {
    dispatch(populateClothes(res)); //on doit appeler l'action avec dispatch
  }
};

export const selectClothes = (state) => {
  console.log('selectClothes')
  return [state.clothes.clothes, state.clothes.errors];//retourner mes clothes+errors | state.pr
};

export const selectSelectedClothe = (state) => {
  return state.clothes.selectedClothe;
};

export const {
  
  populateClothes,   
  selectClothe,
  unselectClothe,
  setErrors,
  deleteClothe,
  updateClothe,
  addClothe,
} = clothesSlice.actions;

export default clothesSlice.reducer;
