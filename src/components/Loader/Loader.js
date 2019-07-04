import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';

/*
 * HOC
 */

const withLoader = (WrappedComponent) => {
    const WithLoaderComponent = (props) => {
        const [message, setMessage] = useState('');
        const [isShowLoader, setIsShowLoader] = useState(false);
        const [isShowSnackBar, setIsShowSnackBar] = useState(false);

        const displayLoader = (open, message = '') => {
            setIsShowLoader(open);
            if (!open) {
                if (message) {
                    setMessage(message);
                }
                else {
                    return;
                }
                setIsShowSnackBar(true);

                setTimeout(() => {
                    setIsShowSnackBar(false);
                }, 2000);
            }
        }
        return (
            <div>
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