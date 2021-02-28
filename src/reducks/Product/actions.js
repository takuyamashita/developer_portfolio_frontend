export const SET_PUBLIC_IS_LOADING = 'SET_PUBLIC_IS_LOADING';
export const setIsLoading = (isLoading) => {
    return {
        type:'SET_PUBLIC_IS_LOADING',
        payload:{
            isLoading:isLoading,
        },
    };
};

export const SET_PUBLIC_PRODUCTS = 'SET_PUBLIC_PRODUCTS';
export const setProducts = (products) => {
    return {
        type:'SET_PUBLIC_PRODUCTS',
        payload:{
            products:[...products],
        },
    };
};