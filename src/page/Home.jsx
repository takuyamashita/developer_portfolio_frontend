import { Fragment, react, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getIsLoading } from '../reducks/Product/selectors';
import { getProducts as getProductsOperation } from '../reducks/Product/operations';
import { push } from "connected-react-router";
import PublicPage from "../widget/PublicPage";
import { Box, CircularProgress, Container } from "@material-ui/core";
import ProductList from "../widget/ProductList";


const Home = () => {
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const products = getProducts(selector);
    const isLoading = getIsLoading(selector);

    useEffect(() => {
        if(products == null) dispatch(getProductsOperation());
        document.title = 'TY Swing Studio'
    },[]);

    return (
        <PublicPage>
            <Container maxWidth='md'>
                <Box>
                    {
                        isLoading ? 
                        <Box display='flex' justifyContent='center'>
                            <CircularProgress/>
                        </Box>
                        :
                        <ProductList/>
                    }
                </Box>
            </Container>
        </PublicPage>
    );
};
export default Home;