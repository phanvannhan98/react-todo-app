import * as Types from '../constants/acctionType';
import CallAPI from '../utils/apiCaller';

// Category
export const actGetAllCategory = (data) => {
    return {
        type: Types.GET_ALL_CATEGORY,
        data
    }
}

export const actGetAllCategoryRequest = () => {
    return (dispath) => {
        CallAPI('/api/category').then(data => {
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
        CallAPI('/api/memo').then(data => {
            dispath(actGetAllMemo(data.data));
            if(data.data.length){
                dispath(actSetIdMemoClicked(data.data[0]._id))
            }
        })
    }
}

export const actUpdateMemoItem = (data) => {
    return {
        type: Types.UPDATE_MEMO_ITEM,
        data
    }
}

export const actUpdateMemoItemRequest = (data) => {
    return (dispath) => {
        dispath(actUpdateMemoItem(data));
        CallAPI('/api/memo','PATCH', data).then(doc => console.log(doc)).catch(err => console.log(err))
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