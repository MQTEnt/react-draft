import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));

/*
 * HOC
 */

const withLoader = (WrappedComponent) => {
    const WithLoaderComponent = (props) => {
        const classes = useStyles();
        const [message, setMessage] = useState('');
        const [isShowLoader, setIsShowLoader] = useState(false);
        const [isShowSnackBar, setIsShowSnackBar] = useState(false);

        const displayLoader = (open, message = '') => {
            setIsShowLoader(open);
            if (!open) {
                if (message) {
                    setMessage(message);
                }
                setIsShowSnackBar(true);

                setTimeout(() => {
                    setIsShowSnackBar(false);
                }, 2000);
            }
        }
        return (
            <div className={classes.root}>
                <WrappedComponent displayLoader={displayLoader} {...props} />
                { isShowLoader ? <LinearProgress /> : ''}
                <Snackbar
                    open={isShowSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{ message }</span>}
                />
            </div>
        );
    }
    return WithLoaderComponent;
};

export default withLoader;