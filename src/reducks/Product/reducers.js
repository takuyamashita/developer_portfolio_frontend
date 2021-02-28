import * as Actions from './actions';
import initialState from '../store/initialState';

export const ProductReducer = (state = initialState.product, action) => {
    switch (action.type) {
        case Actions.SET_PUBLIC_IS_LOADING:
            return {
                ...state,
                ...action.payload,
            };
        case Actions.SET_PUBLIC_PRODUCTS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}