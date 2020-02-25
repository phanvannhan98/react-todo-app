import { combineReducers } from 'redux';
import memo from './memo.reducer';
import category from './category.reducer';

export default combineReducers({
    memo,
    category
})