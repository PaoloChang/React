 import * as types from '../actions/ActionTypes';

 const initialState = {
    number: 0,
    dummy: 'dumbdumb',
    dumbObj: {
        d: 0,
        u: 1,
        m: 2,
        b: 3
    }
 };

 export default function counter(state = initialState, action) {
    // if(typeof state == 'undefined') {
    //     return initialState;
    // }

    switch(action.type) {
        case types.INCREMENT:
            return { 
                ...state, 
                number: state.number + 1,
                dumbObj: { 
                    ...state.dumbObj,
                    u: 0
                }
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }

    /* ... */

    // return state;
 }