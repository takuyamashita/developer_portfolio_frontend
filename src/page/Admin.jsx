import { Box, CircularProgress, Container } from '@material-ui/core';
import react, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin } from "../reducks/Admin/selectors";
import AppBar from '../widget/AppBar';
import LoginForm from '../widget/LoginForm';
import { getProducts } from '../reducks/Admin/operations';
import { push } from 'connected-react-router';
import AdminProductList from '../widget/AdminProductList';
import AuthenticatePage from '../widget/AuthenticatePage';

const Admin = (props) => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const admin = getAdmin(selector);
    const isRenderLoginForm = props.location.state ? !!props.location.state.isRenderLoginForm:false;

    useEffect(() => {
        if(admin.product.products == null && admin.isSignedIn) dispatch(getProducts());
    },[admin.isSignedIn]);
    
    return isRenderLoginForm ?
        <LoginForm/>
        :
        <AuthenticatePage>
            {admin.product.isLoading ?
                <Box display='flex' justifyContent='center'>
                    <CircularProgress/>
                </Box>
                :
                <Container maxWidth='md'>
                    <AdminProductList/>
                </Container>
            }
        </AuthenticatePage>
};
export default Admin;