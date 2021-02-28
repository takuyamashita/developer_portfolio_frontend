import Api from '../../Api';
import * as Actions from './actions';

export const getProducts = () => {
    return async (dispatch, getState) => {
        
        dispatch( Actions.setIsLoading(true));
        
        const response = await Api.get('/product');
        
        dispatch(Actions.setProducts(response.data.data));
        
        dispatch( Actions.setIsLoading(false));
    };
};
