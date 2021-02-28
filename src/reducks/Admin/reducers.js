import * as Actions from './actions';
import initialState from '../store/initialState';

export const AdminReducer = (state = initialState.admin, action) => {
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload,
            }
        case Actions.SET_ADMIN_PRODUCT_IS_LOADING:
            return {
                ...state,
                product:{
                    ...state.product,
                    ...action.payload,
                }
            };
        case Actions.SET_ADMIN_PRODUCTS:
            return {
                ...state,
                product:{
                    ...state.product,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
}