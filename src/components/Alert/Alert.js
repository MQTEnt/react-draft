import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Alert = (props) => {
  const {open, content, handleClose, handleAccept} = props;

  const handleClickAccept = () => {
      handleAccept();
      handleClose();
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { content }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClickAccept} color="primary" autoFocus>
                OK
            </Button>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Alert;