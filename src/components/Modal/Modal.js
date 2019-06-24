import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

function Modal(props) {
  const {
    fullScreen,
    open,
    handleClose,
    handleAccept,
    handleCancel,
    title,
    defaultItem,
    ModalContent,
    hasDelete,
    handleDelete
  } = props;

  const [item, setItem] = useState(defaultItem);

  const onChangeItem = (item) => {
    setItem(item)
  }

  // Use for only componentDidUpdate
  useEffect(() => {
    setItem(defaultItem)
  }, [defaultItem]);

  const handleAcceptButton = () => {
    handleAccept(item)
  }

  const handleDeleteButton = () => {
    handleDelete(item.id)
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
            {/* Modal content passed by prop */}
            <ModalContent item={item} onChangeItem={onChangeItem}/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAcceptButton} color="primary">OK</Button>
          { hasDelete ? <Button variant="contained" onClick={handleDeleteButton} color="secondary">Delete</Button> : ''}
          <Button onClick={handleCancel} color="primary" autoFocus>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(Modal);