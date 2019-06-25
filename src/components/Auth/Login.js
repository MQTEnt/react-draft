import React from 'react';
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

const Login = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography style={{textAlign: 'center'}} variant="h5" gutterBottom>Sign in</Typography>
                <Grid container wrap="nowrap" spacing={2}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="email"
                            label="Email"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button variant="contained" color="primary" className={classes.button}>
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

export default Login