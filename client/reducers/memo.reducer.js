import * as types from '../constants/acctionType'

var InitialState = [];

export default (state = InitialState, action) => {
    switch (action.type) {
        case types.GET_ALL_MEMO:
            state = action.data;
            return [...state];
        case types.UPDATE_MEMO_ITEM:
            for (var i = 0; i < state.length; i++) {
                if(state[i]._id === action.data._id){
                    state[i] = action.data
                }
            }
            return [...state];
        default:
            return [...state];
    }
};
