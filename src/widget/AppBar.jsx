import { react } from 'react';
import { AppBar as MuiAppBar, Toolbar ,makeStyles ,Menu ,MenuItem ,IconButton ,Badge, Typography } from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
    // root:{
    //     "&.MuiAppBar-root":{
    //         background:'white',
    //     },
    // },
}));

const AppBar = () => {
    const classes = useStyles();

    return (
        <MuiAppBar position={'static'} className={classes.root}>
            <Toolbar>
                <Typography >
                    Admin
                </Typography>
            </Toolbar>
        </MuiAppBar>
    );
};
export default AppBar;