import * as types from '../constants/acctionType'

let InitialState = [];

export default (state = InitialState, action) => {
    switch (action.type) {
        case types.GET_ALL_MEMO:
            state = action.data;
            return [...state];
        case types.UPDATE_MEMO_ITEM:
            for (let i = 0; i < state.length; i++) {
                if(state[i]._id === action.data._id){
                    state[i] = action.data
                }
            }
            return [...state];
        case types.ADD_NEW_MEMO:
            state = [...state,action.data]
            return [...state]
        case types.DELETE_ONE_MEMO:
            state = state.filter(v => v._id !== action.data._id)
            return [...state]
        default:
            return [...state];
    }
};
