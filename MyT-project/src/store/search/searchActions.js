import searchActions from "./searchTypes";

/* search */
const searchRequest = () => {
  return { type: searchActions.SEARCH_REQUEST };
};

const searchdSuccess = (value) => {
  return {
    type: searchActions.SEARCH_SUCCESS,
    payload: { value },
  };
};

export function search(value) {
  return (dispatch) => {
    dispatch(searchRequest());

    dispatch(searchdSuccess(value));
  };
}
