import { Fragment, react, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProducts } from '../reducks/Product/selectors';
import { Box, Card, CircularProgress, Container, IconButton, Typography } from '@material-ui/core';
import { getProducts as getProductsOperation } from '../reducks/Product/operations';
import { Link } from 'react-router-dom'; 
import Api from '../Api';
import { ArrowBack } from '@material-ui/icons';
import PublicPage from '../widget/PublicPage';
import ProductDetailHeader from '../widget/ProductDetailHeader';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
    pageSwitcher:{
        color:'#999',
        '& :hover':{
            cursor:'pointer',
        }
    },
    activePageSwitcher:{
        color:'#000',
    }
}));

const ProductDetail = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const selector = useSelector(state => state);
    const { routeName, page } = useParams();
    const products = getProducts(selector);
    
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const mode = page || 'description';

    useEffect(async() =>{
        if(products === null){

            const response = await Api.get(`/product/${routeName}`);

            setProduct(response.data.data);
        }else{
            const filteredProducts = products.filter(product => product.route_name === routeName);
            
            if(filteredProducts.length > 0){
                setProduct(filteredProducts[0]);
            }
        }
        setIsLoading(false);
    },[]);

    useEffect(() => {
        if(products === null) dispatch(getProductsOperation());
    },[]);

    const getContent = () => (
        <Box>
            {mode === 'description' && <Box whiteSpace='pre-wrap'>{product.description}</Box>}
            {mode === 'privacyPolicy' && <Box dangerouslySetInnerHTML={{__html:product.html_privacy_policy}}></Box>}
        </Box>
    );

    return (
        <PublicPage>
            <Container maxWidth='md'>
                {
                    isLoading ?
                    <Box display='flex' justifyContent='center' marginTop='50vh'>
                        <CircularProgress/>
                    </Box>
                    :
                    <Box pb={3}>
                        <Card>
                            <Box display='flex' alignItems='center'>
                                <Link to='/'>
                                    <IconButton>
                                        <ArrowBack/>
                                    </IconButton>
                                </Link>
                            </Box>
                            <ProductDetailHeader product={product}/>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <Box className={`${classes.pageSwitcher} ${mode === 'description' ? classes.activePageSwitcher : ''}` }
                                    onClick={() => dispatch(push(`/product/${product.route_name}/description`))}
                                >
                                    <Typography>Description</Typography>
                                </Box>
                                <Box mx={2} width='2px' height='15px'
                                    style={{
                                        backgroundColor:'#323232'
                                    }}
                                >
                                </Box>
                                <Box className={`${classes.pageSwitcher} ${mode === 'privacyPolicy' ? classes.activePageSwitcher : ''}` }
                                    onClick={() => dispatch(push(`/product/${product.route_name}/privacyPolicy`))}
                                >
                                    <Typography>Privacy Policy</Typography>
                                </Box>
                            </Box>
                            <Box p={4}>
                                <Box my={3}>
                                    {mode === 'description' && <Typography variant='h2'>Description</Typography>}
                                    {mode === 'privacyPolicy' && <Typography variant='h2'>Privacy Policy</Typography>}
                                </Box>
                                {getContent()}
                            </Box>
                        </Card>
                    </Box>
                }
            </Container>
        </PublicPage>
    );
};
export default ProductDetail;

// ProductDetail.propTypes = {
//     title:PropTypes.string.isRequired,
// };