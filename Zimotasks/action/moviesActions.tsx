import { FETCH_MOVIES_SUCCESS } from "../constants";

export function fetchMoviesSuccess (movies){
  return {
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
}
};
