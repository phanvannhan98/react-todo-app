import * as Types from '../constants/acctionType';
import axios from 'axios';

// Category
export const actGetAllCategory = (data) => {
    return {
        type: Types.GET_ALL_CATEGORY,
        data
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
        axios.get('/api/memo').then(data => dispath(actGetAllMemo(data.data)))
    }
}