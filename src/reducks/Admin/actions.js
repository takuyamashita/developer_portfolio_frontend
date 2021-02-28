export const SIGN_IN = 'SIGN_IN';
export const signIn = (isSignedIn) => {
    return {
        type:'SIGN_IN',
        payload:{
            isSignedIn:isSignedIn,
        }
    }
};

export const SET_ADMIN_PRODUCTS = 'SET_ADMIN_PRODUCTS';
export const setProducts = (products) => {
    return {
        type:'SET_ADMIN_PRODUCTS',
        payload:{
            products:[...products],
        },
    };
};

export const SET_ADMIN_PRODUCT_IS_LOADING = 'SET_ADMIN_PRODUCT_IS_LOADING';
export const setProductIsLoading = (isLoading) => {
    return {
        type:'SET_ADMIN_PRODUCT_IS_LOADING',
        payload: {
            isLoading:isLoading,
        },
    };
};