import * as types from '../constants/acctionType'

let InitialState = [];

export default (state = InitialState, action) => {
    switch (action.type) {
        case types.GET_ALL_CATEGORY:
            state = action.data;
            return [...state];
        case types.ADD_NEW_CATEGORY:
            state = [...state, action.data]
            return [...state]
        default:
            return [...state];
    }
};
