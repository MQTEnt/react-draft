import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Modal from '../Modal/Modal';

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const TableToolbar = (props) => {
    const {title, handleAcceptButton, handleCancelButton, ModalContent} = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAccept = (item, displayModalLoader, setDisabledButton) => {
        handleAcceptButton(item, displayModalLoader, handleClose, setDisabledButton);
    }

    const handleCancel = () => {
        handleCancelButton();
        handleClose();
    }

    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={clsx(classes.root)}
        >
            <div className={classes.title}>
                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="Add"
                    className={classes.margin}
                    onClick={handleClickOpen}
                >
                    <AddIcon className={classes.extendedIcon} />
                    New
                </Fab>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="Filter list">
                    <IconButton aria-label="Filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <Modal
                open={open}
                handleClose={handleClose}
                handleAccept={handleAccept}
                handleCancel={handleCancel}
                title={title}
                ModalContent={ModalContent}
            />
        </Toolbar>
    );
};

export default TableToolbar;