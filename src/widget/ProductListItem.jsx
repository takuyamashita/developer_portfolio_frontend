import { Box, Button, Card, makeStyles, Typography } from '@material-ui/core';
import { Fragment, react } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card:{
        '& a':{
            textDecoration:'none',
            color:'inherit',
        },
        '& a:visited':{
            color:'inherit',
        },
    },
    description:{
        whiteSpace:'pre-wrap',
    },
    detailOpenWrapper:{
        background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 100%)',
        '& .MuiButton-root':{
            background:'#fafafa'
        }
    },
    downloadTagWrapperForAndroid:{
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
    downloadTagWrapperForIos:{
        '& img':{
            //width:'180px',
            [theme.breakpoints.up('xs')]:{
                width:'100px',
                paddingTop:'6px',
            },
            [theme.breakpoints.up('sm')]:{
                paddingTop:'10px',
                width:'150px',
            }
        },
    },
}));

const ProductListItem = (props) => {
    const product = props.product;
    const classes = useStyles();

    return (
        <Fragment>
            <Card className={classes.card}>
                <Box display='flex' justifyContent='space-between' p={3}>
                    <Box flexShrink={1} display='flex' width='100%' flexWrap='wrap' >
                        <Typography variant='h4'>
                            <Link to={`/product/${product.route_name}`}>
                                {product.title}
                            </Link>
                        </Typography>
                        <Box mt={2} position='relative' width='100%' maxHeight='150px' overflow='hidden'>
                            <Typography className={classes.description}>
                                {product.description}
                            </Typography>
                            <Box height='50px' className={classes.detailOpenWrapper} display='flex' justifyContent='center' width='100%' position='absolute' bottom={0}>
                                
                            </Box>
                        </Box>
                    </Box>
                    <Box flexShrink={2}>
                        <Card>
                            <Box height={{xs:'100px',sm:'250px'}} width={{xs:'100px',sm:'250px'}}
                                style={{
                                    backgroundImage:`url(/image/${product.main_image_path})`,
                                    backgroundSize:'cover',
                                }}
                            >
                            </Box>
                        </Card>
                    </Box>
                </Box>
                <Box display='flex' justifyContent='center'>
                    {product.html_download_tag_android != null &&
                        <Box
                            className={classes.downloadTagWrapperForAndroid} 
                            dangerouslySetInnerHTML={{__html:product.html_download_tag_android}}
                        >
                        </Box>
                    }
                    {product.html_download_tag_ios != null &&
                        <Box
                            className={classes.downloadTagWrapperForIos} 
                            dangerouslySetInnerHTML={{__html:product.html_download_tag_ios}}
                        >
                        </Box>
                    }
                </Box>
            </Card>
        </Fragment>
    );
};
export default ProductListItem;