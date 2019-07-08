import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import KeyIcon from '@material-ui/icons/VpnKey';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

import Tooltip from '@material-ui/core/Tooltip';
import ChatIcon from '@material-ui/icons/Chat';

import CircularProgress from '@material-ui/core/CircularProgress';

import Modal from '../Modal/Modal';
import Register from './Register';

const auth = Auth;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(10, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    loaderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        color: '#8c0303',
        marginTop: theme.spacing(2),
    }
}));

const Login = (props) => {
    const [authState, setAuthState] = useState({ redirectToReferrer: false });
    const [user, setUser] = useState({email: '', password: ''});
    const [isLoader, setIsLoader] = useState(false);
    const [isDisplayRegister, setDisplayRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        return () => {
            console.log('Routing...');
        };
    });

    const login = () => {
        setIsLoader(true);

        const successHandle = () => {
            setIsLoader(false);
            setErrorMessage('');
            setAuthState({ redirectToReferrer: true });
        }

        const failHandle = (errorMessage) => {
            setIsLoader(false);
            setErrorMessage(errorMessage);
            setAuthState({ redirectToReferrer: false });
        }

        auth.authenticate(successHandle, failHandle, user);
    };

    const handleChange = (event, type) => {
        const value = event.target.value;
        setUser({
            ...user, [type]: value
        });
    };

    const onKeyHandle = (event) => {
        if(event.key === 'Enter'){
            login();
        }
    };

    const openRegisterModal = () => {
        setDisplayRegister(true);
    };

    const handleClickRegister = (item, displayLoader) => {
        displayLoader(true)
        setTimeout(() => {
            displayLoader(false, 'Register Successfully');
            setDisplayRegister(false);
        }, 2000);
    };

    const classes = useStyles();
    let { from } = props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = authState;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography style={{ textAlign: 'center' }} variant="h5" gutterBottom>
                    Sign in
                    <Tooltip title="Email: admin / Password: admin" placement="top">
                        <ChatIcon/>
                    </Tooltip>
                </Typography>
                <Grid container wrap="nowrap" spacing={2}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="email"
                            label="Email"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            onChange={(e) => handleChange(e, 'email')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onKeyPress={onKeyHandle}
                        />

                        <TextField
                            id="password"
                            label="Password"
                            style={{ margin: 8 }}
                            fullWidth
                            type="password"
                            margin="normal"
                            onChange={(e) => handleChange(e, 'password')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onKeyPress={onKeyHandle}
                        />

                        <Button variant="contained" color="primary" className={classes.button} onClick={login}>
                            Login
                            <ChevronRightIcon />
                        </Button>

                        <Button variant="contained" color="secondary" className={classes.button} onClick={openRegisterModal}>
                            Register
                            <CheckIcon />
                        </Button>

                        { isLoader ?
                            <div className={classes.loaderContainer}>
                                <CircularProgress size={30}/>
                            </div>: '' 
                        }
                    </form>
                </Grid>
                { errorMessage ? <div className={classes.errorMessage}>{ errorMessage }</div> : '' }
            </Paper>
            <Modal
                open={isDisplayRegister}
                handleClose={() => { setDisplayRegister(false) }}
                handleAccept={handleClickRegister}
                handleCancel={() => { setDisplayRegister(false) }}
                title={"Register"}
                ModalContent={Register}
            />
        </div>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

export { Login, PrivateRoute };

export default Login