import * as actionTypes from "./actions";

const initState = {
  userData: {
    firstName: "",
    lastName: "",
    email: "",
    id: 1,
    uuid: "",
    recipes: [
      {
        title: "",
        categories: ["", ""],
        keywords: "summer, apple pie, mediterranean",
        private: false,
        // createdBy: `${this.firstName} ${this.lastName}`, //*changed 'userData' to 'this'. >>>created on backend?
        source: "",
        instructions: [
          { step: 1, text: "Preheat oven to 400°" },
          { step: 2, text: "Chop Vegetables" },
        ],
        ingredients: [
          {
            name: "Rice",
            quantity: 3, //integer
            unit: "cups", //cup, tablespoon
          },
        ],
      },
    ],
  },
  isLoggedIn: false,
  isLoading: false,
  error: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_USER:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATING_USER: //userData obj needed as payload
      return {
        ...state,
        userData: action.payload,
        isLoading: false,
        isLoggedIn: true,
        error: false,
      };
    case actionTypes.ADD_RECIPE: //needs a recipe Obj as payload
      return {
        ...state,
        userData: {
          ...state.userData,
          recipes: [...state.userData.recipes, action.payload],
        },
      };
    case actionTypes.DELETE_RECIPE:
      return{
        ...state,
        userData: {
          ...state.userData,
          recipes: [state.userData.recipes.filter(rec => {
            return 'aasdf' //!
          })]
        }
      };
    case actionTypes.EDIT_RECIPE:
        return{
          ...state,
          userData: {
            ...state.userData,
            recipes: [state.userData.recipes]
          }
        };
    default:
      return state;
  }
};

export default reducer;
