import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DetailProduct from './DetailProduct';
import CreateProduct from './CreateProduct';
import CustomTable from '../Table/CustomTable';
import TableToolbar from '../Table/TableToolbar';
import Modal from '../Modal/Modal';

const useStyles = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));

const createData = (id, name, quantity, price) => {
    return { id, name, quantity, price };
}

const rows = [
    createData(1, 'Cupcake', 305, 3.7)
].sort((a, b) => (a.quantity < b.quantity ? -1 : 1));

const Product = () => {
    const classes = useStyles();
    const [items, setItems] = useState(rows)
    const [selectedItem, setSelectedItem] = useState(null)
    const [openEdit, setOpenEdit] = useState(false);

    const handleAcceptCreate = (item) => {
        setItems([
            ...items,
            { id: items[items.length - 1].id + 1, ...item },
        ]);
    }

    const handleCancelCreate = () => {
        console.log('Cancel Button');
    }

    const handleClickRow = (event, id) => {
        const item = items.find(i => i.id === id);
        setSelectedItem(item);
        setOpenEdit(true);
    }

    const handleAcceptEdit = (item) => {
        const newItems = items.map(i => i.id === item.id ? item : i);
        setItems(newItems);
        setSelectedItem(item);
        setOpenEdit(false)
    }

    const handleDelete = (id) => {
        const newItems = items.filter(i => i.id !== id);
        setItems(newItems);
        setSelectedItem(null);
        setOpenEdit(false)
    }

    return (
        <div>
            <h2>Product</h2>
            <Paper className={classes.root}>
                <TableToolbar
                    title={"Create new product"}
                    ModalContent={CreateProduct}
                    handleAcceptButton={handleAcceptCreate}
                    handleCancelButton={handleCancelCreate}
                />
                <CustomTable
                    rows={items}
                    handleClickRow={handleClickRow}
                />
            </Paper>
            { selectedItem ? 
                <Modal
                    open={openEdit}
                    handleClose={ () => {setOpenEdit(false) } }
                    handleAccept={handleAcceptEdit}
                    handleDelete={handleDelete}
                    handleCancel={ () => {setOpenEdit(false) } }
                    title={"Detail product"}
                    ModalContent={ DetailProduct }
                    defaultItem={selectedItem}
                    hasDelete={true}
                /> : null
            }
        </div>
    );
}

export default Product;