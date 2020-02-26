import { combineReducers } from 'redux';
import memo from './memo.reducer';
import category from './category.reducer';
import idMemoClicked from './idMemoClicked.reducer';
import idCategoryClicked from './idCategoryClicked.reducer';

export default combineReducers({
    memo,
    category,
    idMemoClicked,
    idCategoryClicked
})