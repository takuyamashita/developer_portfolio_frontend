import { push } from 'connected-react-router';
import Api from '../../Api';
import { signIn as signInAction, setProductIsLoading, setProducts } from './actions';

const setCsrfCookie = async () => {
    await Api.get('/csrf-cookie');
}

export const signIn = (name, password) => {
    return async (dispatch, getState) => {

        setCsrfCookie();

        const response = await Api.post('/login', {name:name,password:password});

        if(response.status == 200){
            const state = getState();
            dispatch(signInAction(true));
            dispatch(push('/admin'));
        }
    };
};

export const getProducts = () => {
    return async (dispatch, getState) => {

        dispatch(setProductIsLoading(true));
        
        const response = await Api.get('/admin/product');

        if(response.status == 401){
            
        }else{
            dispatch(setProducts(response.data.data));
        }

        dispatch(setProductIsLoading(false));
    };
};

export const postProduct = (postData, target = null) => {
    return async(dispatch, getState) => {

        const response = target == null ? await Api.post('/admin/product',postData) : await Api.post(`/admin/product/${target.route_name}`,postData,{headers:{'X-HTTP-Method-Override': 'PUT'}});
        
    };
}

export const authenticate = () => {
    return async (dispatch, getState) => {

        const response = await Api.get('/authenticate/is/admin');

        if(`${response.status}`[0] === '2'){

            dispatch(signInAction(true));
        }else{

            dispatch(signInAction(false));
            dispatch(push({
                pathname:'/admin',
                state:{
                    isRenderLoginForm:true,
                },
            }));
        }
    };
};