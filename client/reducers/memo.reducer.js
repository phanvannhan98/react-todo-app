import * as types from '../constants/acctionType'

var InitialState = [];

export default (state = InitialState, action) => {
    switch (action.type) {
        case types.GET_ALL_MEMO:
            state = action.data;
            return [...state];
        default:
            return [...state];
    }
};
