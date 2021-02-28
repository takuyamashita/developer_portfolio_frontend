import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import {
    connectRouter,
    routerMiddleware,
} from 'connected-react-router';
import thunk from 'redux-thunk';

import {AdminReducer} from '../Admin/reducers';
import { ProductReducer } from '../Product/reducers';


export default function createStore(history) {
    return reduxCreateStore(
        combineReducers(
            {
                router:connectRouter(history),
                admin:AdminReducer,
                product: ProductReducer,
            }
        ),
        applyMiddleware(
            routerMiddleware(history),
            thunk,
        )
    )
};