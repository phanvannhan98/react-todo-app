import * as types from '../constants/acctionType'

let InitialState = '';

export default (state = InitialState, action) => {
    switch (action.type) {
        case types.SET_IDCATEGORY_CLICKED:
            state = action.data;
            return state;
        default:
            return state;
    }
};
