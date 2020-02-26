import * as Types from '../constants/acctionType';
import axios from 'axios';

// Category
export const actGetAllCategory = (data) => {
    return {
        type: Types.GET_ALL_CATEGORY,
        data
    }
}

export const actGetAllCategoryRequest = () => {
    return (dispath) => {
        axios.get('/api/category').then(data => {
            dispath(actGetAllCategory(data.data));
        })
    }
}

// Memo
export const actGetAllMemo = (data) => {
    return {
        type: Types.GET_ALL_MEMO,
        data
    }
}

export const actGetAllMemoRequest = () => {
    return (dispath) => {
        axios.get('/api/memo').then(data => {
            dispath(actGetAllMemo(data.data));
        })
    }
}

// idMemoClicked
export const actSetIdMemoClicked = (data) => {
    return {
        type: Types.SET_IDMEMO_CLICKED,
        data
    }
}

// idCategoryClicked
export const actSetIdCategoryClicked = (data) => {
    return {
        type: Types.SET_IDCATEGORY_CLICKED,
        data
    }
}