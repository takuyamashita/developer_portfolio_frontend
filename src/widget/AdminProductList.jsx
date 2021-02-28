import { Box, Button, Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router';
import { Fragment, react } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../reducks/Admin/selectors';
import AdminProductItem from './AdminProductItem';

const useStyle = makeStyles((theme) => ({
    root:{

    },
    mt:{
        marginTop:theme.spacing(2),
    }
}));

const AdminProductList = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const classes = useStyle();
    const products = getProducts(selector);

    return (
        <div className={classes.mt}>
            <Typography variant='h3' color='textSecondary'>
                Products
            </Typography>
            {
                products.length < 1 ?
                    <div className={classes.mt}>
                        <Box display='flex' justifyContent='center'>
                            <div>
                                <Typography variant='h3' color='textSecondary'>
                                    No Product ...
                                </Typography>
                                <Box display='flex' justifyContent='center'>
                                    <Button className={classes.mt} variant="contained" color="primary"
                                        onClick={() => dispatch(push('/product/edit'))}
                                    >
                                        add new product
                                    </Button>
                                </Box>
                            </div>
                        </Box>
                    </div>
                    :
                    <Fragment>
                        {products.map((product,index) => <AdminProductItem key={product.id} product={product}/>)}
                        <Box display='flex' justifyContent='end'>
                            <Button color='primary' variant='contained'
                                onClick={() => dispatch(push('/product/edit'))}
                            >
                                New Product
                            </Button>
                        </Box>
                    </Fragment>
            }
        </div>
    );
};
export default AdminProductList;