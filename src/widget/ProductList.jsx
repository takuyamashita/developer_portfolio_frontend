import { Box } from '@material-ui/core';
import { Fragment, react } from 'react';
import { useSelector } from 'react-redux';
import { getProducts } from '../reducks/Product/selectors';
import ProductListItem from './ProductListItem';

const ProductList = () => {
    const selector = useSelector(state => state);
    const products = getProducts(selector);

    return (
        <Fragment>
            {
                products.map((product, index) => 
                    <Box py={3} key={product.id}>
                        <ProductListItem product={product}/>
                    </Box>
                )
            }
        </Fragment>
    );
};
export default ProductList;