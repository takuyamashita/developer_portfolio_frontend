import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { Fragment, react, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import theme from '../Theme';
import { signIn } from '../reducks/Admin/operations';

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
    papper:{
        padding:theme.spacing(3),
        marginTop:theme.spacing(4),
    },
    margin:{
        marginTop:'10px',
        width:'100%',
    },

}));

const LoginForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container maxWidth='sm'>
            <Paper className={classes.papper}>
                <Typography variant='h2' align='center' color='textSecondary'>
                    Login
                </Typography>
                <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="admin-name">
                        Name
                    </InputLabel>
                    <CustomInput id="admin-name" value={name} onChange={(event) => {setName(event.currentTarget.value)}} />
                </FormControl>
                <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="admin-password">
                        Name
                    </InputLabel>
                    <CustomInput id="admin-password" type='password' value={password} onChange={(event) => {setPassword(event.currentTarget.value);}} />
                </FormControl>
                <Box display='flex' justifyContent='center' marginTop='14px'>
                    <Button
                        onClick={()=>{dispatch(signIn(name, password));}}
                    >
                        login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};
export default LoginForm;