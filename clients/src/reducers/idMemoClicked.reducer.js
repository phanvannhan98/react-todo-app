import * as types from '../constants/acctionType'

var InitialState = '';

export default (state = InitialState, action) => {
    switch (action.type) {
        case types.SET_IDMEMO_CLICKED:
            state = action.data;
            return state;
        default:
            return state;
    }
};
