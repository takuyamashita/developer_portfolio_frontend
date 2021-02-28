import { Box, Divider, Typography } from '@material-ui/core';
import { Fragment, react } from 'react';

const PublicPage = (props) => {

    return (
        <Fragment>
            <Box minHeight='100vh' position='relative'
                style={{
                    backgroundColor:'#fafafa',
                }}
            >
                <Box position='fixed' zIndex={100} top={0}>
                    <Box width='100vw' style={{
                        backgroundColor:'rgb(47, 47, 47)',
                    }}>
                        <Box display='flex' py={1} justifyContent='center'>
                            <Box color='white' >
                                <Typography variant='h5'>
                                    TY Swing Studio
                                </Typography>
                            </Box>
                        </Box>
                        <Divider/>
                    </Box>
                </Box>
                <Box paddingTop='80px'>
                    {props.children}
                </Box>
            </Box>
        </Fragment>
    );
};
export default PublicPage;