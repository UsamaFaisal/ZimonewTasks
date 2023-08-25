import { configureStore, combineReducers } from '@reduxjs/toolkit';
import moviesReducer from '../reducers/moviesReducer';
import countReducer from '../reducers/countReducer';

const store = configureStore({
  reducer: moviesReducer
});

export default store;