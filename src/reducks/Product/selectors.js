import {createSelector} from 'reselect';

const productSelector = (state) => state.product;

export const getProducts = createSelector(
    [productSelector],
    state => state.products,
);
export const getIsLoading = createSelector(
    [productSelector],
    state => state.isLoading,
);