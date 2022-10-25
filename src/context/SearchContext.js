import { useReducer } from "react";
import { createContext } from "react";
import searchReducer from "./searchReducer";
const initialState = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};
export const SearchContext = createContext(initialState);

const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const resetSearchHotels = () => {
    dispatch({
      type: "RESET_SEARCH",
      payload: initialState,
    });
  };
  const newSearchHotels = (searchTerms) => {
    console.log("searchTerms", searchTerms);
    dispatch({
      type: "SEARCH_HOTELS",
      payload: searchTerms,
    });
  };
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        resetSearchHotels,
        newSearchHotels,
        state,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
