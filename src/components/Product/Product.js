import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import DetailProduct from './DetailProduct';
import CreateProduct from './CreateProduct';
import CustomTable from '../Table/CustomTable';
import TableToolbar from '../Table/TableToolbar';
import Modal from '../Modal/Modal';
import withLoader from '../Loader/Loader';


const createData = (id, name, quantity, price) => {
    return { id, name, quantity, price };
}

const rows = [
    createData(1, 'Cupcake', 305, 3.7)
].sort((a, b) => (a.quantity < b.quantity ? -1 : 1));

const Product = (props) => {
    const { displayLoader } = props;
    const [items, setItems] = useState(rows)
    const [selectedItem, setSelectedItem] = useState(null)
    const [openEdit, setOpenEdit] = useState(false);

    const handleAcceptCreate = (item, displayModalLoader, closeModal) => {
        displayModalLoader(true);

        setTimeout(() => {
            setItems([
                ...items,
                { id: items[items.length - 1].id + 1, ...item },
            ]);

            displayModalLoader(false, 'Create Successfully!');
            closeModal();
        }, 2000);
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
        setOpenEdit(false);
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
            <Paper>
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

export default withLoader(Product);