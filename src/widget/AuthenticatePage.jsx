import { Box, CircularProgress, Container } from '@material-ui/core';
import { Fragment, react, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../reducks/Admin/operations';
import { getAdmin } from '../reducks/Admin/selectors';

const AuthenticatePage = (props) => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const admin = getAdmin(selector);

    const [isLoading, setIsLoading] = useState(!admin.isSignedIn);

    useEffect(() => {
        if(!admin.isSignedIn){
            dispatch(authenticate());
        }
    },[]);

    useEffect(() => {
        if(admin.isSignedIn) setIsLoading(false);
    },[admin.isSignedIn]);

    return (
        <Fragment>
            {isLoading ?
                <Container>
                    <Box display='flex' justifyContent='center' alignItems='center' height='80vh'>
                        <CircularProgress/>
                    </Box>
                </Container>
                :
                admin.isSignedIn && props.children
            }
        </Fragment>
    );
};
export default AuthenticatePage;