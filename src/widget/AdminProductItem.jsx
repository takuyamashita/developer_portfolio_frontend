import { Fragment, react } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Chip, Divider, Typography } from '@material-ui/core';
import { Public } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const AdminProductItem = (props) => {
    const product = props.product;
    const dispatch = useDispatch();

    return (
        <Fragment>
            <Divider></Divider>
            <Box display={{md:'flex'}} mt={4}>
                <Box m={3}>
                    <Card
                        style={{
                            backgroundImage:product.main_image_path == null ? '' : `url(/image/${product.main_image_path})`,
                            backgroundSize:'cover',
                            height:'250px',
                            width:'250px',
                        }}
                    >
                    </Card>
                </Box>
                <Box m={3}  flexGrow={2} minWidth='300px'>
                    <Card>
                        <Box p={4}>
                            <Typography variant='h2'>
                                {product.title}
                            </Typography>
                            <Chip icon={<Public/>} color={product.publish ? 'primary' : 'default'} label={product.publish ? 'Public' : 'Private'} />
                            <Box m={2}>
                                <Typography variant='body1' style={{whiteSpace: 'pre-wrap',maxHeight:'150px',overflowY:'auto'}}>
                                    {product.description}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='end'>
                                <Button color='primary' variant='contained'
                                    onClick={() => dispatch(push({
                                        pathname:'/product/edit',
                                        state:product,
                                    }))}
                                >
                                    edit
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Fragment>
    );
};
export default AdminProductItem;

AdminProductItem.propTypes = {
    product: PropTypes.object,
};