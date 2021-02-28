import {createSelector} from 'reselect';

const adminSelector = (state) => state.admin;

export const getAdmin = createSelector(
    [adminSelector],
    state => state,
);
export const getProducts = createSelector(
    [adminSelector],
    state => state.product.products,
);