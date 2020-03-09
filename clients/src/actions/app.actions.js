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

export const actAddNewCategory = (data) => {
    return {
        type: Types.ADD_NEW_CATEGORY,
        data
    }
}

export const actAddNewCategoryRequest = (name) => {
    return (dispath) => {
        CallAPI('/api/category', 'POST', {name}).then(data => {
            dispath(actAddNewCategory(data.data));
        })
    }
}

export const actDeleteOneCategory = (data) => {
    return {
        type: Types.DELETE_ONE_CATEGORY,
        data
    }
}

export const actDeleteOneCategoryRequest = (id) => {
    return (dispath) => {
        dispath(actDeleteOneCategory(id));
        CallAPI('/api/category', 'DELETE', {id}).then(data => {
        }).catch(err => console.log(err))
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
        CallAPI('/api/memo','PATCH', data).catch(err => console.log(err))
    }
}

export const actAddNewMemo = (data) => {
    return {
        type: Types.ADD_NEW_MEMO,
        data
    }
}

export const actAddNewMemoRequest = (data) => {
    return (dispath) => {
        CallAPI('/api/memo','POST', data).then(doc => {dispath(actAddNewMemo(doc.data))}).catch(err => console.log(err))
    }
}

export const actDeleteOneMemo = (data) => {
    return {
        type: Types.DELETE_ONE_MEMO,
        data
    }
}

export const actDeleteOneMemoRequest = (data) => {
    return (dispath) => {
        dispath(actDeleteOneMemo(data))
        CallAPI('/api/memo','DELETE', data).catch(err => console.log(err))
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