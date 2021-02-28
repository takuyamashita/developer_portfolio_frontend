import { Box, Button, Card, Container, fade, FormControl, IconButton, InputBase, InputLabel, Paper, Switch, Typography } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ArrowBack, UpdateOutlined } from '@material-ui/icons';
import { makeStyles, withStyles, } from '@material-ui/styles';
import { push } from 'connected-react-router';
import { Fragment, react, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, postProduct } from '../reducks/Admin/operations';
import { getProducts as getProductsSelector } from '../reducks/Admin/selectors';
import AuthenticatePage from '../widget/AuthenticatePage';

const CustomInput = withStyles((theme) => ({
    
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))(InputBase);

const useStyles = makeStyles((theme) => ({
    root:{
        marginTop:theme.spacing(4),
        marginBottom:theme.spacing(4),
    },
    papper:{
        padding:theme.spacing(3),
    },
    formControl:{
        marginTop:theme.spacing(2),
        display:'block',
    },
    mainImage:{
        height:'300px',
        width:'300px',
    },
    downloadButtonPreview:{
        '& img':{
            width:'200px',
        },
    },
}));


const ProductEdit = (props) => {
    const targetProduct = props.location.state;
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const classes = useStyles();

    const [mainImageFile, setMainImageFile] = useState(null);

    const [mainImage, setMainImage] = useState(targetProduct && targetProduct.main_image_path != null ? `/image/${targetProduct.main_image_path}` : '');
    const [publish, setPublish] = useState(targetProduct ? !!targetProduct.publish : false);
    const [title, setTitle] = useState(targetProduct ? targetProduct.title : '');
    const [description, setDescription] = useState(targetProduct ? targetProduct.description : '');
    const [routeName, setRouteName] = useState(targetProduct ? targetProduct.route_name : '');
    const [htmlDownloadTagAndoid, setHtmlDownloadTagAndroid] = useState(targetProduct ? (targetProduct.html_download_tag_android ?? '') : '');
    const [htmlDownloadTagIos, setHtmlDownloadTagIos] = useState(targetProduct ? targetProduct.html_download_tag_ios ?? '' : '');
    const [htmlPrivacyPolicy, setHtmlPrivacyPolicy] = useState(targetProduct ? targetProduct.html_privacy_policy : '');

    const saveButtonOnClick = () => {
        const data = {
            'title': title,
            'description': description,
            'route_name': routeName,
            'html_download_tag_android' : htmlDownloadTagAndoid,
            'html_download_tag_ios': htmlDownloadTagIos,
            'html_privacy_policy': htmlPrivacyPolicy,
            'publish': publish ? 1 : 0,
        };
        if(mainImageFile != null) data['main_image'] = mainImageFile;
        const postData = new FormData();
        Object.keys(data).forEach(key => postData.append(key,data[key]));
        
        if(targetProduct) dispatch(postProduct(postData, targetProduct));
        
        else dispatch(postProduct(postData));
    };

    useEffect(() => {
        if(mainImageFile == null) return;

        const reader = new FileReader();
        reader.addEventListener('load',(e) => {
            setMainImage(e.currentTarget.result);
        });
        reader.readAsDataURL(mainImageFile);
    },[mainImageFile]);

    useEffect(() => {
        if(getProductsSelector(selector) == null){
            dispatch(getProducts());
        }
    },[]);


    return (
        <AuthenticatePage>
            <Fragment>
                <Container maxWidth='md' className={classes.root}>
                    <Paper className={classes.papper}>
                        <Box display='flex' alignItems='center'>
                            <IconButton
                                onClick={() => dispatch(push('/admin'))}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <Box flexGrow={2} display='flex' justifyContent='center'>
                                <Typography variant='h4'>
                                    {targetProduct ? `Edit ${targetProduct.title}` :'new product'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box display={{sm:'flex',}} alignItems='flex-start' flexWrap={{sm:'wrap'}} >
                            <FormControl className={classes.formControl}>
                                <input type='file' style={{display:'none'}} id='product-main-image-upload-input'
                                    onChange={(event) => {
                                        setMainImageFile(event.currentTarget.files[0]);
                                    }}
                                />
                                <Card className={classes.mainImage} id=''>
                                    <div id='product-edit-main-image-preview' style={{
                                        height:'100%',
                                        width:'100%',
                                        backgroundSize:'cover',
                                        backgroundImage: mainImage != null && mainImage.length > 0 ? `url(${mainImage})` : '',
                                    }}/>
                                </Card>
                                <Box mt={2}></Box>
                                <input id='product-edit-dummy-input' style={{position:'absolute',height:0,width:0,opacity:0}}/>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    onClick={(event) => {
                                        document.getElementById('product-main-image-upload-input').click();
                                        document.getElementById('product-edit-dummy-input').focus({preventScroll:false});
                                    }}
                                >
                                    Upload File
                                </Button>
                            </FormControl>
                            <Box flexGrow={{sm:2}} ml={{sm:2}} display='flex' flexWrap='wrap'>
                                <Box width='100%'>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="product-edit-title">
                                            Title
                                        </InputLabel>
                                        <CustomInput id='product-edit-title' value={title} onChange={(ev) => setTitle(ev.currentTarget.value)} fullWidth/>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel shrink htmlFor="product-edit-route-name">
                                            Route Name
                                        </InputLabel>
                                        <CustomInput id='product-edit-route-name' value={routeName} onChange={(ev) => setRouteName(ev.currentTarget.value)} fullWidth/>
                                    </FormControl>
                                    <Box>
                                        <FormControlLabel className={classes.formControl} label='Publish'
                                            control={<Switch color='primary' value={publish} checked={publish} onChange={(ev) => setPublish(ev.currentTarget.checked)}/>}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <FormControl className={classes.formControl}>
                            <InputLabel shrink htmlFor="product-edit-description">
                                Description
                            </InputLabel>
                            <CustomInput id='product-edit-description' value={description} onChange={(ev) => setDescription(ev.currentTarget.value)} fullWidth={true} rows={10} multiline/>
                        </FormControl>
                        <Box display={{sm:'flex'}} flexWrap={{sm:'wrap'}} alignItems='center'>
                            <Box mr={2}>
                                <Card id='product-edit-download-tag-android-preview' className={classes.downloadButtonPreview}
                                    style={{width:'200px'}}
                                    dangerouslySetInnerHTML={{__html:htmlDownloadTagAndoid}}
                                >
                                </Card>
                            </Box>
                            <Box flexGrow={2}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink htmlFor="product-edit-download-tag-android">
                                        Download Tag For Android
                                    </InputLabel>
                                    <CustomInput id='product-edit-download-tag-android' fullWidth={true} rows={4} multiline value={htmlDownloadTagAndoid}
                                        onChange={(ev) => {
                                            setHtmlDownloadTagAndroid(ev.currentTarget.value);
                                        }}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                        <Box display={{sm:'flex'}} flexWrap={{sm:'wrap'}} alignItems='center'>
                            <Box mr={2}>
                                <Card id='product-edit-download-tag-ios-preview' className={classes.downloadButtonPreview}
                                    style={{width:'200px'}}
                                    dangerouslySetInnerHTML={{__html:htmlDownloadTagIos}}
                                >

                                </Card>
                            </Box>
                            <Box flexGrow={2}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink htmlFor="product-edit-download-tag-ios">
                                        Download Tag For ios
                                    </InputLabel>
                                    <CustomInput id='product-edit-download-tag-ios' fullWidth={true} rows={4} multiline value={htmlDownloadTagIos}
                                        onChange={(ev) => {
                                            setHtmlDownloadTagIos(ev.currentTarget.value);
                                        }}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                        <Box>
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="product-edit-privacy-policy">
                                    Privacy Policy
                                </InputLabel>
                                <CustomInput id='product-edit-privacy-policy' fullWidth multiline value={htmlPrivacyPolicy} onChange={(ev) => setHtmlPrivacyPolicy(ev.currentTarget.value)} rowsMax={20} rowsMin={5}/>
                            </FormControl>
                            <Box>
                                <Card
                                    style={{width:'100%',padding:5}}
                                >
                                    <div id='product-edit-privacy-policy-preview' dangerouslySetInnerHTML={{__html:htmlPrivacyPolicy}}></div>
                                </Card>
                            </Box>
                        </Box>
                        <Box display='flex' justifyContent='center' mt={3}>
                            <Button color='primary' variant='contained'
                                onClick={(ev) => {
                                    //ev.currentTarget.querySelector('.product-edit-dummy-input').click();
                                    saveButtonOnClick();
                                }}
                            >
                                SAVE
                                <input className='product-edit-dummy-input' style={{position:'absolute',height:0,width:0,opacity:0}}/>
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Fragment>
        </AuthenticatePage>
    );
};
export default ProductEdit;