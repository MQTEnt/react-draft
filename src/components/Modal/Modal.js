import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import withModalLoader from '../Loader/ModalLoader';
import { ControllActiveButton } from '../Validation/Inputs';
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
    handleDelete,
    displayLoader,
    renderLoader,
  } = props;

  const [item, setItem] = useState(defaultItem);
  const [disableButton, setDisableButton] = useState(false);
  const [isProgressing, setIsProgresssing] = useState(false)

  const onChangeItem = (item) => {
    setItem(item);
  }

  // Use for only componentDidUpdate
  useEffect(() => {
    // Reset form if chosing new item (defaultItem) or open/close modal
    setIsProgresssing(false);
    setItem(defaultItem);
  }, [defaultItem, open]);

  const handleAcceptButton = () => {
    handleAccept(item, displayLoader);
    setDisableButton(true);
    setIsProgresssing(true);
  }

  const handleDeleteButton = () => {
    handleDelete(item.id, displayLoader);
    setDisableButton(true);
    setIsProgresssing(true);
  }

  const handleCancelButton = () => {
    setItem(defaultItem);
    handleCancel();
  }

  const renderControllButton = () => {
    return (
      !isProgressing ? <ControllActiveButton disableButton={setDisableButton} /> : null
    )
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
            <ModalContent item={item} onChangeItem={onChangeItem} renderControllButton={renderControllButton} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAcceptButton} color="primary" disabled={disableButton}>OK</Button>
          { hasDelete ? <Button variant="contained" onClick={handleDeleteButton} color="secondary" disabled={disableButton}>Delete</Button> : ''}
          <Button onClick={handleCancelButton} color="primary" autoFocus>Cancel</Button>
        </DialogActions>
        { renderLoader() }
      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(withModalLoader(Modal));