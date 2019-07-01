import React, { useState } from 'react';
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
    }
}));

const Login = (props) => {
    const [authState, setAuthState] = useState({ redirectToReferrer: false });
    const [user, setUser] = useState({email: '', password: ''});

    const login = () => {
        auth.authenticate(() => {
            setAuthState({ redirectToReferrer: true });
        }, user);
    };

    const handleChange = (event, type) => {
        const value = event.target.value;
        setUser({
            ...user, [type]: value
        });
    }

    const classes = useStyles();
    let { from } = props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = authState;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography style={{ textAlign: 'center' }} variant="h5" gutterBottom>Sign in</Typography>
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
                        />

                        <Button variant="contained" color="primary" className={classes.button} onClick={login}>
                            Login
                            <ChevronRightIcon />
                        </Button>

                        <Button variant="contained" color="secondary" className={classes.button}>
                            Register
                            <CheckIcon />
                        </Button>
                    </form>
                </Grid>
            </Paper>
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