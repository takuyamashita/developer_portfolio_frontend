import { Box, Card, Chip, Typography } from '@material-ui/core';
import { Android } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { react } from 'react';

const useStyles = makeStyles((theme) => ({
    downloadTagWrapper:{
        '& img':{
            //width:'180px',
            [theme.breakpoints.up('xs')]:{
                width:'120px',
            },
            [theme.breakpoints.up('sm')]:{
                width:'180px',
            }
        },
    },
}));

const ProductDetailHeader = (props) => {
    const product = props.product;
    const classes = useStyles();

    return (
        <Box display='flex'>
            <Box height={{xs:'100px',sm:'200px'}} width={{xs:'100px',sm:'200px'}} m={2}>
                <Card>
                    <Box height={{xs:'100px',sm:'200px'}} width={{xs:'100px',sm:'200px'}}
                        style={{
                            backgroundImage:`url(/image/${product.main_image_path})`,
                            backgroundSize:'cover',
                        }}
                    >
                    </Box>
                </Card>
            </Box>
            <Box flexGrow={2}  m={2} position='relative'>
                <Box flexGrow={2} justifyContent='center'>
                    <Typography variant='h5'>
                        {product.title}
                    </Typography>
                </Box>
                {/* <Box display='flex' mt={1} ml={1} alignItems='center'>
                    <Typography variant='subtitle1'>
                        Last Update :
                    </Typography>
                    <Typography variant='subtitle1'>
                        21/23/1
                    </Typography>
                </Box> */}
                {/* <Box display='flex' mt={1} ml={1} flexWrap='wrap'>
                    <Box width='100%'>
                        <Typography variant='h6'>
                            Platform
                        </Typography>
                    </Box>
                    <Box>
                        {product.html_download_tag_android !== null &&
                            <Chip color='primary' icon={<Android/>} label='Android'/>
                        }
                    </Box>
                </Box> */}
                <Box display='flex' position='absolute' bottom='0'>
                    {product.html_download_tag_android !== null &&
                        <Box className={classes.downloadTagWrapper}
                            dangerouslySetInnerHTML={{__html:product.html_download_tag_android}}
                        >
                        
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
};
export default ProductDetailHeader;