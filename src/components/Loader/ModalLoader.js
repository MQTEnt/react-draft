import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';

/*
 * HOC with prop render
 */

const withModalLoader = (WrappedComponent) => {
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
                setIsShowSnackBar(true);

                setTimeout(() => {
                    setIsShowSnackBar(false);
                }, 2000);
            }
        }

        const renderLoader = () => {
            return  isShowLoader ? <LinearProgress /> : '';
        }

        return (
            <div>
                <WrappedComponent displayLoader={displayLoader} {...props} renderLoader={renderLoader} />
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

export default withModalLoader;